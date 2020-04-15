import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditJobInfo = (props) => {
  let titleerrormsg = "";
  let deadlinemontherrormsg = "";
  let deadlinedayerrormsg = "";
  let deadlineyearerrormsg = "";
  let deadlinetimeerrormsg = "";
  let deadlinedaytimeerrormsg = "";
  let locationerrormsg = "";
  let salaryerrormsg = "";
  let salarytimeerrormsg = "";
  let categoryerrormsg = "";
  let descriptionerrormsg = "";

  if (props.job.payload) {
    props.job.payload.forEach((err) => {
      if (err.param === "title") titleerrormsg = err.msg;
      else if (err.param === "deadlinemonth") deadlinemontherrormsg = err.msg;
      else if (err.param === "deadlineday") deadlinedayerrormsg = err.msg;
      else if (err.param === "deadlineyear") deadlineyearerrormsg = err.msg;
      else if (err.param === "deadlinetime") deadlinetimeerrormsg = err.msg;
      else if (err.param === "deadlinedaytime") deadlinedaytimeerrormsg = err.msg;
      else if (err.param === "location") locationerrormsg = err.msg;
      else if (err.param === "salary") salaryerrormsg = err.msg;
      else if (err.param === "salarytime") salarytimeerrormsg = err.msg;
      else if (err.param === "description") descriptionerrormsg = err.msg;
      else if (err.param === "category") categoryerrormsg = err.msg;
    });
  }

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

  if (props.job.job !== null) {
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

  return (
    <Card>
      <Form.Group controlId="title">
        <Form.Label className="labels">Job Title</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="title"
          type="text"
          placeholder={title}
        />
        <p className="errormessage">{titleerrormsg}</p>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="deadlinemonth">
            <Form.Label className="labels">Deadline Date</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="deadlinemonth"
            >
              <option value="" hidden>
                {months[deadlinemonth - 1]}
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
            <p className="errormessage">{deadlinemontherrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="deadlineday">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="deadlineday"
            >
              <option value="" hidden>
                {deadlineday}
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
            <p className="errormessage">{deadlinedayerrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="deadlineyear">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="deadlineyear"
            >
              <option value="" hidden>
                {deadlineyear}
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
            <p className="errormessage">{deadlineyearerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="deadlinetime">
            <Form.Label className="labels">Deadline Time</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="deadlinetime"
            >
              <option value="" hidden>
                {deadlinetime}
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
            <p className="errormessage">{deadlinetimeerrormsg}</p>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="deadlinedaytime">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="deadlinedaytime"
            >
              <option value="" hidden>
                {deadlinedaytime}
              </option>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Form.Control>
            <p className="errormessage">{deadlinedaytimeerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
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
      <Row>
        <Col>
          <Form.Group controlId="salary">
            <Form.Label className="labels">Salary</Form.Label>
            <Form.Control
              onChange={props.handleChange}
              name="salary"
              type="number"
              min={1}
              max={9223372036854775807}
              placeholder={salary}
            />
            <p className="errormessage">{salaryerrormsg}</p>
          </Form.Group>
        </Col>
        <p style={{ paddingTop: "20px" }}> per </p>
        <Col>
          <Form.Group controlId="salarytime">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="salarytime"
            >
              <option value="" hidden>
                {salarytime}
              </option>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </Form.Control>
            <p className="errormessage">{salarytimeerrormsg}</p>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="category">
        <Form.Label className="labels">Job Category</Form.Label>
        <Form.Control as="select" onChange={props.handleChange} name="category">
          <option value="" hidden>
            {category}
          </option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Intern">Intern</option>
          <option value="On-Campus">On-Campus</option>
        </Form.Control>
        <p className="errormessage">{categoryerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label className="labels">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="5"
          onChange={props.handleChange}
          name="description"
          type="text"
          placeholder={description}
        />
        <p className="errormessage">{descriptionerrormsg}</p>
      </Form.Group>
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
const mapStateToProps = (state) => ({ job: state.job });
const EditJobInfo = connect(mapStateToProps)(ConnectedEditJobInfo);
export default EditJobInfo;
