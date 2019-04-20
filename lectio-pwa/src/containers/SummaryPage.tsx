import React, {Component, Fragment} from "react";
import {AppBar, IconButton, CircularProgress, Toolbar, Typography} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import Idb from '../utils/Idb';
import {IdbStoreType} from '../constants';
import ContainerStyle from './Containers.module.sass';

const inlineStyles = {
  toolbar: {
    paddingLeft: "8px",
    paddingRight: "8px",
    backgroundColor: "#fff"
  },
  contentArea: {
    padding: "56px 20px 20px"
  }
};

const strings = {
  pageTitle: 'Summary',
  transcribing: 'Generating a summary'
};

class SummaryPage extends Component<any, any> {
  idb = Idb.getInstance();

  constructor(props: any) {
    super(props);
    this.state = {
      isTranscribing: false
    }
  }

  componentDidMount(): void {
    /*
    if transcript is present:
      show the saved transcript
    else:
      load the audio
      transcribe the audio
      save the transcript
      show the generated transcript
     */
    const memoId = this.props.match.params.id;
    this.idb.getFromDB(IdbStoreType.transcript, memoId)
      .then((event) => {
        // @ts-ignore
        if (event.target.result === undefined) {
          // TODO: Generate a transcript
          this.setState({isTranscribing: true});
        }
      })
      .catch((event) => {
        console.log(event.error);
      });
  }

  private handleBackBtn() {
    setTimeout(() => this.props.history.goBack(), 200);
  }

  render() {
    return (
      <Fragment>
        <AppBar position="fixed" color="default" elevation={0}>
          <Toolbar style={inlineStyles.toolbar}>
            <IconButton onClick={() => this.handleBackBtn()}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">{strings.pageTitle}</Typography>
          </Toolbar>
        </AppBar>
        <div style={inlineStyles.contentArea}>
          {this.state.isTranscribing &&
            <div className={ContainerStyle['loading-indicator']}>
              <CircularProgress />
              <p>{strings.transcribing}</p>
            </div>
          }
          <p className={ContainerStyle.bodyText}></p>
        </div>
      </Fragment>
    );
  }
}

export default SummaryPage;
