import React from "react";
import DisplayEducation from "./DisplayEducation";
import EditEducation from "./EditEducation";

import { connect } from "react-redux";
import {
  updateschool,
  deleteerrors,
  loadstudentprofile,
} from "../../../../actions/studentprofile";

class ConnectedEducationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      schoolid: "",
      primaryschool: "",
      school: {
        name: props.school.name,
        location: props.school.location,
        degree: props.school.degree,
        major: props.school.major,
        passingmonth: props.school.passingmonth,
        passingyear: props.school.passingyear,
        gpa: props.school.gpa,
      },
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({
    id: props.id,
    schoolid: props.schoolid,
    primaryschool: props.school.primaryschool,
  });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = (e) => {
    this.setState({
      school: {
        ...this.state.school,
        [e.target.id]: e.target.value,
      },
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const id = this.state.id;
    const schoolid = this.state.schoolid;
    const school = {
      location: this.state.school.location,
      degree: this.state.school.degree,
      major: this.state.school.major,
      passingmonth: this.state.school.passingmonth,
      passingyear: this.state.school.passingyear,
      gpa: this.state.school.gpa,
    };

    await this.props.dispatch(updateschool(id, school, schoolid));

    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    )
      await this.props.dispatch(loadstudentprofile(localStorage.getItem("id")));

    if (this.props.currentuser.payload) {
    } else {
      this.setState({
        editWasTriggered: false,
      });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      school: this.props.school,
      editWasTriggered: false,
    });
  };

  handleDelete = (e) => {
    e.preventDefault();
    this.props.delete(this.state.schoolid);

    this.setState({
      editWasTriggered: false,
    });
  };

  render() {
    let display = "";
    display = (
      <DisplayEducation
        id={this.state.id}
        primaryschool={this.state.primaryschool}
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
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser };
};
const EducationContainer = connect(mapStateToProps)(
  ConnectedEducationContainer
);
export default EducationContainer;
