import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from '@material-ui/icons';
import ElapsedTime from 'elapsed-time';
import styles from './RecordControl.module.sass';
import {secToHuman} from '../utils/fmt';

type State = {
	recording: boolean, // is it currently recording
	supportsRecording: boolean, // this will be false at first
	hasError: boolean, // so this is needed to work in conjunction with supportsRecording
	elapsedTime: number,
	supportsTranscription: boolean,
	transcript: string
};

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

/**
 * An audio record control
 */
class RecordControl extends Component<any, State> {
	private mediaRecorder: MediaRecorder | undefined;
	private stopwatch: any;
	private elapsedInterval: any;
	// @ts-ignore
	private SpeechRecognition: SpeechRecognition | undefined = window.SpeechRecognition || window.webkitSpeechRecognition;
	// @ts-ignore
	private recognition: SpeechRecognition;

	constructor(props: any) {
		super(props);
		this.state = {
			recording: false,
			supportsRecording: false,
			hasError: false,
			elapsedTime: 0,
			supportsTranscription: false,
			transcript: ''
		};
		this.handleFabClick = this.handleFabClick.bind(this);
		this.getRecording = this.getRecording.bind(this);
	}

	componentDidMount() {
		navigator.mediaDevices.getUserMedia({audio: true, video: false})
			.then((stream) => {
				// Set up recorder
				this.initRecorder(stream);

				// Set up stopwatch
				this.stopwatch = new ElapsedTime();

				// Set up and start speech recognition if supported
				if (this.SpeechRecognition !== undefined)
					this.initSpeechRecognizer();

				// Start recording and stopwatch
				// @ts-ignore
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
				console.error('Error initiating recorder');
				console.error(error.toString());
				alert(error.toString());
				this.setState({ supportsRecording: false, hasError: true });
			});
	}

	componentWillUnmount() {
		if (this.mediaRecorder) {
			if (this.mediaRecorder.state === 'recording')
				this.mediaRecorder.stop();
		}
		if (this.recognition) this.recognition.stop();
		if (this.elapsedInterval) clearInterval(this.elapsedInterval);
		if (this.stopwatch) this.stopwatch.reset();
	}

	private handleFabClick(): void {
		if (this.recognition) {
			if (this.state.recording) this.recognition.stop();
			else this.recognition.start();
		}
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

	private initRecorder(stream: MediaStream): void {
		this.mediaRecorder = new MediaRecorder(stream);
		this.mediaRecorder.onpause = () => {
			this.stopwatch.pause();
			this.setState({recording: false});
		};
		this.mediaRecorder.onresume = () => {
			this.stopwatch.resume();
			this.setState({recording: true});
		};
		this.mediaRecorder.onstop = () => {
			stream.getTracks().forEach(t => t.stop());
		};
		this.setState({ supportsRecording: true });
	}

	private initSpeechRecognizer(): void {
		// @ts-ignore
		this.recognition = new this.SpeechRecognition();
		this.recognition.lang = 'en-US';
		this.recognition.continuous = true;
		this.recognition.onresult = (event) => {
			const msg = event.results[event.results.length - 1][0].transcript;
			this.setState((prev: any) => ({ transcript: prev.transcript.concat(msg + ' ') }));
		};
		this.recognition.onerror = (error) => {
			this.setState({ supportsTranscription: false });
		};

		this.recognition.start();
		this.setState({ supportsTranscription: true });
	}

	/**
	 * Stop recording and return an audio blob as a callback param
	 * @param cb - callback
	 */
	public getRecording(...cb: Array<Function>): void {
		if (this.state.recording)
			this.stopwatch.pause();
		if (this.mediaRecorder) {
			this.mediaRecorder.stop();
			this.mediaRecorder.ondataavailable = (blobEvent: any) => {
				this.setState({recording: false});
				cb.forEach((f) => f(blobEvent));
			}
		}
	}

	/**
	 * Get the transcript
	 * @return {string} the transcript
	 */
	public getTranscript(): string { return this.state.transcript }

	render() {
		return(
			<div className={`${styles.audioArea} ${this.state.recording ? styles.recording : ''}`}>
				{ this.state.hasError && <p>Cannot set up recording</p> }
				{ this.state.supportsRecording &&
					<p>
						{ secToHuman(this.state.elapsedTime) }
						{ this.state.supportsTranscription && ' ∙ Transcribing' }
					</p>
				}
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
