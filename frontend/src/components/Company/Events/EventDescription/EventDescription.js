import React from "react";
import { connect } from "react-redux";
import EventDisplayDescription from "./EventDisplayDescription";
import EventEditDescription from "./EventEditDescription";

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

    const eventid = this.state.event_id;
    let description = "";

    if (this.props.event.event !== null) {
      description = this.state.description !== ""
        ? this.state.description
        : this.props.event.event.event.description;
    }

    await this.props.dispatch(updateeventdescription(eventid, description));

    if (this.props.event.payload) {
    } else {
      this.setState({ editWasTriggered: false, description: "" });
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
const mapStateToProps = (state) => ({ event: state.event });
const EventDescription = connect(mapStateToProps)(ConnectedEventDescription);
export default EventDescription;
