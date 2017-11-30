import React from 'react';
import {
  FormControl, ButtonToolbar, ButtonGroup,
  Button, Glyphicon, Modal
} from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PlaygroundAPI from '../PlaygroundAPI';
import './ShareButton.css';


function createShareLink(expression, expressionIsValid, inputDoc) {
  if (!expressionIsValid) {
    console.log('TODO: expression is not valid.');
    return;
  }
  let host = '';
  if (typeof window !== 'undefined') {
    host = window.location.origin + window.location.pathname;
  }
  return PlaygroundAPI.newAnonymousQuery(inputDoc, expression)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function(body) {
      let remoteShareLink = host + '?u=' + body.uuid;
      console.log(remoteShareLink);
      return remoteShareLink;
    });
}


class ShareButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareLink: '',
      copied: false,
      showModal: false,
      fetching: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.createShareLink = this.createShareLink.bind(this);
  }

  closeModal() {
    this.setState({
      copied: false,
      showModal: false,
    });
  }

  createShareLink(event) {
    let {expression, expressionIsValid, inputDoc} = this.props;
    this.setState({fetching: true, showModal: true});
    createShareLink(expression, expressionIsValid, inputDoc)
      .then(remoteShareLink => {
        this.setState({
          shareLink: remoteShareLink,
          fetching: false,
          showModal: true,
        });
      },
      error => this.setState({fetching: false}));
  }

  render() {
    let disableButton = !this.props.expressionIsValid || this.state.fetching;
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.createShareLink} disabled={disableButton}>
              <Glyphicon glyph="share" />Share
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Modal show={this.state.showModal} animation={true} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Share Link</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl
              type="text"
              readOnly
              value={this.state.shareLink} />
            <div className="ShareButton-container">
              <CopyToClipboard
                className="ShareButton-spacing"
                text={this.state.shareLink}
                onCopy={() => this.setState({copied: true})}>
                <Button>
                  <Glyphicon color="green" glyph="copy" />Copy to Clipboard
                </Button>
              </CopyToClipboard>
              {this.state.copied ? <Glyphicon className="ShareButton-checkmark" glyph="ok" /> : null}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ShareButton;
