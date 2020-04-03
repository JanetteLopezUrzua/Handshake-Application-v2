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
    email = props.userprofile.user.company.email
      ? props.userprofile.user.company.email
      : "No Email Entered";
    phonenumber = props.userprofile.user.company.phonenumber
      ? `(${props.userprofile.user.company.phonenumber.substring(
          0,
          3
        )})${props.userprofile.user.company.phonenumber.substring(
          3,
          6
        )}-${props.userprofile.user.company.phonenumber.substring(6)}`
      : "No Phone Number Entered";
  }
  let button = "";

  if (
    localStorage.getItem("id") === props.id &&
    localStorage.getItem("type") === "company"
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
      <Card.Subtitle>Email</Card.Subtitle>
      <Card.Text>{email}</Card.Text>
      <Card.Subtitle>Phone Number</Card.Subtitle>
      <Card.Text>{phonenumber}</Card.Text>
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
