import React, { Component, Fragment } from "react";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

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

class SummaryPage extends Component<any, any> {
  constructor(props: any) {
    super(props);
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
          </Toolbar>
        </AppBar>
        <div style={inlineStyles.contentArea}>
          <p className="bodyText">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at
            deleniti dolore fuga, ipsum neque omnis optio pariatur, perspiciatis
            quaerat quibusdam quo repudiandae sequi totam unde vitae voluptatum.
            Commodi, vero!
          </p>
        </div>
      </Fragment>
    );
  }
}

export default SummaryPage;
