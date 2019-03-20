import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from '@material-ui/icons';
import Recorder from '../vendor/recorder';
import styles from './RecordControl.module.sass';

interface State {
	recording: boolean,
	supportsRecording: boolean
}

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, State> {
	rec: any;

	constructor(props: any) {
		super(props);
		this.state = {
			recording: false,
			supportsRecording: false
		};
		this.handleFabClick = this.handleFabClick.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then((stream) => {
				console.log('Initiating recorder');
				const audioContext: AudioContext = new AudioContext();
				const input: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(stream);
				this.rec = new Recorder(input);
				this.setState({ supportsRecording: true });
				console.log('Initiated recorder');

				this.rec.record();
				this.setState({ recording: true });
			})
			.catch((error) => {
				console.log('Error initiating recorder');
				this.setState({ supportsRecording: false });
				// TODO: Display the error to user
			});
	}

	componentWillUnmount() {
		// TODO: Stop recording and destroy worker
	}

	private handleFabClick() {
		this.setState(state => ({ recording: !state.recording }));
	}

	render() {
		return(
			<div className={`${styles.audioArea} ${this.state.recording ? styles.recording : ''}`}>
				<p>{this.state.recording ? 'Recording' : 'Paused'} 02.39</p>
				{this.state.supportsRecording && <Fab aria-label="Add" style={inlineStyles.Fab} onClick={this.handleFabClick}>
					{this.state.recording ? <Pause /> : <FiberManualRecord />}
				</Fab>}
			</div>
		)
	}
}

export default RecordControl;
