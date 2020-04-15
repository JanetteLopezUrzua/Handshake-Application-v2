import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import JobApplicationsModal from "./JobApplicationsModal";

import {
  companyloadapplicationslist,
  company_update_application_status,
} from "../../../../actions/jobs";

class ConnectedJobApplications extends React.Component {
  constructor() {
    super();

    this.state = {
      job_id: "",
      show: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id });

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleStatus = async (e, appid) => {
    const status = e.target.value;
    const jobid = this.state.job_id;
    console.log("clicked");
    await this.props.dispatch(company_update_application_status(appid, status));
    await this.props.dispatch(companyloadapplicationslist(jobid));
  };

  render() {
    let button = "";
    let message = "";

    if (this.props.applicationslist.applications !== null) {
      if (this.props.applicationslist.applications.applications) {
        if (
          this.props.applicationslist.applications.applications.length === 0
        ) {
          message = "No one has applied to this job.";
          button = (
            <Button style={{ cursor: "not-allowed" }} disabled>
              View Applications
            </Button>
          );
        } else {
          message = "";
          button = <Button onClick={this.handleShow}>View Applications</Button>;
        }
      }
    }

    return (
      <div style={{ textAlign: "right" }}>
        <JobApplicationsModal
          show={this.state.show}
          close={this.handleClose}
          handleStatus={this.handleStatus}
        />
        {button}
        <br />
        <p className="errormessage">{message}</p>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ applicationslist: state.applicationslist });
const JobApplications = connect(mapStateToProps)(ConnectedJobApplications);
export default JobApplications;
