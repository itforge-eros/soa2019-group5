import React, {Component, Fragment} from 'react';
import {
	AppBar,
	Button,
	Chip,
	Dialog,
	IconButton,
	InputBase,
	LinearProgress,
	List,
	Slide,
	Toolbar
} from '@material-ui/core';
import {Add as AddIcon, ArrowBack, Tune} from '@material-ui/icons';
import MemoListItem from '../components/MemoListItem';
import * as rest from '../utils/rest';
import ContainerStyle from './Containers.module.sass';
import styles from './SearchPage.module.sass';
import TagSelectionPage from './TagSelectionPage';

const inlineStyles = {
  toolbar: {
    paddingLeft: '8px',
    paddingRight: '8px',
    backgroundColor: '#fff'
  },
  searchBar: {
    flex: 1,
    marginLeft: '8px',
  }
};

const strings = {
	searchBar: 'Type to search for memos'
};

const Transition = (props: any) => <Slide direction="up" {...props} />;

class SearchPage extends Component<any, any> {
	private searchTimeout = setTimeout(() => {}, 0);

	constructor(props: any) {
		super(props);
		this.state = {
			memoList: [],
			tags: [],
			tagDialogOpen: false,
			keyword: '',
			isLoading: false
		};
		this.handleBackBtn = this.handleBackBtn.bind(this);
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
		this.handleTagClose = this.handleTagClose.bind(this);
	}

	private handleBackBtn(): void {
		setTimeout(() => this.props.history.goBack(), 180);
	}

	private handleSearchValueChange(event: any): void {
		// https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
		clearTimeout(this.searchTimeout);
		this.setState({keyword: event.target.value});
		const keyword = event.target.value;
		const tags: serverMemoTag = this.state.tags.map((t: MemoTag) => t.name);
		this.searchTimeout = setTimeout(() => {
			this.searchMemos(keyword, tags);
		}, 500);
	}

	private handleTagBtn(): void {
		this.setState({tagDialogOpen: true});
	}

	private handleTagClose(newTags: Array<MemoTag>): void {
		this.setState({tagDialogOpen: false, tags: newTags});
		const tags: serverMemoTag = newTags.map((t: MemoTag) => t.name);
		this.searchMemos(this.state.keyword, tags);
	}

	private searchMemos(keyword: string, tags: serverMemoTag): void {
		this.setState({isLoading: true});
		rest.searchMemos(keyword, tags)
			.then((result) => result.json())
			.then((jsonResult: Array<serverMemo>) => {
				this.setState({
					isLoading: false,
					// @ts-ignore
					memoList: jsonResult.error_code ? [] : jsonResult
				})
			})
			.catch((result) => {
				// TODO: Handle error
				this.setState({isLoading: false});
			});
	}

	render() {
		return (
			<Fragment>
				<AppBar position="fixed" color="default" elevation={0}>
          <Toolbar style={inlineStyles.toolbar}>
            <IconButton onClick={this.handleBackBtn}>
              <ArrowBack />
            </IconButton>
            <InputBase
              placeholder={strings.searchBar}
              onChange={this.handleSearchValueChange}
              value={this.state.searchValue}
              style={inlineStyles.searchBar}
            />
            <IconButton onClick={() => this.handleTagBtn()}>
            	<Tune />
            </IconButton>
          </Toolbar>
      	</AppBar>

				<div className={ContainerStyle.contentArea}>
					{this.state.isLoading && <LinearProgress />}

					{ this.state.tags.length > 0 && <div className={styles.chipWrap}>
						{ this.state.tags.map((tag: MemoTag) =>
							<Chip key={tag.id} label={tag.name} className={styles.chip}/>
						) }
					</div> }

	        <List>
						{ this.state.memoList.map((m: serverMemo) =>
							<MemoListItem memo={m} key={m.uuid} schema='server' />
						) }
					</List>
				</div>

				<Dialog fullScreen open={this.state.tagDialogOpen} TransitionComponent={Transition}>
					<TagSelectionPage onClose={this.handleTagClose} currentTags={this.state.tags} />
				</Dialog>
			</Fragment>
		)
	}
}

export default SearchPage;
