import React from "react";
import { connect } from "react-redux";
import DisplayJobInfo from "./DisplayJobInfo";
import EditJobInfo from "./EditJobInfo";

import { updatejobinfo, deleteerrors } from "../../../../actions/jobs";

class ConnectedJobInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      job_id: "",
      title: "",
      deadlinemonth: "",
      deadlineday: "",
      deadlineyear: "",
      deadlinetime: "",
      deadlinedaytime: "",
      location: "",
      salary: "",
      salarytime: "",
      description: "",
      category: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSave = async (e) => {
    e.preventDefault();

    let title = "";
    let deadlinemonth = "";
    let deadlineday = "";
    let deadlineyear = "";
    let deadlinetime = "";
    let deadlinedaytime = "";
    let location = "";
    let salary = "";
    let salarytime = "";
    let description = "";
    let category = "";

    if (this.props.job.job !== null) {
      title = this.state.title !== ""
        ? this.state.title
        : this.props.job.job.job.title;
      deadlinemonth = this.state.deadlinemonth !== ""
        ? this.state.deadlinemonth
        : this.props.job.job.job.deadlinemonth;
      deadlineday = this.state.deadlineday !== ""
        ? this.state.deadlineday
        : this.props.job.job.job.deadlineday;
      deadlineyear = this.state.deadlineyear !== ""
        ? this.state.deadlineyear
        : this.props.job.job.job.deadlineyear;
      deadlinetime = this.state.deadlinetime !== ""
        ? this.state.deadlinetime
        : this.props.job.job.job.deadlinetime;
      deadlinedaytime = this.state.deadlinedaytime !== ""
        ? this.state.deadlinedaytime
        : this.props.job.job.job.deadlinedaytime;
      location = this.state.location !== ""
        ? this.state.location
        : this.props.job.job.job.location;
      salary = this.state.salary !== ""
        ? this.state.salary
        : this.props.job.job.job.salary;
      salarytime = this.state.salarytime !== ""
        ? this.state.salarytime
        : this.props.job.job.job.salarytime;
      description = this.state.description !== ""
        ? this.state.description
        : this.props.job.job.job.description;
      category = this.state.category !== ""
        ? this.state.category
        : this.props.job.job.job.category;
    }

    const jobid = this.state.job_id;
    const job = {
      title,
      deadlinemonth,
      deadlineday,
      deadlineyear,
      deadlinetime,
      deadlinedaytime,
      location,
      salary,
      salarytime,
      description,
      category,
    };

    await this.props.dispatch(updatejobinfo(jobid, job));

    if (this.props.job.payload) {
    } else {
      this.setState({
        editWasTriggered: false,
        title: "",
        deadlinemonth: "",
        deadlineday: "",
        deadlineyear: "",
        deadlinetime: "",
        deadlinedaytime: "",
        location: "",
        salary: "",
        salarytime: "",
        description: "",
        category: "",
      });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      title: "",
      deadlinemonth: "",
      deadlineday: "",
      deadlineyear: "",
      deadlinetime: "",
      deadlinedaytime: "",
      location: "",
      salary: "",
      salarytime: "",
      description: "",
      category: "",
      editWasTriggered: false,
    });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = <DisplayJobInfo clicked={this.handleClick} />;

    if (editWasTriggered) {
      display = (
        <EditJobInfo
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = (state) => ({ job: state.job });
const JobInfo = connect(mapStateToProps)(ConnectedJobInfo);
export default JobInfo;
