import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit, MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaRegClock, FaBriefcase } from "react-icons/fa";

import { connect } from "react-redux";

const ConnectedDisplayInfo = (props) => {
  let company_id = "";
  let title = "";
  let deadlinemonth = "";
  let deadlineday = "";
  let deadlineyear = "";
  let deadlinetime = "";
  let deadlinedaytime = "";
  let location = "";
  let salary = "";
  let salarytime = "";
  let description = "";
  let category = "";
  let postingmonth = "";
  let postingday = "";
  let postingyear = "";
  let company_name = "";
  let posteddate = "";

  if (props.job.job !== null) {
    company_id = props.job.job.job.companyid._id
      ? props.job.job.job.companyid._id
      : "";
    company_name = props.job.job.job.companyid.company_name
      ? props.job.job.job.companyid.company_name
      : "";
    title = props.job.job.job.title ? props.job.job.job.title : "";
    deadlinemonth = props.job.job.job.deadlinemonth
      ? props.job.job.job.deadlinemonth
      : "";
    deadlineday = props.job.job.job.deadlineday
      ? props.job.job.job.deadlineday
      : "";
    deadlineyear = props.job.job.job.deadlineyear
      ? props.job.job.job.deadlineyear
      : "";
    deadlinetime = props.job.job.job.deadlinetime
      ? props.job.job.job.deadlinetime
      : "";
    deadlinedaytime = props.job.job.job.deadlinedaytime
      ? props.job.job.job.deadlinedaytime
      : "";
    location = props.job.job.job.location ? props.job.job.job.location : "";
    salary = props.job.job.job.salary ? props.job.job.job.salary : "";
    salarytime = props.job.job.job.salarytime
      ? props.job.job.job.salarytime
      : "";
    description = props.job.job.job.description
      ? props.job.job.job.description
      : "";
    category = props.job.job.job.category ? props.job.job.job.category : "";
    postingmonth = props.job.job.job.postingmonth
      ? props.job.job.job.postingmonth
      : "";
    postingday = props.job.job.job.postingday
      ? props.job.job.job.postingday
      : "";
    postingyear = props.job.job.job.postingyear
      ? props.job.job.job.postingyear
      : "";
  }

  let button = "";

  if (
    localStorage.getItem("id") === company_id &&
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

  const posteddatemonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  posteddate = `${posteddatemonths[postingmonth]} ${postingday}, ${postingyear}`;

  return (
    <Card style={{ border: "none", boxShadow: "none", padding: "0" }}>
      <Card.Body style={{ paddingBottom: "0" }}>
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
          <Col>{button}</Col>
        </Row>
        <Card.Title>{company_name}</Card.Title>
        <Row>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaBriefcase /> {category}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <MdLocationOn /> {location}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaRegMoneyBillAlt /> {`$${salary}`} per {salarytime}{" "}
          </Card.Text>
          <Card.Text style={{ marginRight: "15px", marginLeft: "15px" }}>
            <FaRegClock /> Posted {posteddate}{" "}
          </Card.Text>
        </Row>
        <Card style={{ boxShadow: "none" }}>
          <Card.Title>
            Applications close on {months[deadlinemonth - 1]} {deadlineday},{" "}
            {deadlineyear} at {deadlinetime} {deadlinedaytime.toLowerCase()}
          </Card.Title>
        </Card>
        <Card.Title>{description}</Card.Title>
      </Card.Body>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return { job: state.job };
};
const DisplayInfo = connect(mapStateToProps)(ConnectedDisplayInfo);
export default DisplayInfo;
