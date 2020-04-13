import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

import { connect } from "react-redux";

const ConnectedDisplayObjective = (props) => {
  let obj = "";
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

    if (props.currentuser.user !== null) {
      if (props.currentuser.user.student) {
        obj = props.currentuser.user.student.objective ? (
          <Card.Text
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "black",
              cursor: "pointer",
            }}
            onClick={props.clicked}
          >
            {props.currentuser.user.student.objective}
          </Card.Text>
        ) : (
          <Form.Label
            style={{ color: "blue", cursor: "pointer" }}
            onClick={props.clicked}
          >
            Enter a career objective...
          </Form.Label>
        );
      }
    }
  } else {
    button = "";

    if (props.currentuser.user !== null) {
      if (props.currentuser.user.student) {
        obj = props.currentuser.user.student.objective ? (
          <Card.Text
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "black",
            }}
          >
            {props.currentuser.user.student.objective}
          </Card.Text>
        ) : (
          <Card.Text
            style={{
              fontSize: "24px",
              lineHeight: "32px",
              color: "black",
            }}
          ></Card.Text>
        );
      }
    }
  }

  return (
    <Card>
      <Row>
        <Col>
          <Card.Title>My Journey</Card.Title>
        </Col>
        {button}
      </Row>
      <Card.Subtitle></Card.Subtitle>
      {obj}
    </Card>
  );
};
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser };
};
const DisplayObjective = connect(mapStateToProps)(ConnectedDisplayObjective);
export default DisplayObjective;
