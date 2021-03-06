import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { PlayArrow, Pause } from "@material-ui/icons";
import WaveSurfer from 'wavesurfer.js';
import { secToHuman } from '../utils/fmt';
import styles from './PlaybackControl.module.sass';

type theProp = {
	audioBlob: Blob
};

const inlineStyles = {
	fab: {
		position: 'absolute' as 'absolute',
		top: -30,
		left: 0,
		right: 0,
		margin: '0 auto',
		backgroundColor: '#0062F5',
		color: '#fff'
	},
};

/**
 * An audio playback control
 */
class PlaybackControl extends Component<theProp, any> {
	waveSurfer: any;

	constructor(props: Readonly<theProp>) {
		super(props);
		this.state = {
			isPlaying: false,
			currentTime: '00:00'
		}
	}

	componentDidMount(): void {
		// Initiate waveSurfer
		this.waveSurfer = WaveSurfer.create({
			container: '#waveform',
			waveColor: '#eee',
			progressColor: '#6e7070',
			cursorColor: '#00F5C9',
			cursorWidth: 3,
			barWidth: 2,
			height: 80,
			responsive: true
		});
		this.waveSurfer.loadBlob(this.props.audioBlob);
		this.waveSurfer.on('finish', () => this.setState({ isPlaying: false }));

		// Update recording length every second
		setInterval(() => {
			const time = this.waveSurfer.getCurrentTime();
			this.setState({ currentTime: secToHuman(time) });
		}, 1000);
	}

	componentWillUnmount(): void {
		clearInterval();
		this.waveSurfer.unAll();
		this.waveSurfer.destroy();
	}

	private handleFab(): void {
		this.waveSurfer.playPause();
		this.setState({ isPlaying: this.waveSurfer.isPlaying() });
	}

	render() {
		return(
			<div className={styles.audioArea}>
				<Fab aria-label="Play" style={inlineStyles.fab} onClick={() => this.handleFab()}>
					{this.state.isPlaying ? <Pause /> : <PlayArrow />}
				</Fab>
				<div className={styles.currentTime}>{this.state.currentTime}</div>
				<div id="waveform"></div>
			</div>
		)
	}
}

export default PlaybackControl;
