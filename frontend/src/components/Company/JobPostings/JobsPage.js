import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import JobsListContainer from "./JobsListContainer/JobsListContainer";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { connect } from "react-redux";
import { companyloadjobslist } from "../../../actions/jobs";

class ConnectedJobsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      redirect: "",
    };
  }

  async componentDidMount() {
    const id = localStorage.getItem("id");
    await this.props.dispatch(companyloadjobslist(1, id));

    this.setState({
      page: 1,
    });
  }

  nextPage = async () => {
    let nextpage = this.state.page + 1;
    await this.props.dispatch(
      companyloadjobslist(nextpage, localStorage.getItem("id"))
    );
    window.scrollTo(0, 0);
    this.setState({
      page: nextpage,
      redirect: <Redirect to={`/company/jobs?page=${nextpage}`} />,
    });
  };

  prevPage = async () => {
    let prevpage = this.state.page - 1;
    await this.props.dispatch(
      companyloadjobslist(prevpage, localStorage.getItem("id"))
    );
    window.scrollTo(0, 0);
    this.setState({
      page: prevpage,
      redirect: <Redirect to={`/company/jobs?page=${prevpage}`} />,
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    } else if (localStorage.getItem("type") === "student") {
      redirectVar = <Redirect to={`/student/${localStorage.getItem("id")}`} />;
    }

    let jobsList = "";
    let message = "";
    let currPage = "";
    let numOfPages = "";
    let limit = "";
    let totalJobs = "";
    let pageRedirect = null;
    let pagesArrows = "";

    if (this.props.jobslist.jobs !== null) {
      if (this.props.jobslist.jobs.jobsList.docs) {
        if (this.props.jobslist.jobs.jobsList.docs.length === 0) {
          jobsList = "";
          message = "You have 0 job postings";
        } else {
          jobsList = this.props.jobslist.jobs.jobsList.docs.map((job) => {
            return (
              <JobsListContainer key={job._id} jobid={job._id} job={job} />
            );
          });
          currPage = this.props.jobslist.jobs.jobsList.page;
          numOfPages = this.props.jobslist.jobs.jobsList.pages;
          limit = this.props.jobslist.jobs.jobsList.limit;
          totalJobs = this.props.jobslist.jobs.jobsList.total;
          pageRedirect = this.state.redirect;

          if (this.state.page === 1 && currPage !== numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.prevPage}
                    disabled
                  >
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${this.state.page} / ${numOfPages}`}</div>
                  <Button className="pagesbuttons" onClick={this.nextPage}>
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else if (this.state.page === 1 && currPage === numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.prevPage}
                    disabled
                  >
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${this.state.page} / ${numOfPages}`}</div>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.nextPage}
                    disabled
                  >
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else if (currPage === numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button className="pagesbuttons" onClick={this.prevPage}>
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${currPage} / ${numOfPages}`}</div>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.nextPage}
                    disabled
                  >
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button className="pagesbuttons" onClick={this.prevPage}>
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${currPage} / ${numOfPages}`}</div>
                  <Button className="pagesbuttons" onClick={this.nextPage}>
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          }
        }
      }
    }

    return (
      <Container style={{ width: "60%" }}>
        {redirectVar}
        {pageRedirect}
        <Link
          style={{ margin: "15px", display: "block" }}
          to="/company/jobs/new"
        >
          Create a New Job Posting
        </Link>
        {jobsList}
        {pagesArrows}
        <p className="errormessage">{message}</p>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userprofile: state.userprofile,
    jobslist: state.jobslist,
  };
};
const JobsPage = connect(mapStateToProps)(ConnectedJobsPage);
export default JobsPage;
