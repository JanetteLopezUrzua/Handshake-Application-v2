import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";

const EventListContainer = (props) => {
  const { name } = props.event.companyid;
  let photo = "";
  if (props.event.companyid.photo) photo = props.event.companyid.photo;

  const path = `/event/${props.eventid}`;
  let img = "";

  if (photo === "") {
    img = (
      <div style={{ paddingLeft: "60px" }}>
        <div className="eventslistpics">
          <p style={{ paddingTop: "10px" }}>{name.charAt(0)}</p>
        </div>
      </div>
    );
    console.log("3");
  } else {
    img = (
      <Image
        className="eventslistpics"
        src={`http://localhost:3001/resumesandimages/${photo}`}
      />
    );
    console.log("4");
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
    "November",
    "December",
  ];
  const month = months[props.event.month - 1].charAt(0).toUpperCase()
    + months[props.event.month - 1].slice(1);

  return (
    <Card style={{ padding: "16px" }}>
      <Row>
        <Col
          sm={2}
          style={{ paddingRight: "0", paddingLeft: "0", textAlign: "center" }}
        >
          {img}
        </Col>
        <Col sm={5} style={{ paddingLeft: "0" }}>
          <Card.Title className="studentslistname">
            <Link to={path} style={{ color: "black" }}>
              {props.event.title}
            </Link>
          </Card.Title>
          <Card.Title
            className="studentslistcollege"
            style={{ textTransform: "none" }}
          >
            <FaCalendar style={{ color: "black" }} />
            {month} {props.event.day}, {props.event.year} from{" "}
            {props.event.starttime} {props.event.startdaytime.toLowerCase()} to{" "}
            {props.event.endtime} {props.event.enddaytime.toLowerCase()}
          </Card.Title>
          <Card.Title className="studentslistinfo">
            <MdLocationOn style={{ color: "black" }} />
            {props.event.location}
          </Card.Title>
        </Col>
        <Col sm={5} style={{ paddingTop: "38px", textAlign: "right" }}>
          <Link
            to={path}
            className="studentslistinfo"
            style={{ color: "#1569e0" }}
          >
            View Details
          </Link>
        </Col>
      </Row>
    </Card>
  );
};

export default EventListContainer;
