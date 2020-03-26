import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/Handshakebanner.jpg";

import { connect } from "react-redux";
import { studentsignup } from "../../actions/studentsignup";

class ConnectedSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      college: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  signup = e => {
    e.preventDefault();

    const { fname, lname, email, password, college } = this.state;

    this.props.dispatch(
      studentsignup({ fname, lname, email, password, college })
    );
  };

  render() {
    let fnameerrormsg = "";
    let lnameerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";
    let collegeerrormsg = "";
    let accounterrormsg = "";

    const signup = this.props.signup;

    //redirect based on successful signup
    let redirectVar = null;

    if (signup.isAuthenticated === true) {
      const id = localStorage.getItem("id");
      const path = `/student/${id}`;
      redirectVar = <Redirect to={path} />;
    }

    if (signup.token === null && signup.payload) {
      signup.payload.forEach(err => {
        if (err.param === "fname") fnameerrormsg = err.msg;
        else if (err.param === "lname") lnameerrormsg = err.msg;
        else if (err.param === "email") emailerrormsg = err.msg;
        else if (err.param === "password") passerrormsg = err.msg;
        else if (err.param === "college") collegeerrormsg = err.msg;
        else accounterrormsg = err.msg;
      });
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="fname">
            <Form.Label className="labels">First Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.handleChange}
              placeholder="Enter First Name"
            />
            <p className="errormessage"> {fnameerrormsg}</p>
          </Form.Group>

          <Form.Group controlId="lname">
            <Form.Label className="labels">Last Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.handleChange}
              placeholder="Enter Last Name"
            />
            <p className="errormessage"> {lnameerrormsg}</p>
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="email">
              <Form.Label className="labels">Email</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="email"
                placeholder="Enter email"
              />
              <p className="errormessage"> {emailerrormsg}</p>
            </Form.Group>

            <Form.Group as={Col} controlId="password">
              <Form.Label className="labels">Password</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
              />
              <p className="errormessage"> {passerrormsg}</p>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="college">
            <Form.Label className="labels">College Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.handleChange}
              placeholder="Enter College Name"
            />
            <p className="errormessage"> {collegeerrormsg}</p>
          </Form.Group>

          <p className="errormessage" style={{ textAlign: "center" }}>
            {" "}
            {accounterrormsg}
          </p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="loginlink" to="/student/login">
            Already have an account? Log In
          </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { signup: state.signup };
};
const SignUp = connect(mapStateToProps)(ConnectedSignup);
export default SignUp;
