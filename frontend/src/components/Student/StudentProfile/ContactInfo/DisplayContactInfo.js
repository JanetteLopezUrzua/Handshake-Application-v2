import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

import { connect } from "react-redux";

const ConnectedDisplayContactInfo = props => {
  let email = "";
  let phonenumber = "";

  if (props.userprofile.user !== null) {
    email = props.userprofile.user.student.email
      ? props.userprofile.user.student.email
      : "No Email Entered";
    phonenumber = props.userprofile.user.student.phonenumber
      ? `(${props.userprofile.user.student.phonenumber.substring(
          0,
          3
        )})${props.userprofile.user.student.phonenumber.substring(
          3,
          6
        )}-${props.userprofile.user.student.phonenumber.substring(6)}`
      : "No Phone Number Entered";
  }

  let button = "";
  if (
    localStorage.getItem("id") === props.id &&
    localStorage.getItem("type") === "student"
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
          <Card.Title>Contact Information</Card.Title>
        </Col>
        {button}
      </Row>
      <Row>
        <Col sm={6}>
          <Card.Subtitle>Email</Card.Subtitle>
          <Card.Text>{email}</Card.Text>
        </Col>
        <Col sm={6}>
          <Card.Subtitle>Phone Number</Card.Subtitle>
          <Card.Text>{phonenumber}</Card.Text>
        </Col>
      </Row>
    </Card>
  );
};
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const DisplayContactInfo = connect(mapStateToProps)(
  ConnectedDisplayContactInfo
);
export default DisplayContactInfo;
