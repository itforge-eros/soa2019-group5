import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from '@material-ui/icons';
import styles from './RecordControl.module.sass';

type State = {
	recording: boolean,
	supportsRecording: boolean, // this will be false at first
	hasError: boolean // so this is needed to work in conjunction with supportsRecording
};

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, State> {
	private mediaRecorder: MediaRecorder | undefined;

	constructor(props: any) {
		super(props);
		this.state = {
			recording: false,
			supportsRecording: false,
			hasError: false
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.getRecording = this.getRecording.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then((stream) => {
				// Set up recorder
				console.log('Initiating recorder');
				this.mediaRecorder = new MediaRecorder(stream);
				this.setState({ supportsRecording: true });
				console.log('Initiated recorder');

				// Start recording
				this.mediaRecorder.start();
				this.setState({ recording: true });
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
	}

	private handleFabClick(): void {
		if (this.mediaRecorder) {
			switch (this.mediaRecorder.state) {
				case 'recording': {
					this.mediaRecorder.pause();
					this.setState({recording: false});
					break;
				}
				case 'paused': {
					this.mediaRecorder.resume();
					this.setState({recording: true});
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
				{ this.state.supportsRecording && <p>{ this.state.recording ? 'Recording' : 'Paused' } 02.39</p> }
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
