import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../components.css";
import { connect } from "react-redux";
import hsimage from "../../assets/Handshakebanner.jpg";

import { companylogin } from "../../actions/companylogin";

class ConnectedLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  login = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    await this.props.dispatch(companylogin({ email, password }));
  };

  render() {
    let emailerrormsg = "";
    let passerrormsg = "";
    let accounterrormsg = "";

    const { login } = this.props;

    // redirect based on successful signup
    let redirectVar = null;

    if (login.isAuthenticated === true) {
      const id = localStorage.getItem("id");
      const path = `/company/${id}`;
      redirectVar = <Redirect to={path} />;
    }

    if (login.token === null && login.payload) {
      login.payload.forEach(err => {
        if (err.param === "email") emailerrormsg = err.msg;
        else if (err.param === "password") passerrormsg = err.msg;
        else accounterrormsg = err.msg;
      });
    }

    return (
      <div>
        {redirectVar}
        <img id="banner" src={hsimage} alt="handshake banner" />
        <h2 className="pagetitle">Log In</h2>
        <Form id="signup-form">
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

          <p className="errormessage" style={{ textAlign: "center" }}>
            {" "}
            {accounterrormsg}
          </p>

          <Button onClick={this.login} className="submitbutton" type="submit">
            Log In
          </Button>

          <Link className="loginlink" to="/company/signup">
            Don&apos;t have an account? Sign Up
          </Link>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ login: state.login });
const LogIn = connect(mapStateToProps)(ConnectedLogin);
export default LogIn;
