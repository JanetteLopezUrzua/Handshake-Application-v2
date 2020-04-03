import React from "react";
import DisplayInfo from "./DisplayInfo";
import EditInfo from "./EditInfo";

import { connect } from "react-redux";
import { updatebasicinfo } from "../../../../actions/companyprofile";

class ConnectedBasicDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      location: "",
      description: "",
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
    let location = "";
    let description = "";

    const wspatt = new RegExp("^ *$");

    if (this.props.userprofile.user !== null) {
      location =
        this.props.userprofile.user.company.location === this.state.location ||
        wspatt.test(this.state.location)
          ? this.props.userprofile.user.company.location
          : this.state.location;
      description =
        this.props.userprofile.user.company.description ===
        this.state.description
          ? this.props.userprofile.user.company.description
          : this.state.description;
    }

    await this.props.dispatch(
      updatebasicinfo({
        id,
        location,
        description
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
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const BasicDetails = connect(mapStateToProps)(ConnectedBasicDetails);
export default BasicDetails;