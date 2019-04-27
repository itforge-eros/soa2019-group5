import React, {Component, Fragment} from "react";
import {AppBar, IconButton, CircularProgress, Toolbar, Typography, Dialog, Button} from "@material-ui/core";
import {ArrowBack} from "@material-ui/icons";
import Idb from '../utils/Idb';
import {IdbStoreType} from '../constants';
import ContainerStyle from './Containers.module.sass';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

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
  transcribing: 'Generating a summary',
  ok: 'OK',
  transcriptErrDialog: {
    title: 'Cannot summarize',
    body: 'Your memo does not have a transcript. This is probably because your device does not support it.'
  },
  transcriptNotLoadDialog: {
    title: 'Cannot load transcript',
    body: 'There was an error loading the transcript of this memo.'
  }
};

class SummaryPage extends Component<any, any> {
  idb = Idb.getInstance();

  constructor(props: any) {
    super(props);
    this.state = {
      isSummarizing: false,
      transcriptErrDialogOpen: false,
      transcriptNotLoadDialogOpen: false,
      text: ''
    }
  }

  componentDidMount(): void {
    /*
    if transcript is present:
      send the transcript to Summarisation service
      get the summary
      display the summary
    else:
      display 'does not support summarisation'
     */
    const memoId = this.props.match.params.id;
    this.idb.getFromDB(IdbStoreType.transcript, memoId)
      .then((event) => {
        // TODO: Send transcript to server
        // this.setState({isSummarizing: true});

        // @ts-ignore
        const transcript: MemoTranscript = event.target.result;
        // If transcript exists, update the state
        if (transcript !== undefined) this.setState({ text: transcript.transcript });
        // else show an error
        else this.setState({ transcriptErrDialogOpen: true });
      })
      .catch((event) => {
        this.setState({ transcriptNotLoadDialogOpen: true });
        console.log(event.error);
      });
  }

  private handleBackBtn() {
    setTimeout(() => this.props.history.goBack(), 200);
  }

  private handleDialogOkBtn() {
    this.props.history.goBack();
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
          {this.state.isSummarizing &&
            <div className={ContainerStyle['loading-indicator']}>
              <CircularProgress />
              <p>{strings.transcribing}</p>
            </div>
          }
          {this.state.text !== '' && <p className={ContainerStyle.bodyText}>
            DISPLAYING THE TRANSCRIPT FOR TESTING ONLY<br/><br/>
            {this.state.text}
          </p>}
        </div>

        <Dialog open={this.state.transcriptErrDialogOpen}>
          <DialogTitle>{strings.transcriptErrDialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{strings.transcriptErrDialog.body}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleDialogOkBtn()}>{strings.ok}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.state.transcriptNotLoadDialogOpen}>
          <DialogTitle>{strings.transcriptNotLoadDialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{strings.transcriptNotLoadDialog.body}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleDialogOkBtn()}>{strings.ok}</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default SummaryPage;
