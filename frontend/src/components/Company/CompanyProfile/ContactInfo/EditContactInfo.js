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

  // let email = "";
  // let phonenumber = "";

  // if (props.userprofile.user !== null) {
  //   email = props.userprofile.user.company.email
  //     ? props.userprofile.user.company.email
  //     : "";
  //   phonenumber = props.userprofile.user.company.phonenumber
  //     ? props.userprofile.user.company.phonenumber
  //     : "";
  // }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>Contact Information</Card.Title>
        </Col>
        <Col />
      </Row>
      <Form.Group controlId="email">
        <Form.Label className="labels">Email</Form.Label>
        <Form.Control onChange={props.handleChange} name="email" type="email" />
        <p className="errormessage"> {emailerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="phonenumber">
        <Form.Label className="labels">Phone Number</Form.Label>
        <Form.Control onChange={props.handleChange} name="phone" type="tel" />
        <p className="errormessage">{phonenumerrormsg}</p>
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
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const EditContactInfo = connect(mapStateToProps)(ConnectedEditContactInfo);
export default EditContactInfo;
