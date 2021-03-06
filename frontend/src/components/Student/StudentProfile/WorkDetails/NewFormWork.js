import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedNewFormWork = (props) => {
  let companynameerrormsg = "";
  let titleerrormsg = "";
  let othererrormsg = "";

  if (props.currentuser.payload) {
    props.currentuser.payload.forEach((err) => {
      if (err.param === "companyname") companynameerrormsg = err.msg;
      else if (err.param === "title") titleerrormsg = err.msg;
      else othererrormsg = err.jobmsg;
    });
  }

  return (
    <Container
      style={{
        paddingRight: "0",
        paddingLeft: "10px",
        marginBottom: "30px",
        cursor: "pointer",
      }}
    >
      <Form.Label className="labels">Add New Work Experience</Form.Label>
      <Form.Group controlId="companyname">
        <Form.Label className="labels">Company Name</Form.Label>
        <Form.Control onChange={props.handleChange} name="name" type="text" />
        <p className="errormessage">{companynameerrormsg}</p>
      </Form.Group>
      <Form.Group controlId="title">
        <Form.Label className="labels">Job Title</Form.Label>
        <Form.Control onChange={props.handleChange} name="title" type="text" />
        <p className="errormessage">{titleerrormsg}</p>
      </Form.Group>
      <Row>
        <Col>
          <Form.Group controlId="startdatemonth">
            <Form.Label className="labels">Start Date</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="month"
              type="text"
            >
              <option value="" hidden />
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
          <Form.Group controlId="startdateyear">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="year"
              type="number"
            >
              <option value="" hidden />
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
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="enddatemonth">
            <Form.Label className="labels">End Date</Form.Label>
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="month"
              type="text"
            >
              <option value="" hidden />
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
          <Form.Group controlId="enddateyear">
            <Form.Label className="labels" />
            <Form.Control
              as="select"
              onChange={props.handleChange}
              name="year"
              type="number"
            >
              <option value="" hidden />
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
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="description">
        <Form.Label className="labels">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          onChange={props.handleChange}
          name="description"
          type="text"
        />
      </Form.Group>
      <p className="errormessage">{othererrormsg}</p>
      <Row>
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
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const NewFormWork = connect(mapStateToProps)(ConnectedNewFormWork);
export default NewFormWork;
