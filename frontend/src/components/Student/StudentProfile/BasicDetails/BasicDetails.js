import React from "react";
import axios from "axios";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";

import { connect } from "react-redux";
import { updatebasicinfo } from "../../../../actions/studentprofile";

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
    let fname = "";
    let lname = "";
    let dob = "";
    let city = "";
    let state = "";
    let country = "";

    const wspatt = new RegExp("^ *$");

    if (this.props.userprofile.user !== null) {
      fname =
        this.props.userprofile.user.student.fname === this.state.fname ||
        wspatt.test(this.state.fname)
          ? this.props.userprofile.user.student.fname
          : this.state.fname;
      lname =
        this.props.userprofile.user.student.lname === this.state.lname ||
        wspatt.test(this.state.lname)
          ? this.props.userprofile.user.student.lname
          : this.state.lname;
      dob =
        this.props.userprofile.user.student.dob === this.state.dob
          ? this.props.userprofile.user.student.dob
          : this.state.dob;
      city =
        this.props.userprofile.user.student.city === this.state.city
          ? this.props.userprofile.user.student.city
          : this.state.city;
      state =
        this.props.userprofile.user.student.state === this.state.state
          ? this.props.userprofile.user.student.state
          : this.state.state;
      country =
        this.props.userprofile.user.student.country === this.state.country
          ? this.props.userprofile.user.student.country
          : this.state.country;
    }

    await this.props.dispatch(
      updatebasicinfo({
        id,
        fname,
        lname,
        dob,
        city,
        state,
        country
      })
    );

    if (this.props.userprofile.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = () => {
    this.setState({ editWasTriggered: false });
  };

  render() {
    console.log("AAAAAAAAAAAAAAAAAAAAAAA", this.props.userprofile);
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
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const BasicDetails = connect(mapStateToProps)(ConnectedBasicDetails);
export default BasicDetails;
