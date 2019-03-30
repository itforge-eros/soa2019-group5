import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from '@material-ui/icons';
import Recorder from '../vendor/recorder';
import styles from './RecordControl.module.sass';

type State = {
	recording: boolean,
	supportsRecording: boolean,
	hasError: boolean,
	blobUrl: string
};

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, State> {
	audioContext: AudioContext | undefined;
	audioInput: MediaStreamAudioSourceNode | undefined;
	rec: any;

	constructor(props: any) {
		super(props);
		this.state = {
			recording: false,
			supportsRecording: false,
			hasError: false,
			blobUrl: ''
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.getRecording = this.getRecording.bind(this);
		this.finishRecording = this.finishRecording.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then((stream) => {
				// Set up recorder
				console.log('Initiating recorder');
				this.audioContext = new AudioContext();
				this.audioInput = this.audioContext.createMediaStreamSource(stream);
				this.rec = new Recorder(this.audioInput);
				this.setState({ supportsRecording: true });
				console.log('Initiated recorder');

				// Start recording
				this.rec.record();
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
		if (this.audioInput) this.audioInput.disconnect();
		if (this.audioContext) this.audioContext.close();
		// TODO: Stop only if it's recording
		if (this.rec) {
			console.log('Stopping recording');
			this.rec.stop();
			// this.getRecording();
		}
	}

	private handleFabClick(): void {
		if (this.state.recording) this.rec.stop(); // pause
		else this.rec.record(); // resume
		this.setState(state => ({ recording: !state.recording }));
	}

	public getRecording(): string {
		console.log('getRecording');
		this.rec.stop();
		this.rec.exportWAV(this.finishRecording);
		console.log(this.state.blobUrl);
		return this.state.blobUrl;
	}



	private finishRecording(blob: Blob): void {
		// TODO: Wait for setState to complete
		this.setState({ blobUrl: URL.createObjectURL(blob) });
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
