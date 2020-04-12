import React from "react";
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { FaInfo, FaCheck } from "react-icons/fa";

const EventListContainer = (props) => {
  let img = "";

  if (!props.application.jobid.companyid.photo) {
    img = (
      <div style={{ paddingLeft: "40px" }}>
        <div className="eventslistpics">
          <p style={{ paddingTop: "10px" }}>
            {props.application.jobid.companyid.name.charAt(0)}
          </p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="eventslistpics"
        src={`http://localhost:3001/resumesandimages/${props.application.jobid.companyid.photo}`}
      />
    );
  }

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

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col
          sm={2}
          style={{ paddingRight: "0", paddingLeft: "0", textAlign: "center" }}
        >
          {img}
        </Col>
        <Col sm={10} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">
            {props.application.jobid.title}
          </Card.Title>
          <Card.Title
            className="studentslistcollege"
            style={{ textTransform: "none" }}
          >
            {props.application.jobid.companyid.name}
          </Card.Title>
          <Card.Title className="studentslistinfo">
            <FaInfo style={{ color: "black" }} />
            Status: {props.application.status}
          </Card.Title>
          <Card.Title className="studentslistinfo">
            <FaCheck style={{ color: "black" }} />
            Applied: {months[props.application.appmonth]}{" "}
            {props.application.appday}, {props.application.appyear} -
            Applications close{" "}
            {months[props.application.jobid.deadlinemonth - 1]}{" "}
            {props.application.jobid.deadlineday},{" "}
            {props.application.jobid.deadlineyear}
          </Card.Title>
        </Col>
      </Row>
    </Card>
  );
};

export default EventListContainer;
