import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditInfo = props => {
  let locationerrormsg = "";

  if (props.userprofile.payload) {
    props.userprofile.payload.forEach(err => {
      if (err.param === "location") locationerrormsg = err.msg;
    });
  }

  let location = "";
  let description = "";

  if (props.userprofile.user !== null) {
    location = props.userprofile.user.company.location
      ? props.userprofile.user.company.location
      : "";
    description = props.userprofile.user.company.description
      ? props.userprofile.user.company.description
      : "";
  }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>Company Information</Card.Title>
        </Col>
        <Col />
      </Row>
      <Form.Group controlId="location">
        <Form.Label className="labels">Location</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="location"
          type="text"
          placeholder={location}
        />
        <p className="errormessage"> {locationerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className="labels">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          onChange={props.handleChange}
          name="description"
          type="text"
          placeholder={description}
        />
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
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const EditInfo = connect(mapStateToProps)(ConnectedEditInfo);
export default EditInfo;
