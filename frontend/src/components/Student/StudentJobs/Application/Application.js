import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ApplicationModal from "./ApplicationModal";

import { connect } from "react-redux";
import {
  uploadresume,
  companyloadapplicationslist,
} from "../../../../actions/jobs";

class ConnectedApplication extends React.Component {
  constructor() {
    super();

    this.state = {
      job_id: "",
      show: false,
      validfile: "",
      errormessage: "",
      data: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ job_id: props.job_id });

  resumeHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getResume(file);
  };

  getResume = (file) => {
    const data = new FormData();

    if (file && file.type.match(".pdf")) {
      data.append("file", file);
      data.append("name", "file");

      this.setState({
        data,
        validfile: true,
        errormessage: "",
      });
    } else {
      this.setState({
        validfile: false,
        errormessage: "File not accepted. Choose a PDF File.",
      });
    }
  };

  onUpload = async (e) => {
    e.preventDefault();
    if (this.state.validfile === true) {
      const { job_id, data } = this.state;
      let student_id = localStorage.getItem("id");

      const date = new Date();
      const day = `${date.getDate()}`.slice(-2);
      let month = `${date.getMonth()}`.slice(-2);
      const year = date.getFullYear();

      await this.props.dispatch(
        uploadresume(job_id, student_id, data, "Pending", month, day, year)
      );

      await this.props.dispatch(companyloadapplicationslist(job_id));

      if (this.props.application.payload) {
      } else {
        this.setState({
          show: false,
        });
      }
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
      errormessage: "",
    });
  };

  handleShow = () =>
    this.setState({
      show: true,
    });

  render() {
    let alreadyapplied = "";

    if (this.props.applicationslist.applications !== null) {
      if (this.props.applicationslist.applications.applications) {
        if (
          this.props.applicationslist.applications.applications.length === 0
        ) {
          alreadyapplied = false;
        } else {
          this.props.applicationslist.applications.applications.map(
            (application) => {
              if (
                application.studentid._id === localStorage.getItem("id") &&
                localStorage.getItem("type") === "student"
              ) {
                alreadyapplied = true;
              } else {
                alreadyapplied = false;
              }
            }
          );
        }
      }
    }

    let button = "";
    if (alreadyapplied === true) {
      button = (
        <Button
          className="cancel"
          style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
          onClick={this.handleShow}
          disabled
        >
          Applied
        </Button>
      );
    } else
      button = (
        <Button className="save" onClick={this.handleShow}>
          Apply
        </Button>
      );

    return (
      <div>
        <ApplicationModal
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          resumeHandler={this.resumeHandler}
          errormessage={this.state.errormessage}
        />
        {button}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    application: state.application,
    applicationslist: state.applicationslist,
  };
};
const Application = connect(mapStateToProps)(ConnectedApplication);
export default Application;
