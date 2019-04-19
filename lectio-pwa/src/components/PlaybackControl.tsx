import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import WaveSurfer from 'wavesurfer.js';
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

	componentDidMount(): void {
		this.waveSurfer = WaveSurfer.create({
			// Use the id or class-name of the element you created, as a selector
			container: '#waveform',
			// The color can be either a simple CSS color or a Canvas gradient
			waveColor: 'grey',
			progressColor: 'hsla(200, 100%, 30%, 0.5)',
			cursorColor: '#fff',
			// This parameter makes the waveform look like SoundCloud's player
			barWidth: 3
		});
		this.waveSurfer.loadBlob(this.props.audioBlob);
	}

	private handleFab(): void {
		this.waveSurfer.playPause();
	}

	render() {
		return(
			<div className={styles.audioArea}>
				<Fab aria-label="Play" style={inlineStyles.fab} onClick={() => this.handleFab()}>
					<PlayArrow />
				</Fab>
				<div id="waveform"></div>
			</div>
		)
	}
}

export default PlaybackControl;
