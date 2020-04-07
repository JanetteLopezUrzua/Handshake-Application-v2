import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import axios from "axios";
import Banner from "../Banner/DisplayBanner";
import EventInfo from "../EventInfo/EventInfo";
import EventDescription from "../EventDescription/EventDescription";
import EventRSVP from "../EventRSVP/EventRSVP";

import setAuthToken from "../../../../utils/setAuthToken";
import { connect } from "react-redux";
import { companyloadevent } from "../../../../actions/events";

class ConnectedEventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      const event_id = this.props.match.params.event_id;

      await this.props.dispatch(companyloadevent(event_id));
    }
  }

  handleDelete = () => {
    axios
      .delete("http://localhost:3001/company/event/delete", {
        data: { event_id: this.props.match.params.event_id },
      })
      .then((response) => {
        console.log(response);
        this.setState({
          redirect: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    // if (!cookie.load('id')) {
    //   redirectVar = <Redirect to="/" />;
    // }

    if (this.state.redirect === true) {
      redirectVar = <Redirect to="/company/events" />;
    }

    let del = "";
    // if (cookie.load('id') === this.state.company_id && cookie.load('user') === "company") {
    if (true) {
      del = (
        <Button
          className="delete"
          style={{ margin: "15px" }}
          onClick={this.handleDelete}
        >
          Delete Event
        </Button>
      );
    }

    return (
      <Container>
        {redirectVar}
        <Banner event_id={this.props.match.params.event_id} />
        <EventInfo event_id={this.props.match.params.event_id} />
        <Row>
          <Col sm={8}>
            <EventDescription event_id={this.props.match.params.event_id} />
          </Col>
          <Col sm={4} style={{ textAlign: "center" }}>
            <EventRSVP event_id={this.props.match.params.event_id} />
          </Col>
        </Row>
        {del}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { event: state.event };
};
const EventContainer = connect(mapStateToProps)(ConnectedEventContainer);
export default EventContainer;
