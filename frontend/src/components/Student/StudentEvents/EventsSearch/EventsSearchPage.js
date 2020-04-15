import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import { Redirect } from "react-router";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { connect } from "react-redux";
import EventListContainer from "./EventListContainer";

import setAuthToken from "../../../../utils/setAuthToken";
import { loadstudentprofile } from "../../../../actions/studentprofile";
import { studentloadeventslist } from "../../../../actions/events";

class ConnectedEventSearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
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
    await this.props.dispatch(studentloadeventslist(1, ""));

    this.setState({
      page: 1,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.name !== this.state.name) {
      await this.props.dispatch(
        studentloadeventslist(this.state.page, this.state.name)
      );
      window.scrollTo(0, 0);
      this.setState({
        page: 1,
        redirect: (
          <Redirect
            to={`/student/events/search?page=1&name=${this.state.name}`}
          />
        ),
      });
    }
  }

  async componentWillUnmount() {
    await this.props.dispatch(studentloadeventslist(1, ""));
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  nextPage = async () => {
    const nextpage = this.state.page + 1;
    await this.props.dispatch(studentloadeventslist(nextpage, this.state.name));
    window.scrollTo(0, 0);
    this.setState({
      page: nextpage,
      redirect: (
        <Redirect
          to={`/student/events/search?page=${nextpage}&name=${this.state.name}`}
        />
      ),
    });
  };

  prevPage = async () => {
    const prevpage = this.state.page - 1;
    await this.props.dispatch(studentloadeventslist(prevpage, this.state.name));
    window.scrollTo(0, 0);
    this.setState({
      page: prevpage,
      redirect: (
        <Redirect
          to={`/student/events/search?page=${prevpage}&name=${this.state.name}}`}
        />
      ),
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
            (event) => (
              <EventListContainer
                key={event._id}
                eventid={event._id}
                event={event}
              />
            )
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
                      <Col>Search</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">
                      Event Name
                    </Card.Text>
                    <Form.Group controlId="name">
                      <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        type="search"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {eventsList}
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
  eventslist: state.eventslist,
});
const EventSearchPage = connect(mapStateToProps)(ConnectedEventSearchPage);
export default EventSearchPage;
