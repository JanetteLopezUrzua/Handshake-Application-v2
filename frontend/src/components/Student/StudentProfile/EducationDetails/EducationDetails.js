import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import EducationContainer from "./EducationContainer";
import NewFormEducation from "./NewFormEducation";

import { connect } from "react-redux";
import { addnewschool } from "../../../../actions/studentprofile";

class ConnectedEducationDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      newform: false,
      message: "",
      school: {
        name: "",
        primaryschool: "",
        location: "",
        degree: "",
        major: "",
        passingmonth: "",
        passingyear: "",
        gpa: ""
      }
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  addSchool = e => {
    e.preventDefault();

    this.setState({
      newform: true
    });
  };

  handleChange = e => {
    this.setState({
      school: {
        ...this.state.school,
        [e.target.id]: e.target.value
      }
    });
  };

  handleSave = async e => {
    e.preventDefault();
    const { id, school } = this.state;

    await this.props.dispatch(
      addnewschool({
        id,
        school
      })
    );

    if (this.props.userprofile.payload) {
    } else {
      this.setState({
        newform: false,
        school: {
          name: "",
          primaryschool: "",
          location: "",
          degree: "",
          major: "",
          passingmonth: "",
          passingyear: "",
          gpa: ""
        }
      });
    }
  };

  handleCancel = () => {
    this.setState({
      school: {
        schoolname: "",
        location: "",
        degree: "",
        major: "",
        passingmonth: "",
        passingyear: "",
        gpa: ""
      },
      newform: false
    });
  };

  handleDelete = (schoolname, degree) => {
    axios
      .delete("http://localhost:3001/student/educationinfo/delete", {
        data: { id: this.state.id, schoolname, degree }
      })
      .then(response => {
        console.log(response);
        this.getInfo();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let schoolsList = "";
    if (this.props.userprofile.user !== null) {
      if (this.props.userprofile.user.student.schools) {
        if (this.props.userprofile.user.student.schools.length === 0)
          schoolsList = "";
        else
          schoolsList = this.props.userprofile.user.student.schools.map(
            school => (
              <EducationContainer
                key={school._id}
                id={this.state.id}
                school={school}
                delete={this.handleDelete}
              />
            )
          );
      }
    }

    let newschoolform = "";
    if (this.state.newform === false) newschoolform = "";
    else {
      newschoolform = (
        <NewFormEducation
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
      );
    }

    let button = "";
    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    ) {
      button = (
        <Button onClick={this.addSchool} className="BottomAddButton">
          Add School
        </Button>
      );
    } else button = "";

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>
          Education
        </Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>
          {this.state.message}
        </Form.Label>
        <Container style={{ maxHeight: "800px", overflowY: "scroll" }}>
          {schoolsList}
          {newschoolform}
        </Container>
        <NavDropdown.Divider style={{ margin: "0" }}></NavDropdown.Divider>
        {button}
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const EducationDetails = connect(mapStateToProps)(ConnectedEducationDetails);
export default EducationDetails;
