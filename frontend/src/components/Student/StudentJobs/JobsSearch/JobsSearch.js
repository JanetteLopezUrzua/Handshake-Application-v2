import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MdLocationOn } from "react-icons/md";
import { Redirect } from "react-router";

import { connect } from "react-redux";
import JobsListDisplay from "./JobsListDisplay";
import JobDescriptionDisplay from "./JobDescriptionDisplay";

import { studentloadjobslist, companyloadjob } from "../../../../actions/jobs";

class ConnectedJobSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameortitle: "",
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: false,
      sort: "posting_date_desc",
      location: "",
      page: 0,
      redirect: "",
    };
  }

  async componentDidMount() {
    await this.props.dispatch(
      studentloadjobslist(1, "", "", "", "posting_date_desc")
    );

    if (this.props.jobslist.jobs !== null) {
      if (this.props.jobslist.jobs.jobsList.docs) {
        if (this.props.jobslist.jobs.jobsList.docs.length === 0) {
        } else {
          await this.props.dispatch(
            companyloadjob(this.props.jobslist.jobs.jobsList.docs[0]._id)
          );
        }
      }
    }

    this.setState({
      page: 1,
    });
  }

  async componentDidUpdate(previousProps, previousState) {
    if (
      previousState.nameortitle !== this.state.nameortitle ||
      previousState.fulltime !== this.state.fulltime ||
      previousState.parttime !== this.state.parttime ||
      previousState.internship !== this.state.internship ||
      previousState.oncampus !== this.state.oncampus ||
      previousState.location !== this.state.location ||
      previousState.sort !== this.state.sort
    ) {
      let filter = "";

      if (this.state.fulltime === true) filter = "Full-Time";
      else if (this.state.parttime === true) filter = "Part-Time";
      else if (this.state.internship === true) filter = "Intern";
      else if (this.state.oncampus === true) filter = "On-Campus";

      await this.props.dispatch(
        studentloadjobslist(
          this.state.page,
          this.state.nameortitle,
          this.state.location,
          filter,
          this.state.sort
        )
      );
      window.scrollTo(0, 0);
      this.setState({
        page: 1,
        redirect: (
          <Redirect
            to={`/student/jobs/search?page=1&companynameoreventtitle=${this.state.nameortitle}&category=${filter}&location=${this.state.location}&sort_direction=${this.state.sort}`}
          />
        ),
      });

      if (this.props.jobslist.jobs !== null) {
        if (this.props.jobslist.jobs.jobsList.docs) {
          if (this.props.jobslist.jobs.jobsList.docs.length === 0) {
          } else {
            this.jobClick(this.props.jobslist.jobs.jobsList.docs[0]._id);
          }
        }
      }
    }
  }

  handleNameOrTitle = (e) => {
    this.setState({
      nameortitle: e.target.value,
    });
  };

  handleLocation = (e) => {
    this.setState({
      location: e.target.value,
    });
  };

  handleSort = (e) => {
    this.setState({
      sort: e.target.value,
    });
  };

  fulltimeClick = () => {
    this.setState({
      fulltime: true,
      parttime: false,
      internship: false,
      oncampus: false,
    });
  };

  parttimeClick = () => {
    this.setState({
      fulltime: false,
      parttime: true,
      internship: false,
      oncampus: false,
    });
  };

  internshipClick = () => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: true,
      oncampus: false,
    });
  };

  oncampusClick = () => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: true,
    });
  };

  jobClick = async (jobid) => {
    await this.props.dispatch(companyloadjob(jobid));
  };

  onClearClick = () => {
    this.setState({
      fulltime: false,
      parttime: false,
      internship: false,
      oncampus: false,
    });
  };

  nextPage = async () => {
    const nextpage = this.state.page + 1;
    await this.props.dispatch(
      studentloadjobslist(nextpage, "", "", "", "posting_date_desc")
    );
    window.scrollTo(0, 0);

    let filter = "";

    if (this.state.fulltime === true) filter = "Full-Time";
    else if (this.state.parttime === true) filter = "Part-Time";
    else if (this.state.internship === true) filter = "Intern";
    else if (this.state.oncampus === true) filter = "On-Campus";

    this.setState({
      page: nextpage,
      redirect: (
        <Redirect
          to={`/student/jobs/search?page=${nextpage}&companynameoreventtitle=${this.state.nameortitle}&category=${filter}&location=${this.state.location}&sort_direction=${this.state.sort}`}
        />
      ),
    });
  };

  prevPage = async () => {
    const prevpage = this.state.page - 1;
    await this.props.dispatch(
      studentloadjobslist(prevpage, "", "", "", "posting_date_desc")
    );
    window.scrollTo(0, 0);

    let filter = "";

    if (this.state.fulltime === true) filter = "Full-Time";
    else if (this.state.parttime === true) filter = "Part-Time";
    else if (this.state.internship === true) filter = "Intern";
    else if (this.state.oncampus === true) filter = "On-Campus";

    this.setState({
      page: prevpage,
      redirect: (
        <Redirect
          to={`/student/jobs/search?page=${prevpage}&companynameoreventtitle=${this.state.nameortitle}&category=${filter}&location=${this.state.location}&sort_direction=${this.state.sort}`}
        />
      ),
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    }

    let clear = "";
    if (
      this.state.fulltime === true ||
      this.state.parttime === true ||
      this.state.internship === true ||
      this.state.oncampus === true
    ) {
      clear = (
        <Button
          variant="link"
          className="categorybuttons"
          onClick={this.onClearClick}
        >
          Clear
        </Button>
      );
    } else clear = "";

    let button1 = "";
    let button2 = "";
    let button3 = "";
    let button4 = "";

    if (this.state.fulltime === true) {
      button1 = (
        <Button className="categorybuttons" onClick={this.fulltimeClick} active>
          Full-Time Job
        </Button>
      );
    } else {
      button1 = (
        <Button className="categorybuttons" onClick={this.fulltimeClick}>
          Full-Time Job
        </Button>
      );
    }

    if (this.state.parttime === true) {
      button2 = (
        <Button className="categorybuttons" onClick={this.parttimeClick} active>
          Part-Time
        </Button>
      );
    } else {
      button2 = (
        <Button className="categorybuttons" onClick={this.parttimeClick}>
          Part-Time
        </Button>
      );
    }

    if (this.state.internship === true) {
      button3 = (
        <Button
          className="categorybuttons"
          onClick={this.internshipClick}
          active
        >
          Internships
        </Button>
      );
    } else {
      button3 = (
        <Button className="categorybuttons" onClick={this.internshipClick}>
          Internships
        </Button>
      );
    }

    if (this.state.oncampus === true) {
      button4 = (
        <Button className="categorybuttons" onClick={this.oncampusClick} active>
          On-Campus
        </Button>
      );
    } else {
      button4 = (
        <Button className="categorybuttons" onClick={this.oncampusClick}>
          On-Campus
        </Button>
      );
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
          message = "Found 0 jobs";
        } else {
          jobsList = this.props.jobslist.jobs.jobsList.docs.map((job) => (
            <JobsListDisplay
              key={job._id}
              jobid={job._id}
              job={job}
              jobClick={this.jobClick}
            />
          ));
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
      <Container>
        {redirectVar}
        {pageRedirect}
        <Card style={{ padding: "15px" }}>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  onChange={this.handleNameOrTitle}
                  type="search"
                  placeholder="Company name or job title"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <MdLocationOn />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  style={{ fontSize: "12px" }}
                  onChange={this.handleLocation}
                  type="search"
                  placeholder="City"
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            {button1}
            {button2}
            {button3}
            {button4}
            {clear}
          </Row>
        </Card>
        <Row>
          <Col sm={4} style={{ paddingRight: "0" }}>
            <Card
              style={{
                marginRight: "0",
                borderBottomRightRadius: "0",
                borderTopRightRadius: "0",
                maxHeight: "900px",
                height: "900px",
                overflowY: "scroll",
              }}
            >
              <Container>
                <Row>
                  <Col md={5}>
                    <p
                      style={{
                        color: "rgba(0,0,0,.56)",
                        fontSize: "13px",
                        lineHeight: "2.5",
                      }}
                    >
                      {`1-${limit} of ${totalJobs} jobs`}
                    </p>
                  </Col>
                  <Col md={7} style={{ paddingLeft: "0" }}>
                    <Form.Group controlId="sort">
                      <Form.Control
                        as="select"
                        onChange={this.handleSort}
                        name="sort"
                        style={{
                          fontSize: "11px",
                          cursor: "pointer",
                          fontWeight: "500",
                          backgroundColor: "rgba(0,0,0,.06)",
                          color: "rgba(0,0,0,.98)",
                          width: "185px",
                        }}
                      >
                        <option value="location_asc">Location - ASC</option>
                        <option value="location_desc">Location - DESC</option>
                        <option value="posting_date_asc">
                          Posting Date - ASC
                        </option>
                        <option value="posting_date_desc" selected>
                          Posting Date - DESC
                        </option>
                        <option value="app_deadline_asc">
                          Application Deadline - ASC
                        </option>
                        <option value="app_deadline_desc">
                          Application Deadline - DESC
                        </option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Container>
              <Nav>{jobsList}</Nav>
              {pagesArrows}
              <p className="errormessage">{message}</p>
            </Card>
          </Col>
          <Col sm={8} style={{ paddingLeft: "0" }}>
            <Card
              style={{
                marginLeft: "0",
                borderBottomLeftRadius: "0",
                borderTopLeftRadius: "0",
                maxHeight: "900px",
                height: "900px",
                overflowY: "scroll",
              }}
            >
              <JobDescriptionDisplay fulltime={this.state.fulltime} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  userprofile: state.userprofile,
  jobslist: state.jobslist,
});
const JobSearch = connect(mapStateToProps)(ConnectedJobSearch);
export default JobSearch;
