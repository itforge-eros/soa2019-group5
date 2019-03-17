import React, {Component, Fragment} from 'react';
import {AppBar, IconButton, Toolbar} from '@material-ui/core';
import {ArrowBack} from "@material-ui/icons";

const inlineStyles = {
    toolbar: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#fff"
    },
};

export default class TagSelectionPage extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    private handleBackBtn(): void {
        setTimeout(() => this.props.history.goBack(), 180);
    }

    render() {
        return (
            <Fragment>
                <AppBar position="fixed" color="default" elevation={0}>
                    <Toolbar style={inlineStyles.toolbar}>
                        <IconButton onClick={() => this.handleBackBtn()}>
                            <ArrowBack />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Fragment>
        )
    }
}
