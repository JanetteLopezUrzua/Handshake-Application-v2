import React from "react";
import axios from "axios";
import DisplayEducation from "./DisplayEducation";
import EditEducation from "./EditEducation";

import { connect } from "react-redux";
import { deleteschool } from "../../../../actions/studentprofile";

class ConnectedEducationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      school: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = props => ({
    id: props.id,
    school: props.school
  });

  handleClick = e => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = e => {
    this.setState({
      school: {
        ...this.state.school,
        [e.target.id]: e.target.value
      }
    });
  };

  handleSave = e => {
    e.preventDefault();

    const data = {
      id: this.state.id,
      schoolname: this.state.school.schoolname,
      primaryschool: "false",
      location: this.state.school.location,
      degree: this.state.school.degree,
      major: this.state.school.major,
      passingmonth: this.state.school.passingmonth,
      passingyear: this.state.school.passingyear,
      gpa: this.state.school.gpa
    };

    axios
      .post("http://localhost:3001/student/educationinfo", data)
      .then(response => {
        console.log(response);
        this.setState({
          editWasTriggered: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          school: ""
        });
      });
  };

  handleCancel = () => {
    this.setState({
      school: this.props.school,
      editWasTriggered: false
    });
  };

  handleDelete = async e => {
    e.preventDefault();
    const id = this.state.id;
    const schoolid = this.state.school._id;
    await this.props.deleteschool(id, schoolid);

    this.setState({
      editWasTriggered: false
    });
  };

  render() {
    let display = "";
    display = (
      <DisplayEducation
        id={this.state.id}
        clicked={this.handleClick}
        school={this.state.school}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditEducation
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
          school={this.state.school}
          delete={this.handleDelete}
        />
      );
    }

    return <>{display}</>;
  }
}
function mapDispatchToProps(dispatch) {
  return {
    deleteschool: (id, schoolid) => dispatch(deleteschool(id, schoolid))
  };
}
const EducationContainer = connect(
  null,
  mapDispatchToProps
)(ConnectedEducationContainer);
export default EducationContainer;
