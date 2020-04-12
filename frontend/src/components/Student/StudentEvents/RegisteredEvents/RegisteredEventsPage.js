import React from "react";
import "../../../components.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Redirect } from "react-router";
import Row from "react-bootstrap/Row";
import EventListContainer from "./EventListContainer";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import setAuthToken from "../../../../utils/setAuthToken";
import { connect } from "react-redux";
import { loadstudentprofile } from "../../../../actions/studentprofile";
import { studentloadregisteredeventslist } from "../../../../actions/events";

class ConnectedRegisteredEventsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 0,
      redirect: "",
    };
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const id = localStorage.getItem("id");
    await this.props.dispatch(loadstudentprofile(id));
    await this.props.dispatch(studentloadregisteredeventslist(1, id));

    this.setState({
      page: 1,
    });
  }

  nextPage = async () => {
    let nextpage = this.state.page + 1;
    await this.props.dispatch(
      studentloadregisteredeventslist(nextpage, this.state.name)
    );
    window.scrollTo(0, 0);
    this.setState({
      page: nextpage,
      redirect: <Redirect to={`/student/events/registered?page=${nextpage}`} />,
    });
  };

  prevPage = async () => {
    let prevpage = this.state.page - 1;
    await this.props.dispatch(
      studentloadregisteredeventslist(prevpage, this.state.name)
    );
    window.scrollTo(0, 0);
    this.setState({
      page: prevpage,
      redirect: <Redirect to={`/student/events/registered?page=${prevpage}`} />,
    });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    } else if (localStorage.getItem("type") === "company") {
      redirectVar = <Redirect to={`/company/${localStorage.getItem("id")}`} />;
    }

    let eventsList = "";
    let message = "";
    let currPage = "";
    let numOfPages = "";
    let limit = "";
    let totalEvents = "";
    let pageRedirect = null;
    let pagesArrows = "";

    if (this.props.eventslist.events !== null) {
      if (this.props.eventslist.events.eventsList.docs) {
        if (this.props.eventslist.events.eventsList.docs.length === 0) {
          eventsList = "";
          message = "Found 0 events";
        } else {
          eventsList = this.props.eventslist.events.eventsList.docs.map(
            (event) => {
              return (
                <EventListContainer
                  key={event.eventid._id}
                  eventid={event.eventid._id}
                  event={event}
                />
              );
            }
          );
          currPage = this.props.eventslist.events.eventsList.page;
          numOfPages = this.props.eventslist.events.eventsList.pages;
          limit = this.props.eventslist.events.eventsList.limit;
          totalEvents = this.props.eventslist.events.eventsList.total;
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
        {eventsList}
        {pagesArrows}
        <p className="errormessage">{message}</p>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userprofile: state.userprofile,
    eventslist: state.registeredeventslist,
  };
};
const RegisteredEventsPage = connect(mapStateToProps)(
  ConnectedRegisteredEventsPage
);
export default RegisteredEventsPage;
