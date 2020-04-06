import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../components.css";
import hsimage from "../../assets/Handshakebanner.jpg";

import { connect } from "react-redux";
import { companysignup } from "../../actions/companysignup";

class ConnectedSignup extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      location: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  signup = async e => {
    e.preventDefault();

    const { name, email, password, location } = this.state;

    await this.props.dispatch(
      companysignup({ name, email, password, location })
    );
  };

  render() {
    let nameerrormsg = "";
    let emailerrormsg = "";
    let passerrormsg = "";
    let locationerrormsg = "";
    let accounterrormsg = "";

    const signup = this.props.signup;

    //redirect based on successful signup
    let redirectVar = null;

    if (signup.isAuthenticated === true) {
      const id = localStorage.getItem("id");
      const path = `/company/${id}`;
      redirectVar = <Redirect to={path} />;
    }

    if (signup.token === null && signup.payload) {
      signup.payload.forEach(err => {
        if (err.param === "name") nameerrormsg = err.msg;
        else if (err.param === "email") emailerrormsg = err.msg;
        else if (err.param === "password") passerrormsg = err.msg;
        else if (err.param === "location") locationerrormsg = err.msg;
        else accounterrormsg = err.msg;
      });
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Sign Up</h2>
        <Form id="signup-form">
          <Form.Group controlId="name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.handleChange}
              placeholder="Enter Company Name"
            />
            <p className="errormessage"> {nameerrormsg}</p>
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

          <Form.Group controlId="location">
            <Form.Label className="labels">Location</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.handleChange}
              placeholder="Enter Location"
            />
            <p className="errormessage"> {locationerrormsg}</p>
          </Form.Group>

          <p className="errormessage" style={{ textAlign: "center" }}>
            {" "}
            {accounterrormsg}
          </p>

          <Button onClick={this.signup} className="submitbutton" type="submit">
            Sign Up
          </Button>

          <Link className="loginlink" to="/company/login">
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
