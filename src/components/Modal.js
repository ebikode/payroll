import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";

class PXModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
        </Modal>
      </>
    );
  }
}

PXModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  show: PropTypes.bool,
  close: PropTypes.func
};

export default PXModal;
