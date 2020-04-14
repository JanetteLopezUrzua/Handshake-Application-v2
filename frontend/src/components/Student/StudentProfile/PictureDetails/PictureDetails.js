import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import ModalPicture from "./Modal";
import MessageModal from "../Message/MessageModal";

import { connect } from "react-redux";
import {
  updatephoto,
  deletephoto,
  loadstudentprofile,
} from "../../../../actions/studentprofile";
import { sendmessage, deleteerrors } from "../../../../actions/messages";

class ConnectedPictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      show: false,
      data: "",
      validimage: "",
      errormessage: "",
      messageshow: false,
      message: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ id: props.id });

  photoHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getImage(file);
  };

  getImage = (file) => {
    const data = new FormData();

    if (file && file.type.match("image.*")) {
      data.append("file", file);
      data.append("name", "file");
      this.setState({
        data,
        validimage: true,
        errormessage: "",
      });
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image.",
      });
    }
  };

  messageHandler = (e) => {
    this.setState({ message: e.target.value });
  };

  onUpload = async (e) => {
    console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      const { id, data } = this.state;
      await this.props.dispatch(
        updatephoto({
          id,
          data,
        })
      );

      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "student"
      )
        await this.props.dispatch(
          loadstudentprofile(localStorage.getItem("id"))
        );

      if (this.props.currentuser.payload) {
      } else {
        this.setState({
          show: false,
        });
      }
    }
  };

  onSend = async (e) => {
    e.preventDefault();
    let type = "";
    if (localStorage.getItem("type") === "student") {
      type = "students";
    } else if (localStorage.getItem("type") === "company") {
      type = "companies";
    }

    const { id, message } = this.state;
    let fromId = localStorage.getItem("id");

    const date = new Date();
    const day = `${date.getDate()}`.slice(-2);
    const month = `${date.getMonth()}`.slice(-2);
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let day_time = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    // Convert "0" to "12"
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    await this.props.dispatch(
      sendmessage(
        type,
        fromId,
        id,
        message,
        false,
        month,
        day,
        year,
        hours,
        minutes,
        day_time
      )
    );

    if (this.props.message.payload) {
    } else {
      this.setState({
        messageshow: false,
      });
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
      errormessage: "",
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleMessageClose = () => {
    this.setState({
      messageshow: false,
    });
  };

  handleMessageShow = () => {
    this.setState({
      messageshow: true,
    });
  };

  onDelete = async (e) => {
    e.preventDefault();
    const id = this.state.id;
    await this.props.dispatch(deletephoto(id));

    if (this.props.currentuser.payload) {
    } else {
      this.setState({
        show: false,
      });
    }
  };

  onCancel = async (e) => {
    e.preventDefault();
    await this.props.dispatch(deleteerrors());
    this.setState({
      messageshow: false,
    });
  };

  render() {
    let currid = "";
    let fname = "";
    let lname = "";
    let college = "";
    let photo = "";
    let has_image = "";

    if (this.props.currentuser.user !== null) {
      if (this.props.currentuser.user.student) {
        currid = this.props.currentuser.user.student._id
          ? this.props.currentuser.user.student._id
          : "";
        fname = this.props.currentuser.user.student.fname
          ? this.props.currentuser.user.student.fname
          : "";
        lname = this.props.currentuser.user.student.lname
          ? this.props.currentuser.user.student.lname
          : "";
        college =
          this.props.currentuser.user.student.schools.length !== 0
            ? this.props.currentuser.user.student.schools.find((school) => {
                return school.primaryschool === "true";
              })
            : "";
        photo = this.props.currentuser.user.student.photo
          ? this.props.currentuser.user.student.photo
          : "";
      }
    }

    if (college !== "") {
      college = college.name;
    }

    if (photo === "") {
      has_image = false;
    } else {
      has_image = true;
    }

    let studentPhoto = "";

    if (has_image === false) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "student"
      ) {
        studentPhoto = (
          <Button className="ProfilePicButton" onClick={this.handleShow}>
            <Row>
              <FaCamera size={25} style={{ margin: "0 auto" }} />
            </Row>
            <Row>
              <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                Add a Photo
              </h5>
            </Row>
          </Button>
        );
      } else {
        studentPhoto = (
          <div>
            <p className="ProfilePicNoImage">
              {fname.charAt(0)}
              {lname.charAt(0)}
            </p>
          </div>
        );
      }
    } else if (has_image === true) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "student"
      ) {
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
            <Button
              className="ProfilePicButtononImage"
              onClick={this.handleShow}
            >
              <Row>
                <FaCamera size={25} style={{ margin: "0 auto" }} />
              </Row>
              <Row>
                <h5 style={{ margin: "0 auto", fontSize: "13px" }}>
                  Change Photo
                </h5>
              </Row>
            </Button>
          </>
        );
      } else {
        studentPhoto = (
          <>
            <Image
              className="ProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
          </>
        );
      }
    }

    let messagebutton = "";
    if (
      localStorage.getItem("id") === currid &&
      localStorage.getItem("type") === "student"
    ) {
      messagebutton = "";
    } else {
      messagebutton = (
        <Button onClick={this.handleMessageShow} className="messagebutton">
          Message
        </Button>
      );
    }

    return (
      <Card>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={has_image}
          onDelete={this.onDelete}
        />
        <MessageModal
          show={this.state.messageshow}
          close={this.handleMessageClose}
          onSend={this.onSend}
          messageHandler={this.messageHandler}
          onCancel={this.onCancel}
        />
        {studentPhoto}
        <Card.Title
          style={{
            fontSize: "34px",
            fontWeight: "500",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {fname}
          <br />
          {lname}
        </Card.Title>
        <Card.Subtitle
          style={{
            fontSize: "18px",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {college}
        </Card.Subtitle>
        {messagebutton}
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return { currentuser: state.currentuser, message: state.message };
};
const PictureDetails = connect(mapStateToProps)(ConnectedPictureDetails);
export default PictureDetails;
