import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import { connect } from "react-redux";
import ApplicationsListContainer from "./ApplicationsListContainer";
import { studentloadapplications } from "../../../../actions/jobs";

class ConnectedApplicationsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      pending: false,
      reviewed: false,
      declined: false,
      page: 0,
      redirect: "",
    };
  }

  async componentDidMount() {
    const id = localStorage.getItem("id");

    await this.props.dispatch(studentloadapplications(1, "", id));

    this.setState({
      page: 1,
    });
  }

  async componentDidUpdate(previousProps, previousState) {
    if (
      previousState.pending !== this.state.pending
      || previousState.reviewed !== this.state.reviewed
      || previousState.declined !== this.state.declined
    ) {
      let filter = "";

      if (this.state.pending === true) filter = "Pending";
      else if (this.state.reviewed === true) filter = "Reviewed";
      else if (this.state.declined === true) filter = "Declined";

      const id = localStorage.getItem("id");

      await this.props.dispatch(
        studentloadapplications(this.state.page, filter, id)
      );
      window.scrollTo(0, 0);
      this.setState({
        page: 1,
        redirect: (
          <Redirect to={`/student/jobs/applications?page=1&status=${filter}`} />
        ),
      });
    }
  }

  handlePendingClick = () => {
    this.setState({
      pending: true,
      reviewed: false,
      declined: false,
    });
  };

  handleReviewedClick = () => {
    this.setState({
      pending: false,
      reviewed: true,
      declined: false,
    });
  };

  handleDeclinedClick = () => {
    this.setState({
      pending: false,
      reviewed: false,
      declined: true,
    });
  };

  handleClearClick = () => {
    this.setState({
      pending: false,
      reviewed: false,
      declined: false,
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
      this.state.pending === true
      || this.state.reviewed === true
      || this.state.declined === true
    ) {
      clear = (
        <Button
          variant="link"
          className="categorybuttons"
          onClick={this.handleClearClick}
        >
          Clear
        </Button>
      );
    } else clear = "";

    let button1 = "";
    let button2 = "";
    let button3 = "";

    if (this.state.pending === true) {
      button1 = (
        <Button
          className="categorybuttons"
          onClick={this.handlePendingClick}
          active
        >
          Pending
        </Button>
      );
    } else {
      button1 = (
        <Button className="categorybuttons" onClick={this.handlePendingClick}>
          Pending
        </Button>
      );
    }

    if (this.state.reviewed === true) {
      button2 = (
        <Button
          className="categorybuttons"
          onClick={this.handleReviewedClick}
          active
        >
          Reviewed
        </Button>
      );
    } else {
      button2 = (
        <Button className="categorybuttons" onClick={this.handleReviewedClick}>
          Reviewed
        </Button>
      );
    }

    if (this.state.declined === true) {
      button3 = (
        <Button
          className="categorybuttons"
          onClick={this.handleDeclinedClick}
          active
        >
          Declined
        </Button>
      );
    } else {
      button3 = (
        <Button className="categorybuttons" onClick={this.handleDeclinedClick}>
          Declined
        </Button>
      );
    }

    let applicationsList = "";
    let message = "";
    let currPage = "";
    let numOfPages = "";
    let limit = "";
    let totalApplications = "";
    let pageRedirect = null;
    let pagesArrows = "";

    if (this.props.applicationslist.applications !== null) {
      if (this.props.applicationslist.applications.applicationsList) {
        if (this.props.applicationslist.applications.applicationsList.docs) {
          if (
            this.props.applicationslist.applications.applicationsList.docs
              .length === 0
          ) {
            applicationsList = "";
            message = "Found 0 applications";
          } else {
            applicationsList = this.props.applicationslist.applications.applicationsList.docs.map(
              (application) => (
                <ApplicationsListContainer
                  key={application._id}
                  appid={application._id}
                  application={application}
                />
              )
            );
            currPage = this.props.applicationslist.applications.applicationsList
              .page;
            numOfPages = this.props.applicationslist.applications
              .applicationsList.pages;
            limit = this.props.applicationslist.applications.applicationsList
              .limit;
            totalApplications = this.props.applicationslist.applications
              .applicationsList.total;
            pageRedirect = this.state.redirect;

            if (this.state.page === 1 && currPage !== numOfPages) {
              pagesArrows = (
                <Container
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                <Container
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                <Container
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
                <Container
                  style={{ display: "flex", justifyContent: "center" }}
                >
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
    }

    return (
      <div>
        {redirectVar}
        {pageRedirect}
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>Filters</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      {button1}
                      {button2}
                      {button3}
                    </Row>
                    <Row>{clear}</Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {applicationsList}
                {pagesArrows}
                <p className="errormessage">{message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  userprofile: state.userprofile,
  applicationslist: state.applicationslist,
});
const ApplicationsPage = connect(mapStateToProps)(ConnectedApplicationsPage);
export default ApplicationsPage;
