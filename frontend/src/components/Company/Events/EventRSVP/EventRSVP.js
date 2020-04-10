import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import RSVPModal from "./RSVPModal";

import { connect } from "react-redux";
import {
  company_event_unregister,
  company_event_rsvp,
  companyloadrsvplist,
} from "../../../../actions/events";

class ConnectedEventRSVP extends React.Component {
  constructor() {
    super();

    this.state = {
      event_id: "",
      show: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id });

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleRSVP = async () => {
    let eventid = this.state.event_id;
    let studentid = localStorage.getItem("id");
    await this.props.dispatch(company_event_rsvp(eventid, studentid));
    await this.props.dispatch(companyloadrsvplist(this.state.event_id));
  };

  handleUnregister = async () => {
    let eventid = this.state.event_id;
    let studentid = localStorage.getItem("id");
    await this.props.dispatch(company_event_unregister(eventid, studentid));
    await this.props.dispatch(companyloadrsvplist(this.state.event_id));
  };

  render() {
    let button = "";
    let message = "";
    let studentsList = "";
    let alreadyrsvp = "";

    if (this.props.rsvplist.students !== null) {
      if (this.props.rsvplist.students.students) {
        if (this.props.rsvplist.students.students.length === 0) {
          studentsList = "";
          message = "No one has registered for this event";
          button = (
            <Button style={{ cursor: "not-allowed" }} disabled>
              View RSVP List
            </Button>
          );
          alreadyrsvp = false;
        } else {
          message = "";
          button = <Button onClick={this.handleShow}>View RSVP List</Button>;
          studentsList = this.props.rsvplist.students.students.map(
            (student) => {
              if (
                student.studentid._id === localStorage.getItem("id") &&
                localStorage.getItem("type") === "student"
              ) {
                alreadyrsvp = true;
              } else {
                alreadyrsvp = false;
              }
            }
          );
        }
      }
    }

    let rsvpbutton = "";

    if (localStorage.getItem("type") === "student") {
      if (alreadyrsvp === false) {
        if (
          this.props.eligibility === "all" ||
          this.props.eligibility.toLowerCase() ===
            this.props.major.toLowerCase()
        ) {
          rsvpbutton = (
            <div>
              <Button className="save" onClick={this.handleRSVP}>
                <FaPlus /> RSVP for Event
              </Button>
              <br />
            </div>
          );
        } else {
          rsvpbutton = (
            <div>
              <Button
                className="save"
                onClick={this.handleRSVP}
                style={{ cursor: "not-allowed" }}
                disabled
              >
                <FaPlus /> Not Eligible for this Event
              </Button>
              <br />
            </div>
          );
        }
      } else {
        rsvpbutton = (
          <div>
            <Button className="delete" onClick={this.handleUnregister}>
              <FaMinus /> Unregister from Event
            </Button>
            <br />
          </div>
        );
      }
    }

    return (
      <div>
        {rsvpbutton}
        <Card>
          <RSVPModal show={this.state.show} close={this.handleClose} />
          <p className="errormessage">{message}</p>
          <br />
          {button}
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { rsvplist: state.rsvplist };
};
const EventRSVP = connect(mapStateToProps)(ConnectedEventRSVP);
export default EventRSVP;
