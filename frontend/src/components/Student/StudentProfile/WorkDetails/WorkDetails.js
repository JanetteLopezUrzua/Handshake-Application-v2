import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import WorkContainer from "./WorkContainer";
import NewFormWork from "./NewFormWork";

import { connect } from "react-redux";
import { addnewjob } from "../../../../actions/studentprofile";

class ConnectedWorkDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      newform: false,
      job: {
        companyname: "",
        title: "",
        startdatemonth: "",
        startdateyear: "",
        enddatemonth: "",
        enddateyear: "",
        description: ""
      }
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  addWork = e => {
    e.preventDefault();

    this.setState({
      newform: true
    });
  };

  handleChange = e => {
    this.setState({
      job: {
        ...this.state.job,
        [e.target.id]: e.target.value
      }
    });
  };

  handleSave = async e => {
    e.preventDefault();
    const { id, job } = this.state;

    await this.props.dispatch(
      addnewjob({
        id,
        job
      })
    );

    if (this.props.userprofile.payload) {
    } else {
      this.setState({
        newform: false,
        job: {
          companyname: "",
          title: "",
          startdatemonth: "",
          startdateyear: "",
          enddatemonth: "",
          enddateyear: "",
          description: ""
        }
      });
    }
  };

  handleCancel = () => {
    this.setState({
      job: {
        companyname: "",
        title: "",
        startdatemonth: "",
        startdateyear: "",
        enddatemonth: "",
        enddateyear: "",
        description: ""
      },
      newform: false
    });
  };

  render() {
    let jobsList = "";
    let message = "";

    if (this.props.userprofile.user !== null) {
      if (this.props.userprofile.user.student.jobs) {
        if (this.props.userprofile.user.student.jobs.length === 0) {
          jobsList = "";
          message = "Where is somewhere you have worked?";
        } else
          jobsList = this.props.userprofile.user.student.jobs.map(job => (
            <WorkContainer
              key={job._id}
              jobid={job._id}
              id={this.state.id}
              job={job}
            />
          ));
      }
    }

    let newjobform = "";
    if (this.state.newform === false) newjobform = "";
    else {
      newjobform = (
        <NewFormWork
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
        <Button onClick={this.addWork} className="BottomAddButton">
          Add Work Experience
        </Button>
      );
    } else button = "";

    return (
      <Card style={{ padding: "0" }}>
        <Card.Title style={{ paddingLeft: "24px", paddingTop: "24px" }}>
          Work Experience
        </Card.Title>
        <Form.Label style={{ color: "blue", padding: "0 24px" }}>
          {message}
        </Form.Label>
        <Container style={{ maxHeight: "800px", overflowY: "scroll" }}>
          {jobsList}
          {newjobform}
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
const WorkDetails = connect(mapStateToProps)(ConnectedWorkDetails);
export default WorkDetails;
