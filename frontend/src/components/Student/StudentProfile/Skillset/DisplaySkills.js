import React from "react";
import Button from "react-bootstrap/Button";

class DisplaySkills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      skill: ""
    };
  }

  static getDerivedStateFromProps = props => ({
    id: props.id,
    skill: props.skill
  });

  render() {
    let button = "";
    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "student"
    ) {
      button = (
        <Button
          variant="link"
          onClick={e => {
            this.props.handleDelete(this.state.skill, e);
          }}
          id="skillbutton"
        >
          &#10006;
        </Button>
      );
    } else button = "";

    return (
      <div id="skillbox">
        {this.state.skill}
        {button}
      </div>
    );
  }
}
export default DisplaySkills;
