import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditEventInfo = (props) => {
  let titleerrormsg = "";
  let dayofweekerrormsg = "";
  let montherrormsg = "";
  let dayerrormsg = "";
  let yearerrormsg = "";
  let starttimeerrormsg = "";
  let startdaytimeerrormsg = "";
  let endtimeerrormsg = "";
  let enddaytimeerrormsg = "";
  let timezoneerrormsg = "";
  let locationerrormsg = "";
  let eligibilityerrormsg = "";

  if (props.event.payload) {
    props.event.payload.forEach((err) => {
      if (err.param === "title") titleerrormsg = err.msg;
      else if (err.param === "dayofweek") dayofweekerrormsg = err.msg;
      else if (err.param === "month") montherrormsg = err.msg;
      else if (err.param === "day") dayerrormsg = err.msg;
      else if (err.param === "year") yearerrormsg = err.msg;
      else if (err.param === "starttime") starttimeerrormsg = err.msg;
      else if (err.param === "startdaytime") startdaytimeerrormsg = err.msg;
      else if (err.param === "endtime") endtimeerrormsg = err.msg;
      else if (err.param === "enddaytime") enddaytimeerrormsg = err.msg;
      else if (err.param === "timezone") timezoneerrormsg = err.msg;
      else if (err.param === "location") locationerrormsg = err.msg;
      else if (err.param === "eligibility") eligibilityerrormsg = err.msg;
    });
  }

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

  if (props.event.event !== null) {
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
    "November",
    "December",
  ];

  let inputfield = "";
  if (props.eligibilityoption === "other") {
    inputfield = (
      <Form.Group controlId="eligibility">
        <Form.Label className="labels">Enter Eligibility Major</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="eligibility"
          type="text"
        />
      </Form.Group>
    );
  }

  return (
    <Card>
      <Form.Group controlId="title">
        <Form.Label className="labels">Title</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="title"
          type="text"
          placeholder={title}
        />
        <p className="errormessage">{titleerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="dayofweek">
        <Form.Label className="labels">Day Of The Week</Form.Label>
        <Form.Control
          as="select"
          onChange={props.handleChange}
          name="dayofweek"
        >
          <option value="" hidden>
            {days[dayofweek - 1]}
          </option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="7">Sunday</option>
        </Form.Control>
        <p className="errormessage">{dayofweekerrormsg}</p>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="month">
            <Form.Label className="labels">Date</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="month"
            >
              <option value="" hidden>
                {months[month - 1]}
              </option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </Form.Control>
            <p className="errormessage">{montherrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="day">
            <Form.Label className="labels" />
            <Form.Control as="select" onChange={props.handleChange} name="day">
              <option value="" hidden>
                {day}
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </Form.Control>
            <p className="errormessage">{dayerrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="year">
            <Form.Label className="labels" />
            <Form.Control as="select" onChange={props.handleChange} name="year">
              <option value="" hidden>
                {year}
              </option>
              <option value="2030">2030</option>
              <option value="2029">2029</option>
              <option value="2028">2028</option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </Form.Control>
            <p className="errormessage">{yearerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="starttime">
            <Form.Label className="labels">Start Time</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="starttime"
            >
              <option value="" hidden>
                {starttime}
              </option>
              <option value="12:00">12:00</option>
              <option value="12:15">12:15</option>
              <option value="12:30">12:30</option>
              <option value="12:45">12:45</option>
              <option value="1:00">1:00</option>
              <option value="1:15">1:15</option>
              <option value="1:30">1:30</option>
              <option value="1:45">1:45</option>
              <option value="2:00">2:00</option>
              <option value="2:15">2:15</option>
              <option value="2:30">2:30</option>
              <option value="2:45">2:45</option>
              <option value="3:00">3:00</option>
              <option value="3:15">3:15</option>
              <option value="3:30">3:30</option>
              <option value="3:45">3:45</option>
              <option value="4:00">4:00</option>
              <option value="4:15">4:15</option>
              <option value="4:30">4:30</option>
              <option value="4:45">4:45</option>
              <option value="5:00">5:00</option>
              <option value="5:15">5:15</option>
              <option value="5:30">5:30</option>
              <option value="5:45">5:45</option>
              <option value="6:00">6:00</option>
              <option value="6:15">6:15</option>
              <option value="6:30">6:30</option>
              <option value="6:45">6:45</option>
              <option value="7:00">7:00</option>
              <option value="7:15">7:15</option>
              <option value="7:30">7:30</option>
              <option value="7:45">7:45</option>
              <option value="8:00">8:00</option>
              <option value="8:15">8:15</option>
              <option value="8:30">8:30</option>
              <option value="8:45">8:45</option>
              <option value="9:00">9:00</option>
              <option value="9:15">9:15</option>
              <option value="9:30">9:30</option>
              <option value="9:45">9:45</option>
              <option value="10:00">10:00</option>
              <option value="10:15">10:15</option>
              <option value="10:30">10:30</option>
              <option value="10:45">10:45</option>
              <option value="11:00">11:00</option>
              <option value="11:15">11:15</option>
              <option value="11:30">11:30</option>
              <option value="11:45">11:45</option>
            </Form.Control>
            <p className="errormessage">{starttimeerrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="startdaytime">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="startdaytime"
            >
              <option value="" hidden>
                {startdaytime}
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Form.Control>
            <p className="errormessage">{startdaytimeerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="endtime">
            <Form.Label className="labels">End Time</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="endtime"
            >
              <option value="" hidden>
                {endtime}
              </option>
              <option value="12:00">12:00</option>
              <option value="12:15">12:15</option>
              <option value="12:30">12:30</option>
              <option value="12:45">12:45</option>
              <option value="1:00">1:00</option>
              <option value="1:15">1:15</option>
              <option value="1:30">1:30</option>
              <option value="1:45">1:45</option>
              <option value="2:00">2:00</option>
              <option value="2:15">2:15</option>
              <option value="2:30">2:30</option>
              <option value="2:45">2:45</option>
              <option value="3:00">3:00</option>
              <option value="3:15">3:15</option>
              <option value="3:30">3:30</option>
              <option value="3:45">3:45</option>
              <option value="4:00">4:00</option>
              <option value="4:15">4:15</option>
              <option value="4:30">4:30</option>
              <option value="4:45">4:45</option>
              <option value="5:00">5:00</option>
              <option value="5:15">5:15</option>
              <option value="5:30">5:30</option>
              <option value="5:45">5:45</option>
              <option value="6:00">6:00</option>
              <option value="6:15">6:15</option>
              <option value="6:30">6:30</option>
              <option value="6:45">6:45</option>
              <option value="7:00">7:00</option>
              <option value="7:15">7:15</option>
              <option value="7:30">7:30</option>
              <option value="7:45">7:45</option>
              <option value="8:00">8:00</option>
              <option value="8:15">8:15</option>
              <option value="8:30">8:30</option>
              <option value="8:45">8:45</option>
              <option value="9:00">9:00</option>
              <option value="9:15">9:15</option>
              <option value="9:30">9:30</option>
              <option value="9:45">9:45</option>
              <option value="10:00">10:00</option>
              <option value="10:15">10:15</option>
              <option value="10:30">10:30</option>
              <option value="10:45">10:45</option>
              <option value="11:00">11:00</option>
              <option value="11:15">11:15</option>
              <option value="11:30">11:30</option>
              <option value="11:45">11:45</option>
            </Form.Control>
            <p className="errormessage">{endtimeerrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="enddaytime">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="enddaytime"
            >
              <option value="" hidden>
                {enddaytime}
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Form.Control>
            <p className="errormessage">{enddaytimeerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="timezone">
        <Form.Label className="labels">Time Zone</Form.Label>
        <Form.Control as="select" onChange={props.handleChange} name="timezone">
          <option value="" hidden>
            {timezone}
          </option>
          <option value="PST">PDT</option>
          <option value="EDT">EDT</option>
        </Form.Control>
        <p className="errormessage">{timezoneerrormsg}</p>
      </Form.Group>

      <Form.Group controlId="location">
        <Form.Label className="labels">Location</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="location"
          type="text"
          placeholder={location}
        />
        <p className="errormessage">{locationerrormsg}</p>
      </Form.Group>

      <Form.Group controlId="eligibility">
        <Form.Label className="labels">Eligibility</Form.Label>
        <Form.Control
          as="select"
          onChange={props.eligibilityoptionchange}
          name="eligibility"
        >
          <option value="" hidden>
            {eligibility}
          </option>
          <option value="all">All</option>
          <option value="other">Other</option>
        </Form.Control>
        {inputfield}
      </Form.Group>
      <p className="errormessage">{eligibilityerrormsg}</p>
      <Card.Footer>
        <Button className="cancel" onClick={props.cancel}>
          Cancel
        </Button>
        <Button className="save" onClick={props.save}>
          Save
        </Button>
      </Card.Footer>
    </Card>
  );
};
const mapStateToProps = (state) => ({ event: state.event });
const EditEventInfo = connect(mapStateToProps)(ConnectedEditEventInfo);
export default EditEventInfo;
