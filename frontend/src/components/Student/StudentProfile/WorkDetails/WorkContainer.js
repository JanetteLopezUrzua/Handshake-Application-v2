import React from "react";
import DisplayWork from "./DisplayWork";
import EditWork from "./EditWork";

import { connect } from "react-redux";
import {
  deletejob,
  updatejob,
  deleteerrors
} from "../../../../actions/studentprofile";

class ConnectedWorkContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      jobid: "",
      job: {
        companyname: props.job.companyname,
        title: props.job.title,
        startdatemonth: props.job.startdatemonth,
        startdateyear: props.job.startdateyear,
        enddatemonth: props.job.enddatemonth,
        enddateyear: props.job.enddateyear,
        description: props.job.description
      },
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = props => ({
    id: props.id,
    jobid: props.jobid
  });

  handleClick = e => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
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

    const id = this.state.id;
    const jobid = this.state.jobid;
    const job = {
      startdatemonth: this.state.job.startdatemonth,
      startdateyear: this.state.job.startdateyear,
      enddatemonth: this.state.job.enddatemonth,
      enddateyear: this.state.job.enddateyear,
      description: this.state.job.description
    };

    await this.props.dispatch(updatejob(id, job, jobid));

    if (this.props.userprofile.payload) {
    } else {
      this.setState({
        editWasTriggered: false
      });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      job: this.props.job,
      editWasTriggered: false
    });
  };

  handleDelete = async e => {
    e.preventDefault();
    const id = this.state.id;
    const jobid = this.state.jobid;
    await this.props.dispatch(deletejob(id, jobid));

    this.setState({
      editWasTriggered: false
    });
  };

  render() {
    let display = "";
    display = (
      <DisplayWork
        id={this.state.id}
        clicked={this.handleClick}
        job={this.state.job}
      />
    );

    if (this.state.editWasTriggered) {
      display = (
        <EditWork
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
          job={this.state.job}
          delete={this.handleDelete}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const WorkContainer = connect(mapStateToProps)(ConnectedWorkContainer);
export default WorkContainer;
