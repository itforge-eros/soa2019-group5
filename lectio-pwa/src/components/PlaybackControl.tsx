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
        margin: '0 auto',
        backgroundColor: '#0062F5',
        color: '#fff'
    },
};

class PlaybackControl extends Component {
    render() {
        return(
            <div className={styles.audioArea}>
                <Fab aria-label="Add" style={inlineStyles.fab}>
                    <PlayArrow />
                </Fab>
            </div>
        )
    }
}

export default PlaybackControl;
