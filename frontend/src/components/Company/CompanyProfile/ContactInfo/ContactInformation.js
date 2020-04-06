import React from "react";
import DisplayContactInfo from "./DisplayContactInfo";
import EditContactInfo from "./EditContactInfo";

import { connect } from "react-redux";
import {
  updatecontactinfo,
  deleteerrors
} from "../../../../actions/companyprofile";

class ConnectedContactInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      email: "",
      phonenumber: "",
      editWasTriggered: false
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  handleClick = e => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSave = async e => {
    e.preventDefault();

    const { id } = this.state;
    let email = "";
    let phonenumber = "";

    if (this.props.userprofile.user !== null) {
      email =
        this.props.userprofile.user.company.email === this.state.email
          ? this.props.userprofile.user.company.email
          : this.state.email;
      phonenumber =
        this.props.userprofile.user.company.phonenumber ===
        this.state.phonenumber
          ? this.props.userprofile.user.company.phonenumber
          : this.state.phonenumber;
    }

    await this.props.dispatch(
      updatecontactinfo({
        id,
        email,
        phonenumber
      })
    );

    if (this.props.userprofile.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      editWasTriggered: false,
      email: "",
      phonenumber: ""
    });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = (
      <DisplayContactInfo id={this.state.id} clicked={this.handleClick} />
    );

    if (editWasTriggered) {
      display = (
        <EditContactInfo
          handleChange={this.handleChange}
          save={this.handleSave}
          cancel={this.handleCancel}
        />
      );
    }

    return <>{display}</>;
  }
}
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const ContactInformation = connect(mapStateToProps)(
  ConnectedContactInformation
);
export default ContactInformation;
