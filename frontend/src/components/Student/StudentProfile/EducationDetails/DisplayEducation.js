import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { MdEdit } from "react-icons/md";

const DisplayEducation = props => {
  let {
    name,
    primaryschool,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  } = props.school;

  let primarydisplay = "";
  if (primaryschool === "true") {
    primarydisplay = (
      <p
        style={{
          backgroundColor: "#bbb",
          color: "white",
          display: "inline",
          padding: "2px",
          borderRadius: "5px",
          fontSize: "10px"
        }}
      >
        Primary School
      </p>
    );
  }

  let majordisplay = "";
  if (major) majordisplay = "Major:";
  else majordisplay = "";

  let gpadisplay = "";
  if (gpa) gpadisplay = "Cumulative GPA:";
  else gpadisplay = "";

  let locationdisplay = "";
  if (location) locationdisplay = "Location:";
  else locationdisplay = "";

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
          cursor: "pointer"
        }}
      >
        <Row>
          <Col sm={10}>
            <Card.Title className="schoolname">
              {name} {primarydisplay}
            </Card.Title>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <Button className="editbutton" onClick={props.clicked}>
              <MdEdit style={{ color: "black" }} />
            </Button>
          </Col>
        </Row>
        <Card.Subtitle className="schooldegree">{degree}</Card.Subtitle>
        <Card.Text className="schooldate">
          {passingmonth} {passingyear}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{majordisplay}</span> {major}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{gpadisplay}</span> {gpa}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{locationdisplay}</span>{" "}
          {location}
        </Card.Text>
      </Container>
    );
  } else {
    container = (
      <Container
        style={{
          paddingRight: "0",
          paddingLeft: "10px",
          marginBottom: "30px"
        }}
      >
        <Row>
          <Col>
            <Card.Title className="schoolname">{name}</Card.Title>
          </Col>
        </Row>
        <Card.Subtitle className="schooldegree">{degree}</Card.Subtitle>
        <Card.Text className="schooldate">
          {passingmonth} {passingyear}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{majordisplay}</span> {major}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{gpadisplay}</span> {gpa}
        </Card.Text>
        <Card.Text className="schooldata">
          <span style={{ fontWeight: "bold" }}>{locationdisplay}</span>{" "}
          {location}
        </Card.Text>
      </Container>
    );
  }

  return <div>{container}</div>;
};

export default DisplayEducation;
