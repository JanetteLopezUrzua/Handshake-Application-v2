import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditContactInfo = (props) => {
  let emailerrormsg = "";
  let phonenumerrormsg = "";

  if (props.currentuser.payload) {
    props.currentuser.payload.forEach((err) => {
      if (err.param === "email") emailerrormsg = err.msg;
      else if (err.param === "phonenumber") phonenumerrormsg = err.msg;
    });
  }

  let email = "";
  let phonenumber = "";

  if (props.currentuser.user !== null) {
    if (props.currentuser.user.student) {
      email = props.currentuser.user.student.email
        ? props.currentuser.user.student.email
        : "";
      phonenumber = props.currentuser.user.student.phonenumber
        ? props.currentuser.user.student.phonenumber
        : "";
    }
  }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>Contact Information</Card.Title>
        </Col>
        <Col />
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group controlId="email">
            <Form.Label className="labels">Email</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              name="email"
              type="email"
              placeholder={email}
            />
          </Form.Group>
          <p className="errormessage"> {emailerrormsg}</p>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="phonenumber">
            <Form.Label className="labels">Phone Number</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              name="phone"
              type="tel"
              placeholder={phonenumber}
            />
          </Form.Group>
          <p className="errormessage">{phonenumerrormsg}</p>
        </Col>
      </Row>
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
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const EditContactInfo = connect(mapStateToProps)(ConnectedEditContactInfo);
export default EditContactInfo;
