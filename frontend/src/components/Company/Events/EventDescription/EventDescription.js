import React from "react";
import EventDisplayDescription from "./EventDisplayDescription";
import EventEditDescription from "./EventEditDescription";

import { connect } from "react-redux";
import {
  updateeventdescription,
  deleteerrors,
} from "../../../../actions/events";

class ConnectedEventDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event_id: "",
      description: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  descriptionChangeHandler = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  handleSave = async (e) => {
    e.preventDefault();

    let eventid = this.state.event_id;
    let description = this.state.description;

    await this.props.dispatch(updateeventdescription(eventid, description));

    if (this.props.event.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = async (e) => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      description: "",
      editWasTriggered: false,
    });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = <EventDisplayDescription clicked={this.handleClick} />;

    if (editWasTriggered) {
      display = (
        <EventEditDescription
          descriptionchange={this.descriptionChangeHandler}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = (state) => {
  return { event: state.event };
};
const EventDescription = connect(mapStateToProps)(ConnectedEventDescription);
export default EventDescription;
