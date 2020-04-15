import React from "react";
import { connect } from "react-redux";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";

import {
  updatebasicinfo,
  loadstudentprofile,
} from "../../../../actions/studentprofile";

class ConnectedBasicDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      fname: "",
      lname: "",
      dob: "",
      city: "",
      state: "",
      country: "",
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
    let fname = "";
    let lname = "";
    let dob = "";
    let city = "";
    let state = "";
    let country = "";

    const wspatt = new RegExp("^ *$");

    if (this.props.currentuser.user !== null) {
      if (this.props.currentuser.user.student) {
        fname =
          this.props.currentuser.user.student.fname === this.state.fname ||
          wspatt.test(this.state.fname)
            ? this.props.currentuser.user.student.fname
            : this.state.fname;
        lname =
          this.props.currentuser.user.student.lname === this.state.lname ||
          wspatt.test(this.state.lname)
            ? this.props.currentuser.user.student.lname
            : this.state.lname;
        dob =
          this.props.currentuser.user.student.dob === this.state.dob
            ? this.props.currentuser.user.student.dob
            : this.state.dob;
        city =
          this.props.currentuser.user.student.city === this.state.city
            ? this.props.currentuser.user.student.city
            : this.state.city;
        state =
          this.props.currentuser.user.student.state === this.state.state
            ? this.props.currentuser.user.student.state
            : this.state.state;
        country =
          this.props.currentuser.user.student.country === this.state.country
            ? this.props.currentuser.user.student.country
            : this.state.country;
      }
    }

    await this.props.dispatch(
      updatebasicinfo({
        id,
        fname,
        lname,
        dob,
        city,
        state,
        country,
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
    this.setState({ editWasTriggered: false });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = <DisplayInfo clicked={this.handleClick} id={this.state.id} />;

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
