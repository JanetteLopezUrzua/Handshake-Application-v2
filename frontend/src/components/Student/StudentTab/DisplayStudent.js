import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const DisplayStudent = (props) => {
  const { fname, lname } = props.student;

  let name = `${fname} ${lname}`;

  const path = `/student/${props.studentid}`;
  let img = "";

  if (!props.student.photo) {
    img = (
      <div>
        <div className="studentslistpics">
          <p style={{ paddingTop: "10px" }}>
            {fname.charAt(0)}
            {lname.charAt(0)}
          </p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="studentslistpics"
        src={`http://localhost:3001/resumesandimages/${props.student.photo}`}
        roundedcircle="true"
      />
    );
  }

  let collegename = "";
  let degree = "";
  let passingmonth = "";
  let passingyear = "";
  let passingdate = "";
  let major = "";

  if (props.student.schools)
    if (props.student.schools.length !== 0) {
      collegename = props.student.schools[0].name;
      degree = props.student.schools[0].degree;
      passingmonth = props.student.schools[0].passingmonth;
      passingyear = props.student.schools[0].passingyear;
      major = props.student.schools[0].major;
    }

  if (
    passingmonth === null ||
    passingyear === null ||
    passingmonth === "" ||
    passingyear === "" ||
    passingmonth === undefined ||
    passingyear === undefined
  ) {
    passingdate = "No Passing Date Listed";
  } else {
    passingdate = `${passingmonth} ${passingyear}`;
  }

  if (major === "" || major === undefined) {
    major = "No Major Listed";
  }

  if (degree === "" || degree === undefined) {
    degree = "No Degree Listed";
  }

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col sm={2}>{img}</Col>
        <Col sm={5} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">
            <Link to={path} style={{ color: "black" }}>
              {name}
            </Link>
          </Card.Title>
          <Card.Title className="studentslistcollege">{collegename}</Card.Title>
          <Card.Title className="studentslistinfo">{degree}</Card.Title>
          <Card.Title className="studentslistinfo">{passingdate}</Card.Title>
        </Col>
        <Col sm={5} style={{ paddingTop: "38px" }}>
          <Card.Title className="studentslistinfo">{major}</Card.Title>
          <Link
            to={path}
            className="studentslistinfo"
            style={{ color: "#1569e0" }}
          >
            Student Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default DisplayStudent;
