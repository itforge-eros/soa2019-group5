import React, {ChangeEvent, Component, Fragment} from 'react';
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
import {Close} from '@material-ui/icons';

interface State {
    searchValue: string;
}

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

class TagSelectionPage extends Component<any, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchValue: ''
        };
        this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
    }

    private availableTags: Array<any> = [
        { name: 'Distributed Computing' },
        { name: 'Library Usage' },
        { name: 'Year 3' }
    ];

    private handleBackBtn(): void {
        //setTimeout(() => this.props.history.goBack(), 180);
        this.props.onClose();
    }

    private handleSearchValueChange(e: any): void {
        this.setState({ searchValue: e.target.value });
    }

    render() {
        let tagsToDisplay: Array<any> = this.availableTags;
        let searchValue: string = this.state.searchValue.trim().toLowerCase();
        let hasExactMatch: boolean = false;
        if (searchValue.length > 0) {
            tagsToDisplay = tagsToDisplay.filter(t => {
                if (t.name.toLowerCase() === searchValue) hasExactMatch = true;
                return t.name.toLowerCase().match(searchValue);
            });
        }
        return (
            <Fragment>
                <AppBar position="fixed" color="default" elevation={0}>
                    <Toolbar style={inlineStyles.toolbar}>
                        <IconButton onClick={() => this.handleBackBtn()}>
                            <Close />
                        </IconButton>
                        <InputBase
                            placeholder="Type to search or create a tag"
                            onChange={this.handleSearchValueChange}
                            value={this.state.searchValue}
                            style={inlineStyles.searchBar} />
                    </Toolbar>
                </AppBar>
                <div className="contentArea">
                    <List>
                        {tagsToDisplay.map(tag => (
                            <ListItem key={tag.name}>
                                <ListItemText primary={tag.name} />
                                <ListItemSecondaryAction>
                                    <Checkbox />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        {searchValue !== '' && !hasExactMatch &&
                            <ListItem button>
                                <ListItemText primary={`Create tag ${searchValue}`} />
                            </ListItem>
                        }
                    </List>
                </div>
            </Fragment>
        )
    }
}

export default TagSelectionPage;
