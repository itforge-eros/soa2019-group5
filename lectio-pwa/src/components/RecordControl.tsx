import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from '@material-ui/icons';
import ElapsedTime from 'elapsed-time';
import styles from './RecordControl.module.sass';
import {secToHuman} from '../utils/fmt';

type State = {
	recording: boolean,
	supportsRecording: boolean, // this will be false at first
	hasError: boolean, // so this is needed to work in conjunction with supportsRecording
	elapsedTime: number
};

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, State> {
	private mediaRecorder: MediaRecorder | undefined;
	private stopwatch: any;
	private elapsedInterval: any;

	constructor(props: any) {
		super(props);
		this.state = {
			recording: false,
			supportsRecording: false,
			hasError: false,
			elapsedTime: 0
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.getRecording = this.getRecording.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then((stream) => {
				// Set up recorder
				this.mediaRecorder = new MediaRecorder(stream);
				this.mediaRecorder.onpause = () => {
					this.stopwatch.pause();
					this.setState({recording: false});
				};
				this.mediaRecorder.onresume = () => {
					this.stopwatch.resume();
					this.setState({recording: true});
				};
				this.setState({ supportsRecording: true });

				// Set up stopwatch
				this.stopwatch = new ElapsedTime();

				// Start recording
				this.mediaRecorder.start();
				this.stopwatch.start();
				this.setState({ recording: true });

				// Keep the elapsed time status updated
				this.elapsedInterval = setInterval(() => {
					let elapsedTime = Math.round(this.stopwatch.getRawValue() / 1000000000);
					this.setState({ elapsedTime });
				}, 1000);
			})
			.catch((error) => {
				console.log('Error initiating recorder');
				console.log(error.toString());
				alert(error.toString());
				this.setState({ supportsRecording: false, hasError: true });
			});
	}

	componentWillUnmount() {
		if (this.mediaRecorder) {
			if (this.mediaRecorder.state === 'recording') this.mediaRecorder.stop();
		}
		if (this.elapsedInterval) clearInterval(this.elapsedInterval);
		if (this.stopwatch) this.stopwatch.reset();
	}

	private handleFabClick(): void {
		if (this.mediaRecorder) {
			switch (this.mediaRecorder.state) {
				case 'recording': {
					this.mediaRecorder.pause();
					break;
				}
				case 'paused': {
					this.mediaRecorder.resume();
					break;
				}
			}
		}
	}

	/**
	 * Stops recording and returns an audio blob as a callback param
	 * @param cb - callback
	 */
	public getRecording(...cb: Array<Function>): void {
		if (this.mediaRecorder) {
			this.mediaRecorder.stop();
			this.mediaRecorder.ondataavailable = (blobEvent: any) => {
				this.setState({recording: false});
				cb.forEach((f) => f(blobEvent));
			}
		}
	}

	render() {
		return(
			<div className={`${styles.audioArea} ${this.state.recording ? styles.recording : ''}`}>
				{ this.state.hasError && <p>Cannot set up recording</p> }
				{ this.state.supportsRecording && <p>{ secToHuman(this.state.elapsedTime) }</p> }
				{ this.state.supportsRecording &&
					<Fab aria-label="Add" style={inlineStyles.Fab} onClick={this.handleFabClick}>
						{ this.state.recording ? <Pause /> : <FiberManualRecord /> }
					</Fab>
				}
			</div>
		)
	}
}

export default RecordControl;
