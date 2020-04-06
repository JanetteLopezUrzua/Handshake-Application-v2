import React from "react";
import DisplayObjective from "./DisplayObjective";
import EditObjective from "./EditObjective";

import { connect } from "react-redux";
import { updatecareerobjective } from "../../../../actions/studentprofile";

class ConnectedCareerObjective extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      objective: "",
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
    let objective = "";
    if (this.props.userprofile.user !== null) {
      objective =
        this.props.userprofile.user.student.objective === this.state.objective
          ? this.props.userprofile.user.student.objective
          : this.state.objective;
    }

    await this.props.dispatch(
      updatecareerobjective({
        id,
        objective
      })
    );

    this.setState({ editWasTriggered: false });
  };

  handleCancel = () => {
    this.setState({ editWasTriggered: false });
  };

  render() {
    const { editWasTriggered } = this.state;

    let display = "";
    display = (
      <DisplayObjective id={this.state.id} clicked={this.handleClick} />
    );

    if (editWasTriggered) {
      display = (
        <EditObjective
          objectivechange={this.handleChange}
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
const CareerObjective = connect(mapStateToProps)(ConnectedCareerObjective);
export default CareerObjective;
