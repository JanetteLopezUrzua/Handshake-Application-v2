import React from "react";
import "../../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import Banner from "../Banner/DisplayBanner";
import EventInfo from "../EventInfo/EventInfo";
import EventDescription from "../EventDescription/EventDescription";
import EventRSVP from "../EventRSVP/EventRSVP";

import setAuthToken from "../../../../utils/setAuthToken";
import { connect } from "react-redux";
import {
  companyloadevent,
  companydeleteevent,
  companyloadrsvplist,
} from "../../../../actions/events";

class ConnectedEventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event_id: this.props.match.params.event_id,
      redirect: false,
    };
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);

      await this.props.dispatch(companyloadevent(this.state.event_id));
      await this.props.dispatch(companyloadrsvplist(this.state.event_id));
    }
  }

  handleDelete = async () => {
    await this.props.dispatch(companydeleteevent(this.state.event_id));
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
      redirectVar = <Redirect to="/company/events" />;
    }

    let company_id = "";
    let eligibility = "";
    let major = "";

    if (this.props.userprofile.user !== null) {
      if (this.props.userprofile.user.student.schools) {
        if (this.props.userprofile.user.student.schools.length === 0) {
          major = "";
        } else major = this.props.userprofile.user.student.schools[0].major;
      }
    }

    if (this.props.event.event !== null) {
      company_id = this.props.event.event.event.companyid._id
        ? this.props.event.event.event.companyid._id
        : "";
      eligibility = this.props.event.event.event.eligibility
        ? this.props.event.event.event.eligibility
        : "all";
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
            <EventRSVP
              event_id={this.props.match.params.event_id}
              eligibility={eligibility}
              major={major}
            />
          </Col>
        </Row>
        {del}
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { userprofile: state.userprofile, event: state.event };
};
const EventContainer = connect(mapStateToProps)(ConnectedEventContainer);
export default EventContainer;
