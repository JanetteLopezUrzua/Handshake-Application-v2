import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";

const ConnectedModalPicture = (props) => {
  let messageerrormsg = "";

  if (props.message.payload) {
    props.message.payload.forEach((err) => {
      if (err.param === "message") messageerrormsg = err.msg;
    });
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Send Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="message">
          <Form.Control
            as="textarea"
            onChange={props.messageHandler}
            name="message"
            type="text"
            rows="3"
            autoFocus
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <p className="errormessage">{messageerrormsg}</p>
        <Button className="cancel" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button className="save" onClick={props.onSend}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return { message: state.message };
};
const ModalPicture = connect(mapStateToProps)(ConnectedModalPicture);
export default ModalPicture;
