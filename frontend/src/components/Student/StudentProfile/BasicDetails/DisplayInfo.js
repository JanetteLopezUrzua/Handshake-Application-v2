import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

import { connect } from "react-redux";

const ConnectedDisplayInfo = (props) => {
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
        : "No First Name Entered";
      lname = props.currentuser.user.student.lname
        ? props.currentuser.user.student.lname
        : "No Last Name Entered";
      dob = props.currentuser.user.student.dob
        ? props.currentuser.user.student.dob
        : "No Date of Birth Entered";
      city = props.currentuser.user.student.city
        ? props.currentuser.user.student.city
        : "No City Entered";
      state = props.currentuser.user.student.state
        ? props.currentuser.user.student.state
        : "No State Entered";
      country = props.currentuser.user.student.country
        ? props.currentuser.user.student.country
        : "No Country Entered";
    }
  }

  let button = "";
  if (
    localStorage.getItem("id") === props.id
    && localStorage.getItem("type") === "student"
  ) {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>Personal Information</Card.Title>
        </Col>
        {button}
      </Row>
      <Card.Subtitle>First Name</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{fname}</Card.Text>
      <Card.Subtitle>Last Name</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{lname}</Card.Text>
      <Card.Subtitle>Date of Birth</Card.Subtitle>
      <Card.Text>{dob}</Card.Text>
      <Card.Subtitle>City</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{city}</Card.Text>
      <Card.Subtitle>State</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{state}</Card.Text>
      <Card.Subtitle>Country</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{country}</Card.Text>
    </Card>
  );
};
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const DisplayInfo = connect(mapStateToProps)(ConnectedDisplayInfo);
export default DisplayInfo;
