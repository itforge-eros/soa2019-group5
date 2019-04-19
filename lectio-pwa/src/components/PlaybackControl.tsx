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
		this.waveSurfer = WaveSurfer.create({
			container: '#waveform',
			waveColor: 'grey',
			progressColor: 'hsla(200, 100%, 30%, 0.5)',
			cursorColor: '#fff',
			barWidth: 3,
			height: 80,
			responsive: true
		});
		this.waveSurfer.loadBlob(this.props.audioBlob);
		this.waveSurfer.on('finish', () => this.setState({ isPlaying: false }));
		setInterval(() => {
			const time = this.waveSurfer.getCurrentTime();
			this.setState({ currentTime: secToHuman(time) });
		}, 1000);
	}

	componentWillUnmount(): void {
		this.waveSurfer.destroy();
		clearInterval();
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
