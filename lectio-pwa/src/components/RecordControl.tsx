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
			if (this.state.recording) this.mediaRecorder.pause();
			else this.mediaRecorder.resume();
			this.setState(state => ({recording: !state.recording}));
		}
	}

	public getRecording(...cb: Array<Function>): void {
		if (this.mediaRecorder) {
			this.mediaRecorder.resume();
			this.mediaRecorder.requestData();
			this.mediaRecorder.ondataavailable = (blobEvent: any) => {
				cb[0](blobEvent);
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
