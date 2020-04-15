import React from "react";
import { connect } from "react-redux";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";

import {
  updatebasicinfo,
  deleteerrors,
} from "../../../../actions/companyprofile";

class ConnectedBasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      location: "",
      description: "",
      editWasTriggered: false,
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const { id } = this.state;
    let location = "";
    let description = "";

    if (this.props.currentuser.user !== null) {
      if (this.currentuser.user.company) {
        location = this.props.currentuser.user.company.location === this.state.location
          ? this.props.currentuser.user.company.location
          : this.state.location;
        description = this.props.currentuser.user.company.description
          === this.state.description
          ? this.props.currentuser.user.company.description
          : this.state.description;
      }
    }

    await this.props.dispatch(
      updatebasicinfo({
        id,
        location,
        description,
      })
    );

    if (this.props.currentuser.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({ editWasTriggered: false, location: "", description: "" });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = <DisplayInfo id={this.state.id} clicked={this.handleClick} />;

    if (editWasTriggered) {
      display = (
        <EditInfo
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const BasicDetails = connect(mapStateToProps)(ConnectedBasicDetails);
export default BasicDetails;
