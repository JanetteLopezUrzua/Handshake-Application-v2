import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedEditEducation = props => {
  let schoolnameerrormsg = "";
  let gpaerrormsg = "";
  let othererrormsg = "";

  if (props.userprofile.payload) {
    props.userprofile.payload.forEach(err => {
      if (err.param === "name") schoolnameerrormsg = err.update.msg;
      else if (err.param === "gpa") gpaerrormsg = err.update.msg;
      else othererrormsg = err.updateschoolmsg;
    });
  }

  let {
    name,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  } = props.school;

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
    "December"
  ];

  return (
    <Container
      style={{
        paddingRight: "0",
        paddingLeft: "10px",
        marginBottom: "30px",
        cursor: "pointer"
      }}
    >
      <Form.Group controlId="name">
        <Form.Label className="labels">School Name</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="name"
          type="text"
          placeholder={name}
          readOnly
        />
        <p className="errormessage">{schoolnameerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="degree">
        <Form.Label className="labels">Education Level</Form.Label>
        <Form.Control
          as="select"
          onChange={props.handleChange}
          name="degree"
          type="text"
          placeholder={degree}
        >
          <option value="" hidden>
            {degree}
          </option>
          <option>High school</option>
          <option>Associates</option>
          <option>Certificate</option>
          <option>Advanced certificate</option>
          <option>Bachelors</option>
          <option>Masters</option>
          <option>Doctorate</option>
          <option>Postdoctoral studies</option>
          <option>Non-degree seeking</option>
        </Form.Control>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="passingmonth">
            <Form.Label className="labels">End Date</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="month"
              type="text"
              placeholder={months[passingmonth - 1]}
            >
              <option value="" hidden>
                {months[passingmonth - 1]}
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
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="passingyear">
            <Form.Label className="labels"></Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="year"
              type="number"
            >
              <option value="" hidden>
                {passingyear}
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
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
              <option value="2002">2002</option>
              <option value="2001">2001</option>
              <option value="2000">2000</option>
              <option value="1999">1999</option>
              <option value="1998">1998</option>
              <option value="1997">1997</option>
              <option value="1996">1996</option>
              <option value="1995">1995</option>
              <option value="1994">1994</option>
              <option value="1993">1993</option>
              <option value="1992">1992</option>
              <option value="1991">1991</option>
              <option value="1990">1990</option>
              <option value="1989">1989</option>
              <option value="1988">1988</option>
              <option value="1987">1987</option>
              <option value="1986">1986</option>
              <option value="1985">1985</option>
              <option value="1984">1984</option>
              <option value="1983">1983</option>
              <option value="1982">1982</option>
              <option value="1981">1981</option>
              <option value="1980">1980</option>
              <option value="1979">1979</option>
              <option value="1978">1978</option>
              <option value="1977">1977</option>
              <option value="1976">1976</option>
              <option value="1975">1975</option>
              <option value="1974">1974</option>
              <option value="1973">1973</option>
              <option value="1972">1972</option>
              <option value="1971">1971</option>
              <option value="1970">1970</option>
              <option value="1969">1969</option>
              <option value="1968">1968</option>
              <option value="1967">1967</option>
              <option value="1966">1966</option>
              <option value="1965">1965</option>
              <option value="1964">1964</option>
              <option value="1963">1963</option>
              <option value="1962">1962</option>
              <option value="1961">1961</option>
              <option value="1960">1960</option>
              <option value="1959">1959</option>
              <option value="1958">1958</option>
              <option value="1957">1957</option>
              <option value="1956">1956</option>
              <option value="1955">1955</option>
              <option value="1954">1954</option>
              <option value="1953">1953</option>
              <option value="1952">1952</option>
              <option value="1951">1951</option>
              <option value="1950">1950</option>
              <option value="1949">1949</option>
              <option value="1948">1948</option>
              <option value="1947">1947</option>
              <option value="1946">1946</option>
              <option value="1945">1945</option>
              <option value="1944">1944</option>
              <option value="1943">1943</option>
              <option value="1942">1942</option>
              <option value="1941">1941</option>
              <option value="1940">1940</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="major">
        <Form.Label className="labels">Major</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="major"
          type="text"
          placeholder={major}
        />
      </Form.Group>
      <Form.Group controlId="gpa">
        <Form.Label className="labels">Cumulative GPA</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="gpa"
          type="number"
          placeholder={gpa}
        />
        <p className="errormessage">{gpaerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="location">
        <Form.Label className="labels">School Location</Form.Label>
        <Form.Control
          onChange={props.handleChange}
          name="location"
          type="text"
          placeholder={location}
        />
      </Form.Group>
      <p className="errormessage">{othererrormsg}</p>
      <Row>
        <Col>
          <Button className="delete" onClick={props.delete}>
            Delete
          </Button>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button className="cancel" onClick={props.cancel}>
            Cancel
          </Button>
          <Button className="save" onClick={props.save}>
            Save
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const EditEducation = connect(mapStateToProps)(ConnectedEditEducation);
export default EditEducation;
