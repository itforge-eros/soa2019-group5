import React, {Component, Fragment} from 'react';
import {
    AppBar, Checkbox,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Toolbar
} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';

const inlineStyles = {
    toolbar: {
        paddingLeft: '8px',
        paddingRight: '16px',
        backgroundColor: '#fff'
    },
    searchBar: {
        flex: 1,
        marginLeft: '8px',
    }
};

export default class TagSelectionPage extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    private availableTags: Array<any> = [
        { name: 'Distributed Computing' },
        { name: 'Library Usage' },
        { name: 'Year 3' }
    ];

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
                        <InputBase placeholder="Type to search or create a tag" style={inlineStyles.searchBar} />
                    </Toolbar>
                </AppBar>
                <div className="contentArea">
                    <List>
                        {this.availableTags.map(tag => (
                            <ListItem key={tag.name}>
                                <ListItemText primary={tag.name} />
                                <ListItemSecondaryAction>
                                    <Checkbox />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Fragment>
        )
    }
}
