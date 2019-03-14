import React, { Component } from 'react';
import { Fab } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import styles from './PlaybackControl.module.sass';

const inlineStyles = {
    fab: {
        position: 'absolute' as 'absolute',
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto'
    },
};

class PlaybackControl extends Component {
    render() {
        return(
            <div className={styles.audioArea}>
                <Fab color="primary" aria-label="Add" style={inlineStyles.fab}>
                    <PlayArrow />
                </Fab>
            </div>
        )
    }
}

export default PlaybackControl;
