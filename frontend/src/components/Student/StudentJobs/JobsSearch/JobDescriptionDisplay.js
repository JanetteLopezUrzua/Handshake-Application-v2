import React from "react";
import "../../../components.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaRegMoneyBillAlt, FaRegClock, FaBriefcase } from "react-icons/fa";
import { connect } from "react-redux";
import Application from "../Application/Application";

import { companyloadapplicationslist } from "../../../../actions/jobs";

const ConnectedJobDescriptionDisplay = (props) => {
  let jobid = "";
  let companyid = "";
  let companyname = "";
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

  if (props.job.job !== null) {
    jobid = props.job.job.job._id ? props.job.job.job._id : "";
    companyid = props.job.job.job.companyid._id
      ? props.job.job.job.companyid._id
      : "";
    companyname = props.job.job.job.companyid.name
      ? props.job.job.job.companyid.name
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

  props.dispatch(companyloadapplicationslist(jobid));

  const path = `/company/${companyid}`;
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

  const posteddate = `${posteddatemonths[postingmonth]} ${postingday}, ${postingyear}`;

  return (
    <div>
      <Card.Body style={{ paddingBottom: "0" }}>
        <Row>
          <Card.Title
            style={{
              textTransform: "capitalize",
              margin: "0",
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
              lineHeight: "none",
            }}
          >
            {title}
          </Card.Title>
        </Row>
        <Card.Title>
          <Link to={path} style={{ color: "black", fontSize: "16px" }}>
            {companyname}
          </Link>
        </Card.Title>
        <Row>
          <Card.Text
            style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}
          >
            <FaBriefcase /> {category}{" "}
          </Card.Text>
          <Card.Text
            style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}
          >
            <MdLocationOn /> {location}{" "}
          </Card.Text>
          <Card.Text
            style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}
          >
            <FaRegMoneyBillAlt /> {`$${salary}`} per {salarytime}{" "}
          </Card.Text>
          <Card.Text
            style={{ marginRight: "5px", marginLeft: "5px", fontSize: "14px" }}
          >
            <FaRegClock /> Posted {posteddate}{" "}
          </Card.Text>
        </Row>
        <Card style={{ boxShadow: "none", marginLeft: "0", marginRight: "0" }}>
          <Row>
            <Col sm={10}>
              <Card.Title style={{ fontSize: "16px" }}>
                Applications close on {months[deadlinemonth - 1]} {deadlineday},{" "}
                {deadlineyear} at {deadlinetime} {deadlinedaytime.toLowerCase()}
              </Card.Title>
            </Col>
            <Col sm={2}>
              <Application job_id={jobid} />
            </Col>
          </Row>
        </Card>
        <Card.Title style={{ fontSize: "14px" }}>{description}</Card.Title>
      </Card.Body>
    </div>
  );
};
const mapStateToProps = (state) => ({ job: state.job });
const JobDescriptionDisplay = connect(mapStateToProps)(
  ConnectedJobDescriptionDisplay
);
export default JobDescriptionDisplay;
