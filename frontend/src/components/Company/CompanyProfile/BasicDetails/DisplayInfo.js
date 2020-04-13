import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

import { connect } from "react-redux";

const ConnectedDisplayInfo = (props) => {
  let location = "";
  let description = "";

  if (props.currentuser.user !== null) {
    if (props.currentuser.user.company) {
      location = props.currentuser.user.company.location
        ? props.currentuser.user.company.location
        : "No Location Entered";
      description = props.currentuser.user.company.description
        ? props.currentuser.user.company.description
        : "No Description Entered";
    }
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
          <Card.Title>Company Information</Card.Title>
        </Col>
        {button}
      </Row>
      <Card.Subtitle>Location</Card.Subtitle>
      <Card.Text style={{ textTransform: "capitalize" }}>{location}</Card.Text>
      <Card.Subtitle>Description</Card.Subtitle>
      <Card.Text>{description}</Card.Text>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser };
};
const DisplayInfo = connect(mapStateToProps)(ConnectedDisplayInfo);
export default DisplayInfo;
