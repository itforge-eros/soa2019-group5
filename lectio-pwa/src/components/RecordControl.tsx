import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from "@material-ui/icons";
import styles from './RecordControl.module.sass';

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			recording: true
		}
	}

	render() {
		return(
			<div className={styles.audioArea}>
				<p>Recording 02.39</p>
				<Fab aria-label="Add" style={inlineStyles.Fab}>
					{this.state.recording ? <Pause /> : <FiberManualRecord />}
				</Fab>
			</div>
		)
	}
}

export default RecordControl;
