import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditInfo = (props) => {
  let fnameerrormsg = "";
  let lnameerrormsg = "";

  if (props.currentuser.payload) {
    props.currentuser.payload.forEach((err) => {
      if (err.param === "fname") fnameerrormsg = err.msg;
      else if (err.param === "lname") lnameerrormsg = err.msg;
    });
  }

  let fname = "";
  let lname = "";
  let dob = "";
  let city = "";
  let state = "";
  let country = "";

  if (props.currentuser.user !== null) {
    if (props.currentuser.user.student) {
      fname = props.currentuser.user.student.fname
        ? props.currentuser.user.student.fname
        : "";
      lname = props.currentuser.user.student.lname
        ? props.currentuser.user.student.lname
        : "";
      dob = props.currentuser.user.student.dob
        ? props.currentuser.user.student.dob
        : "";
      city = props.currentuser.user.student.city
        ? props.currentuser.user.student.city
        : "";
      state = props.currentuser.user.student.state
        ? props.currentuser.user.student.state
        : "";
      country = props.currentuser.user.student.country
        ? props.currentuser.user.student.country
        : "";
    }
  }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>Personal Information</Card.Title>
        </Col>
        <Col />
      </Row>
      <Form.Group controlId="fname">
        <Form.Label className="labels">First Name</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="fname"
          type="text"
          placeholder={fname}
        />
        <p className="errormessage"> {fnameerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="lname">
        <Form.Label className="labels">Last Name</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="lname"
          type="text"
          placeholder={lname}
        />
        <p className="errormessage"> {lnameerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="dob">
        <Form.Label className="labels">Date of Birth</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="dob"
          type="date"
          placeholder={dob}
        />
      </Form.Group>
      <Form.Group controlId="city">
        <Form.Label className="labels">City</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="city"
          type="text"
          placeholder={city}
        />
      </Form.Group>
      <Form.Group controlId="state">
        <Form.Label className="labels">State</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="state"
          type="text"
          placeholder={state}
        />
      </Form.Group>
      <Form.Group controlId="country">
        <Form.Label className="labels">Country</Form.Label>
        <Form.Control
          style={{ textTransform: "capitalize" }}
          onChange={props.handleChange}
          name="country"
          type="text"
          placeholder={country}
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
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const EditInfo = connect(mapStateToProps)(ConnectedEditInfo);
export default EditInfo;
