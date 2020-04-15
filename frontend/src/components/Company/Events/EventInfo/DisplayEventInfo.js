import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { MdEdit, MdLocationOn } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";

import { connect } from "react-redux";

const ConnectedDisplayInfo = (props) => {
  let company_id = "";
  let title = "";
  let dayofweek = "";
  let month = "";
  let day = "";
  let year = "";
  let starttime = "";
  let startdaytime = "";
  let endtime = "";
  let enddaytime = "";
  let timezone = "";
  let location = "";
  let eligibility = "";
  let photo = "";
  let name = "";

  if (props.event.event !== null) {
    company_id = props.event.event.event.companyid._id
      ? props.event.event.event.companyid._id
      : "";
    title = props.event.event.event.title ? props.event.event.event.title : "";
    dayofweek = props.event.event.event.dayofweek
      ? props.event.event.event.dayofweek
      : "";
    month = props.event.event.event.month ? props.event.event.event.month : "";
    day = props.event.event.event.day ? props.event.event.event.day : "";
    year = props.event.event.event.year ? props.event.event.event.year : "";
    starttime = props.event.event.event.starttime
      ? props.event.event.event.starttime
      : "";
    startdaytime = props.event.event.event.startdaytime
      ? props.event.event.event.startdaytime
      : "";
    endtime = props.event.event.event.endtime
      ? props.event.event.event.endtime
      : "";
    enddaytime = props.event.event.event.enddaytime
      ? props.event.event.event.enddaytime
      : "";
    timezone = props.event.event.event.timezone
      ? props.event.event.event.timezone
      : "";
    location = props.event.event.event.location
      ? props.event.event.event.location
      : "";
    eligibility = props.event.event.event.eligibility
      ? props.event.event.event.eligibility
      : "";
    photo = props.event.event.event.companyid.photo
      ? props.event.event.event.companyid.photo
      : "";
    name = props.event.event.event.companyid.name
      ? props.event.event.event.companyid.name
      : "";
  }

  let img = "";

  if (photo === "") {
    img = (
      <div>
        <div className="CompanyProfilePicNoImage">
          <p style={{ lineHeight: "1" }}>{name.charAt(0)}</p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="CompanyProfilePicImage"
        src={`http://localhost:3001/resumesandimages/${photo}`}
      />
    );
  }

  let button = "";

  if (
    localStorage.getItem("id") === company_id
    && localStorage.getItem("type") === "company"
  ) {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
    <Card style={{ padding: "0" }}>
      <Row>
        <Col sm={2}>
          <Card style={{ height: "122px", width: "122px", padding: "0" }}>
            {img}
          </Card>
        </Col>
        <Col sm={10}>
          <Card.Body style={{ paddingBottom: "0" }}>
            <Card
              style={{
                border: "none",
                boxShadow: "none",
                fontSize: "14px",
                padding: "0",
                margin: "0",
              }}
            >
              <Row>
                <Col>
                  <Card.Title
                    style={{
                      textTransform: "capitalize",
                      margin: "0",
                      color: "black",
                      fontSize: "40",
                      fontWeight: "bold",
                      lineHeight: "none",
                    }}
                  >
                    {title}
                  </Card.Title>
                </Col>
                {button}
              </Row>
              <Card.Text style={{ margin: "0" }}>
                <FaCalendar />
                {days[dayofweek - 1]}, {months[month - 1]} {day} {year},{" "}
                {starttime} {startdaytime.toLowerCase()} - {endtime}{" "}
                {enddaytime.toLowerCase()} {timezone}
              </Card.Text>
              <Card.Text style={{ textTransform: "capitalize", margin: "0" }}>
                <MdLocationOn />
                {location}
              </Card.Text>
              <Card.Text style={{ textTransform: "capitalize", margin: "0" }}>
                Major: {eligibility}
              </Card.Text>
            </Card>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
const mapStateToProps = (state) => ({ event: state.event });
const DisplayInfo = connect(mapStateToProps)(ConnectedDisplayInfo);
export default DisplayInfo;
