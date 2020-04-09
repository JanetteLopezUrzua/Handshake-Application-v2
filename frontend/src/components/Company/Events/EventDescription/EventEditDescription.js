import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEventEditDescription = (props) => {
  let descriptionerrormsg = "";

  if (props.event.payload) {
    props.event.payload.forEach((err) => {
      if (err.param === "description") descriptionerrormsg = err.msg;
    });
  }

  let description = "";

  if (props.event.event !== null) {
    description = props.event.event.event.description
      ? props.event.event.event.description
      : "";
  }

  return (
    <Card>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="10"
          onChange={props.descriptionchange}
          name="description"
          type="text"
          placeholder={description}
          autoFocus
        />
        <p className="errormessage"> {descriptionerrormsg}</p>
      </Form.Group>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>
          Cancel
        </Button>
        <Button className="save" onClick={props.save}>
          Save
        </Button>
      </Card.Footer>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return { event: state.event };
};
const EventEditDescription = connect(mapStateToProps)(
  ConnectedEventEditDescription
);
export default EventEditDescription;
