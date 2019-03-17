import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { FiberManualRecord, Pause } from "@material-ui/icons";
import styles from './RecordControl.module.sass';

interface State {
	recording: boolean
}

const inlineStyles = {
	Fab: {
		color: '#E23939',
		backgroundColor: '#FFF'
	}
};

class RecordControl extends Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			recording: true
		}
		this.handleFabClick = this.handleFabClick.bind(this);
	}

	private handleFabClick() {
		this.setState(state => ({ recording: !state.recording }));
	}

	render() {
		return(
			<div className={`${styles.audioArea} ${this.state.recording ? styles.recording : ''}`}>
				<p>{this.state.recording ? 'Recording' : 'Paused'} 02.39</p>
				<Fab aria-label="Add" style={inlineStyles.Fab} onClick={this.handleFabClick}>
					{this.state.recording ? <Pause /> : <FiberManualRecord />}
				</Fab>
			</div>
		)
	}
}

export default RecordControl;
