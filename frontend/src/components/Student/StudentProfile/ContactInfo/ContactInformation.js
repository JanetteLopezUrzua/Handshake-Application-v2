import React from "react";
import DisplayContactInfo from "./DisplayContactInfo";
import EditContactInfo from "./EditContactInfo";

import { connect } from "react-redux";
import {
  updatecontactinfo,
  loadstudentprofile,
} from "../../../../actions/studentprofile";

class ConnectedContactInformation extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      email: "",
      phonenumber: "",
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
    let email = "";
    let phonenumber = "";

    const wspatt = new RegExp("^ *$");

    if (this.props.currentuser.user !== null) {
      if (this.props.currentuser.user.student) {
        email =
          this.props.currentuser.user.student.email === this.state.email ||
          wspatt.test(this.state.email)
            ? this.props.currentuser.user.student.email
            : this.state.email;
        phonenumber =
          this.props.currentuser.user.student.phonenumber ===
            this.state.phonenumber || wspatt.test(this.state.phonenumber)
            ? this.props.currentuser.user.student.phonenumber
            : this.state.phonenumber;
      }
    }

    await this.props.dispatch(
      updatecontactinfo({
        id,
        email,
        phonenumber,
      })
    );

    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    )
      await this.props.dispatch(loadstudentprofile(localStorage.getItem("id")));

    if (this.props.currentuser.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = () => {
    this.setState({
      editWasTriggered: false,
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
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser };
};
const ContactInformation = connect(mapStateToProps)(
  ConnectedContactInformation
);
export default ContactInformation;
