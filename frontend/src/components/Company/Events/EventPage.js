import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import EventListContainer from "./EventListContainer/EventListContainer";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import setAuthToken from "../../../utils/setAuthToken";
import { connect } from "react-redux";
import { loadcompanyprofile } from "../../../actions/companyprofile";
import { companyloadeventslist } from "../../../actions/events";

class ConnectedEventPage extends React.Component {
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
    await this.props.dispatch(loadcompanyprofile(id));
    await this.props.dispatch(companyloadeventslist(1, id));

    this.setState({
      page: 1,
    });
  }

  nextPage = async () => {
    let nextpage = this.state.page + 1;
    await this.props.dispatch(
      companyloadeventslist(nextpage, localStorage.getItem("id"))
    );
    window.scrollTo(0, 0);
    this.setState({
      page: nextpage,
      redirect: <Redirect to={`/company/events?page=${nextpage}`} />,
    });
  };

  prevPage = async () => {
    let prevpage = this.state.page - 1;
    await this.props.dispatch(
      companyloadeventslist(prevpage, localStorage.getItem("id"))
    );
    window.scrollTo(0, 0);
    this.setState({
      page: prevpage,
      redirect: <Redirect to={`/company/events?page=${prevpage}`} />,
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

    let eventsList = "";
    let message = "";
    let currPage = "";
    let numOfPages = "";
    let limit = "";
    let totalEvents = "";
    let pageRedirect = null;
    let pagesArrows = "";

    if (this.props.event.event !== null) {
      if (this.props.event.event.eventsList.docs) {
        if (this.props.event.event.eventsList.docs.length === 0) {
          eventsList = "";
          message = "You have 0 events";
        } else {
          eventsList = this.props.event.event.eventsList.docs.map((event) => {
            return (
              <EventListContainer
                key={event._id}
                eventid={event._id}
                event={event}
              />
            );
          });
          currPage = this.props.event.event.eventsList.page;
          numOfPages = this.props.event.event.eventsList.pages;
          limit = this.props.event.event.eventsList.limit;
          totalEvents = this.props.event.event.eventsList.total;
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
                  <div className="pagesinfo">{`${this.state.page} / ${totalEvents}`}</div>
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
                  <div className="pagesinfo">{`${this.state.page} / ${totalEvents}`}</div>
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
                  <div className="pagesinfo">{`${currPage} / ${totalEvents}`}</div>
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
                  <div className="pagesinfo">{`${currPage} / ${totalEvents}`}</div>
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
          to="/company/events/new"
        >
          Create New Event
        </Link>
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
    event: state.event,
  };
};
const EventPage = connect(mapStateToProps)(ConnectedEventPage);
export default EventPage;
