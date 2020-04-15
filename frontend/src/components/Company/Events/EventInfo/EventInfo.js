import React from "react";
import { connect } from "react-redux";
import DisplayEventInfo from "./DisplayEventInfo";
import EditEventInfo from "./EditEventInfo";

import { updateeventinfo, deleteerrors } from "../../../../actions/events";

class ConnectedEventInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      event_id: "",
      title: "",
      dayofweek: "",
      month: "",
      day: "",
      year: "",
      starttime: "",
      startdaytime: "",
      endtime: "",
      enddaytime: "",
      timezone: "",
      location: "",
      eligibilityoption: "",
      eligibility: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  eligibilityOptionChangeHandler = (e) => {
    this.setState({
      eligibilityoption: e.target.value,
      eligibility: e.target.value,
    });

    console.log(this.state.eligibility);
    console.log(this.state.eligibilityoption);
  };

  handleSave = async (e) => {
    e.preventDefault();

    let title = "";
    let dayofweek = "";
    let month = "";
    let day = "";
    let year = "";
    let starttime = "";
    let startdaytime = "";
    let endtime = "";
    let enddaytime = "";
    let timezone = "";
    let location = "";
    let eligibility = "";

    if (this.props.event.event !== null) {
      title = this.state.title !== ""
        ? this.state.title
        : this.props.event.event.event.title;
      dayofweek = this.state.dayofweek !== ""
        ? this.state.dayofweek
        : this.props.event.event.event.dayofweek;
      month = this.state.month !== ""
        ? this.state.month
        : this.props.event.event.event.month;
      day = this.state.day !== ""
        ? this.state.day
        : this.props.event.event.event.day;
      year = this.state.year !== ""
        ? this.state.year
        : this.props.event.event.event.year;
      starttime = this.state.starttime !== ""
        ? this.state.starttime
        : this.props.event.event.event.starttime;
      startdaytime = this.state.startdaytime !== ""
        ? this.state.startdaytime
        : this.props.event.event.event.startdaytime;
      endtime = this.state.endtime !== ""
        ? this.state.endtime
        : this.props.event.event.event.endtime;
      enddaytime = this.state.enddaytime !== ""
        ? this.state.enddaytime
        : this.props.event.event.event.enddaytime;
      timezone = this.state.timezone !== ""
        ? this.state.timezone
        : this.props.event.event.event.timezone;
      location = this.state.location !== ""
        ? this.state.location
        : this.props.event.event.event.location;
      eligibility = this.state.eligibility !== ""
        ? this.state.eligibility
        : this.props.event.event.event.eligibility;
    }

    const eventid = this.state.event_id;
    const event = {
      title,
      dayofweek,
      month,
      day,
      year,
      starttime,
      startdaytime,
      endtime,
      enddaytime,
      timezone,
      location,
      eligibility,
    };

    await this.props.dispatch(updateeventinfo(eventid, event));

    if (this.props.event.payload) {
    } else {
      this.setState({
        editWasTriggered: false,
        title: "",
        dayofweek: "",
        month: "",
        day: "",
        year: "",
        starttime: "",
        startdaytime: "",
        endtime: "",
        enddaytime: "",
        timezone: "",
        location: "",
        eligibility: "",
        eligibilityoption: "",
      });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      title: "",
      dayofweek: "",
      month: "",
      day: "",
      year: "",
      starttime: "",
      startdaytime: "",
      endtime: "",
      enddaytime: "",
      timezone: "",
      location: "",
      eligibility: "",
      eligibilityoption: "",
      editWasTriggered: false,
    });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = <DisplayEventInfo clicked={this.handleClick} />;

    if (editWasTriggered) {
      display = (
        <EditEventInfo
          handleChange={this.handleChange}
          eligibilityoptionchange={this.eligibilityOptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
          eligibilityoption={this.state.eligibilityoption}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = (state) => ({ event: state.event });
const EventInfo = connect(mapStateToProps)(ConnectedEventInfo);
export default EventInfo;
