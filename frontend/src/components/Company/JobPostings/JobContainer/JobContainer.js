import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router";
import JobInfo from "../JobInfo/JobInfo";
import JobApplications from "../JobApplications/JobApplications";

import setAuthToken from "../../../../utils/setAuthToken";
import { connect } from "react-redux";
import {
  companyloadjob,
  companydeletejob,
  companyloadapplicationslist,
} from "../../../../actions/jobs";

class ConnectedJobContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      job_id: this.props.match.params.job_id,
      redirect: false,
    };
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      await this.props.dispatch(companyloadjob(this.state.job_id));
      await this.props.dispatch(companyloadapplicationslist(this.state.job_id));
    }
  }

  handleDelete = async () => {
    await this.props.dispatch(companydeletejob(this.state.job_id));
    this.setState({
      redirect: true,
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    }

    if (this.state.redirect === true) {
      redirectVar = <Redirect to="/company/jobs" />;
    }

    let company_id = "";

    if (this.props.job.job !== null) {
      company_id = this.props.job.job.job.companyid._id
        ? this.props.job.job.job.companyid._id
        : "";
    }

    let del = "";
    if (
      localStorage.getItem("id") === company_id &&
      localStorage.getItem("type") === "company"
    ) {
      del = (
        <Button
          className="delete"
          style={{ margin: "15px" }}
          onClick={this.handleDelete}
        >
          Delete Job Post
        </Button>
      );
    }

    return (
      <Container>
        {redirectVar}
        <Card>
          <JobApplications job_id={this.props.match.params.job_id} />
          <JobInfo job_id={this.props.match.params.job_id} />
        </Card>
        {del}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { userprofile: state.userprofile, job: state.job };
};
const JobContainer = connect(mapStateToProps)(ConnectedJobContainer);
export default JobContainer;
