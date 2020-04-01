import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import hslogo from "../assets/logo.jpg";

import { connect } from "react-redux";
import { logout } from "../actions/logout";
import { loadstudentprofile } from "../actions/studentprofile";

class ConnectedNavigationbar extends React.Component {
  constructor(props) {
    super(props);
  }

  getCompanyImage() {
    // console.log("Company NAV BAR", this.state.id);
    axios
      .get(`http://localhost:3001/company/navbar/${this.state.id}`)
      .then(response => {
        const info = response.data;

        const cn = info.name.charAt(0);

        console.log(response.data);
        this.setState({
          // name: info.name,
          photo: info.photo,
          nameletter: cn
        });

        if (this.state.photo === "" || this.state.photo === null) {
          this.setState({
            has_image: false
          });
        } else {
          // const imageURL = `${Buffer.from(info.photo).toString()}`;

          this.setState({
            // photo: imageURL,
            has_image: true
          });
        }

        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        console.log(error.response.data);
      });
  }

  handleLogout = () => {
    this.props.dispatch(logout());
  };

  render() {
    let userprofile = this.props.userprofile;
    let fn = "";
    let ln = "";
    let has_image = "";
    let photo = "";

    if (localStorage.getItem("type") === "student") {
      if (userprofile.user !== null) {
        fn = userprofile.user.student.fname.charAt(0);
        ln = userprofile.user.student.lname.charAt(0);

        if (userprofile.user.student.photo) {
          photo = userprofile.user.student.photo;
          has_image = true;
        } else {
          has_image = false;
        }
      }
    }

    if (localStorage.getItem("type") === "company") this.getCompanyImage();

    let img = "";

    if (localStorage.getItem("type") === "student") {
      if (has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = (
          <div>
            <p className="navbarpic">
              {fn}
              {ln}
            </p>
          </div>
        );
      }
    }

    if (localStorage.getItem("type") === "company") {
      if (has_image === true) {
        img = (
          <Container>
            <img
              className="navbarpic"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              alt="user profile pic"
              roundedcircle="true"
            />
          </Container>
        );
      } else {
        img = <div>{/* <p className="navbarpic">{name}</p> */}</div>;
      }
    }

    let eventspath = "";
    let jobspath = "";
    // if (cookie.load("user") === "student") {
    //   eventspath = "/student/events/upcoming";
    //   jobspath = "/student/jobs/search";
    // } else {
    //   eventspath = "/company/events";
    //   jobspath = "/company/jobs";
    // }

    return (
      <Navbar id="navbar" expand="lg">
        <Nav.Link>
          <img id="logo" src={hslogo} alt="handshake logo" />
        </Nav.Link>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text className="searchbar">
              <FaSearch />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            className="searchbar"
            id="searchtext"
            type="search"
            placeholder="Search"
          />
        </InputGroup>
        <Nav className="ml-auto">
          <Link className="navbaritem" to={jobspath}>
            <span>Jobs</span>
          </Link>
          <Link className="navbaritem" to={eventspath}>
            <span>Events</span>
          </Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Q&amp;A</span>
          </Nav.Link>
          <Link className="navbaritem" to={``}>
            <span>Students</span>
          </Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Messages</span>
          </Nav.Link>
          <Nav.Link className="navbaritem" href="#">
            <span>Career Center</span>
          </Nav.Link>
          <NavDropdown className="navbardropdown" title={img}>
            <Link
              style={{ color: "black" }}
              to={`/${localStorage.getItem("type")}/${localStorage.getItem(
                "id"
              )}`}
            >
              Profile
            </Link>
            <NavDropdown.Divider />
            <Link style={{ color: "black" }} onClick={this.handleLogout} to="/">
              Log Out
            </Link>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const Navigationbar = connect(mapStateToProps)(ConnectedNavigationbar);
export default Navigationbar;
