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
import Idb from '../utils/Idb';

type theState = {
	searchValue: string,
	tags: Array<MemoTag>
};

type theProp = {
	currentTags: Array<MemoTag>,
	onClose: Function
};

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

class TagSelectionPage extends Component<theProp, theState> {
	idb = Idb.getInstance();

	constructor(props: any) {
		super(props);
		this.state = {
			searchValue: '',
			tags: []
		};
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
		this.handleCreateTag = this.handleCreateTag.bind(this);
	}

	componentDidMount(): void {
		this.updateTagList()
	}

	private handleBackBtn(): void {
		this.props.onClose();
	}

	private handleSearchValueChange(e: any): void {
		this.setState({ searchValue: e.target.value });
	}

	private handleCreateTag(event: React.MouseEvent) {
		const tagId = this.state.searchValue.trim().replace(/\s/g, '-').toLowerCase();
		const tagName = this.state.searchValue.trim();
		const tagToSave: MemoTag = { id: tagId, name: tagName };
		this.idb.saveTag(tagToSave)
			.then(() => {
				this.setState({ searchValue: '' });
				this.updateTagList();
			})
			.catch();
	}

	private updateTagList(): void {
		this.idb.getTag()
			.then((event) => {
				// @ts-ignore
				this.setState({ tags: event.target.result });
			})
			.catch();
	}

	render() {
		let tagsToDisplay: Array<MemoTag> = this.state.tags;
		const searchValue: string = this.state.searchValue.trim().replace(/\s/g, '').toLowerCase();
		let hasExactMatch: boolean = false;
		if (searchValue.length > 0) {
			tagsToDisplay = tagsToDisplay.filter(t => {
				if (t.name.toLowerCase() === searchValue) hasExactMatch = true;
				return t.name.toLowerCase().match(searchValue);
			});
		}
		const currentTags = this.props.currentTags.map(t => t.id);
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
									<Checkbox defaultChecked={currentTags.includes(tag.id)} />
								</ListItemSecondaryAction>
							</ListItem>
						))}
						{searchValue !== '' && !hasExactMatch &&
	            <ListItem button onClick={this.handleCreateTag}>
	                <ListItemText primary={`Create tag ${this.state.searchValue.trim()}`} />
	            </ListItem>
						}
					</List>
				</div>
			</Fragment>
		)
	}
}

export default TagSelectionPage;
