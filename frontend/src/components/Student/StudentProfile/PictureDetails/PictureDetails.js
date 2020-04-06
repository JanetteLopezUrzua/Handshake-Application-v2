import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import ModalPicture from "./Modal";

import { connect } from "react-redux";
import { updatephoto, deletephoto } from "../../../../actions/studentprofile";

class ConnectedPictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      show: false,
      data: "",
      validimage: "",
      errormessage: ""
    };
  }

  static getDerivedStateFromProps = props => ({ id: props.id });

  photoHandler = e => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getImage(file);
  };

  getImage = file => {
    const data = new FormData();

    if (file && file.type.match("image.*")) {
      data.append("file", file);
      data.append("name", "file");
      this.setState({
        data,
        validimage: true,
        errormessage: ""
      });
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image."
      });
    }
  };

  onUpload = async e => {
    console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      const { id, data } = this.state;
      await this.props.dispatch(
        updatephoto({
          id,
          data
        })
      );

      if (this.props.userprofile.payload) {
      } else {
        this.setState({
          show: false
        });
      }
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
      errormessage: ""
    });
  };

  handleShow = () => {
    this.setState({
      show: true
    });
  };

  onDelete = async e => {
    e.preventDefault();
    const id = this.state.id;
    await this.props.dispatch(deletephoto(id));

    if (this.props.userprofile.payload) {
    } else {
      this.setState({
        show: false
      });
    }
  };

  render() {
    let fname = "";
    let lname = "";
    let college = "";
    let photo = "";
    let has_image = "";

    if (this.props.userprofile.user !== null) {
      fname = this.props.userprofile.user.student.fname
        ? this.props.userprofile.user.student.fname
        : "";
      lname = this.props.userprofile.user.student.lname
        ? this.props.userprofile.user.student.lname
        : "";
      college =
        this.props.userprofile.user.student.schools.length !== 0
          ? this.props.userprofile.user.student.schools.find(school => {
              return school.primaryschool === "true";
            })
          : "";
      photo = this.props.userprofile.user.student.photo
        ? this.props.userprofile.user.student.photo
        : "";
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
        {studentPhoto}
        <Card.Title
          style={{
            fontSize: "34px",
            fontWeight: "500",
            textAlign: "center",
            textTransform: "capitalize"
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
            textTransform: "capitalize"
          }}
        >
          {college}
        </Card.Subtitle>
      </Card>
    );
  }
}
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const PictureDetails = connect(mapStateToProps)(ConnectedPictureDetails);
export default PictureDetails;
