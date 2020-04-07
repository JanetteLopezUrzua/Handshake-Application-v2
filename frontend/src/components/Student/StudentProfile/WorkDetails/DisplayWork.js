import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from "react-icons/md";

const DisplayWork = (props) => {
  let {
    companyname,
    title,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description,
  } = props.job;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hyphen = "";
  let noenddate = "";
  if (
    startdatemonth === null &&
    startdateyear === null &&
    enddatemonth === null &&
    enddateyear === null
  ) {
    noenddate = "";
  } else if (enddatemonth === null && enddateyear === null) {
    noenddate = "Present";
    hyphen = "- ";
    enddatemonth = "";
    enddateyear = "";
  } else {
    hyphen = "- ";
  }

  let container = "";
  if (
    localStorage.getItem("id") === props.id &&
    localStorage.getItem("type") === "student"
  ) {
    container = (
      <Container
        onClick={props.clicked}
        style={{
          paddingRight: "0",
          paddingLeft: "10px",
          marginBottom: "30px",
          cursor: "pointer",
        }}
      >
        <Row>
          <Col>
            <Card.Title className="schoolname">{companyname}</Card.Title>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button className="editbutton" onClick={props.clicked}>
              <MdEdit style={{ color: "black" }} />
            </Button>
          </Col>
        </Row>
        <Card.Subtitle className="schooldegree">{title}</Card.Subtitle>
        <Card.Text className="schooldate">
          {months[startdatemonth - 1]} {startdateyear} {hyphen}
          {months[enddatemonth - 1]} {enddateyear} {noenddate}
        </Card.Text>
        <Card.Text className="schooldata">{description}</Card.Text>
      </Container>
    );
  } else {
    container = (
      <Container
        style={{
          paddingRight: "0",
          paddingLeft: "10px",
          marginBottom: "30px",
        }}
      >
        <Row>
          <Col>
            <Card.Title className="schoolname">{companyname}</Card.Title>
          </Col>
        </Row>
        <Card.Subtitle className="schooldegree">{title}</Card.Subtitle>
        <Card.Text className="schooldate">
          {months[startdatemonth - 1]} {startdateyear} {hyphen}
          {months[enddatemonth - 1]} {enddateyear} {noenddate}
        </Card.Text>
        <Card.Text className="schooldata">{description}</Card.Text>
      </Container>
    );
  }

  return <div>{container}</div>;
};

export default DisplayWork;
