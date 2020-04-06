import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import DisplaySkills from "./DisplaySkills";
import EditSkills from "./EditSkills";

import { connect } from "react-redux";
import {
  updateskills,
  deleteskill,
  loadstudentprofile,
} from "../../../../actions/studentprofile";

class ConnectedSkillset extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      skill: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  skillsChangeHandler = (e) => {
    this.setState({
      skill: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const { id, skill } = this.state;

    await this.props.dispatch(
      updateskills({
        id,
        skill,
      })
    );

    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    )
      await this.props.dispatch(loadstudentprofile(localStorage.getItem("id")));
  };

  handleDelete = async (skill, e) => {
    e.preventDefault();
    const id = this.state.id;
    await this.props.dispatch(deleteskill(id, skill));

    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    )
      await this.props.dispatch(loadstudentprofile(localStorage.getItem("id")));
  };

  render() {
    let skillsList = "";
    if (this.props.currentuser.user !== null) {
      if (this.props.currentuser.user.student.skillset) {
        if (this.props.currentuser.user.student.skillset.length === 0)
          skillsList = "";
        else
          skillsList = this.props.currentuser.user.student.skillset.map(
            (skill) => (
              <DisplaySkills
                key={skill._id}
                id={this.state.id}
                skill={skill.skill}
                handleDelete={this.handleDelete}
              />
            )
          );
      }
    }

    let skillerrormsg = "";

    if (this.props.currentuser.payload) {
      this.props.currentuser.payload.forEach((err) => {
        if (err.param === "skill") skillerrormsg = err.msg;
        else skillerrormsg = err.skillmsg;
      });
    }

    return (
      <Card>
        <Card.Title>Skills</Card.Title>
        <Container style={{ maxHeight: "200px", overflowY: "scroll" }}>
          {skillsList}
        </Container>
        <EditSkills
          id={this.state.id}
          skillschange={this.skillsChangeHandler}
          save={this.handleSave}
        />
        <p className="errormessage">{skillerrormsg}</p>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser };
};
const Skillset = connect(mapStateToProps)(ConnectedSkillset);
export default Skillset;
