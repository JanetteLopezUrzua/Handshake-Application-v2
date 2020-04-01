import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
// import cookie from 'react-cookies';
import DisplaySkills from "./DisplaySkills";
import EditSkills from "./EditSkills";

import { connect } from "react-redux";
import { updateskills, deleteskill } from "../../../../actions/studentprofile";

class ConnectedSkillset extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      skill: ""
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  skillsChangeHandler = e => {
    this.setState({
      skill: e.target.value
    });
  };

  handleSave = async e => {
    e.preventDefault();

    const { id, skill } = this.state;

    await this.props.dispatch(
      updateskills({
        id,
        skill
      })
    );
  };

  handleDelete = async (skill, e) => {
    e.preventDefault();
    const id = this.state.id;
    await this.props.dispatch(deleteskill(id, skill));
  };

  render() {
    let skillsList = "";
    if (this.props.userprofile.user !== null) {
      if (this.props.userprofile.user.student.skillset) {
        if (this.props.userprofile.user.student.skillset.length === 0)
          skillsList = "";
        else
          skillsList = this.props.userprofile.user.student.skillset.map(
            skill => (
              <DisplaySkills
                id={this.state.id}
                skill={skill.skill}
                handleDelete={this.handleDelete}
              />
            )
          );
      }
    }

    let skillerrormsg = "";

    if (this.props.userprofile.payload) {
      this.props.userprofile.payload.forEach(err => {
        if (err.param === "skill") skillerrormsg = err.msg;
        else skillerrormsg = err.msg;
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
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const Skillset = connect(mapStateToProps)(ConnectedSkillset);
export default Skillset;
