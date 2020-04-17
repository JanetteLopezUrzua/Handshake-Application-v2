import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCamera } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { MdEdit } from "react-icons/md";
import { connect } from "react-redux";
import ModalPicture from "./Modal";

import {
  updatephoto,
  deletephoto,
  updatecompanyname,
  deleteerrors,
  loadcompanyprofile,
} from "../../../../actions/companyprofile";

class ConnectedPictureDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      id: "",
      name: "",
      show: false,
      data: "",
      photo: "",
      validimage: "",
      errormessage: "",
      editWasTriggered: false,
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
      console.log(data);
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
        localStorage.getItem("type") === "company"
      ) {
        await this.props.dispatch(
          loadcompanyprofile(localStorage.getItem("id"))
        );
      }

      if (this.props.currentuser.payload) {
      } else {
        this.setState({
          show: false,
        });
      }
    }
  };

  handleClose = () => {
    this.setState({
      show: false,
      errormessage: "",
    });
  };

  handleShow = () =>
    this.setState({
      show: true,
    });

  onDelete = async (e) => {
    e.preventDefault();
    const { id } = this.state;
    await this.props.dispatch(deletephoto(id));

    if (this.props.currentuser.payload) {
    } else {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "company"
      ) {
        await this.props.dispatch(
          loadcompanyprofile(localStorage.getItem("id"))
        );
      }

      this.setState({
        show: false,
      });
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState({ editWasTriggered: true });
  };

  handleSave = async (e) => {
    e.preventDefault();

    const { id } = this.state;
    let name = "";

    if (this.props.currentuser.user !== null) {
      name =
        this.props.currentuser.user.company.name === this.state.name
          ? this.props.currentuser.user.company.name
          : this.state.name;
    }

    await this.props.dispatch(
      updatecompanyname({
        id,
        name,
      })
    );

    if (this.props.currentuser.payload) {
    } else {
      this.setState({ editWasTriggered: false });
    }
  };

  handleCancel = async () => {
    await this.props.dispatch(deleteerrors());
    this.setState({
      editWasTriggered: false,
      name: "",
    });
  };

  nameChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    let name = "";
    let photo = "";
    let has_image = "";

    if (this.props.currentuser.user !== null) {
      if (this.props.currentuser.user.company) {
        name = this.props.currentuser.user.company.name
          ? this.props.currentuser.user.company.name
          : "";
        photo = this.props.currentuser.user.company.photo
          ? this.props.currentuser.user.company.photo
          : "";
      }
    }

    if (photo === "") {
      has_image = false;
    } else {
      has_image = true;
    }

    let nameerrormsg = "";

    if (this.props.currentuser.payload) {
      this.props.currentuser.payload.forEach((err) => {
        if (err.param === "name") nameerrormsg = err.msg;
      });
    }

    let profilePhoto = "";

    if (has_image === false) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "company"
      ) {
        profilePhoto = (
          <Button className="CompanyProfilePicButton" onClick={this.handleShow}>
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
        profilePhoto = (
          <p className="CompanyProfilePicNoImage">{name.charAt(0)}</p>
        );
      }
    } else if (has_image === true) {
      if (
        localStorage.getItem("id") === this.state.id &&
        localStorage.getItem("type") === "company"
      ) {
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
            />
            <Button
              className="CompanyProfilePicButtononImage"
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
        profilePhoto = (
          <>
            <Image
              className="CompanyProfilePicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
            />
          </>
        );
      }
    }
    let button = "";
    if (
      localStorage.getItem("id") === this.state.id &&
      localStorage.getItem("type") === "company"
    ) {
      button = (
        <Col style={{ textAlign: "right" }}>
          <Button className="editbutton" onClick={this.handleClick}>
            <MdEdit style={{ color: "black" }} />
          </Button>
        </Col>
      );
    }

    let display = "";
    display = (
      <Row>
        <Col>
          <Card.Title style={{ textTransform: "capitalize" }}>
            {name}
          </Card.Title>
        </Col>
        {button}
      </Row>
    );

    if (this.state.editWasTriggered) {
      display = (
        <Card>
          <Form.Group controlId="name">
            <Form.Label className="labels">Company Name</Form.Label>
            <Form.Control
              style={{ textTransform: "capitalize" }}
              onChange={this.nameChangeHandler}
              name="name"
              type="text"
            />
            <p
              className="errormessage"
              style={{ fontSize: "16px", fontWeight: "400" }}
            >
              {nameerrormsg}
            </p>
          </Form.Group>
          <Card.Footer>
            <Button className="cancel" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button className="save" onClick={this.handleSave}>
              Save
            </Button>
          </Card.Footer>
        </Card>
      );
    }

    return (
      <Card style={{ padding: "0" }}>
        <ModalPicture
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={has_image}
          onDelete={this.onDelete}
        />
        <Row>
          <Col sm={2}>
            <Card style={{ height: "122px", width: "122px", padding: "0" }}>
              {profilePhoto}
            </Card>
          </Col>
          <Col sm={10}>
            <Card.Body style={{ paddingBottom: "0" }}>
              <NavDropdown.Divider style={{ color: "rgba(0, 0, 0, 0.98)" }} />
              <Card
                style={{
                  border: "none",
                  boxShadow: "none",
                  color: "rgba(0, 0, 0, 0.98)",
                  fontSize: "24px",
                  fontWeight: "500",
                }}
              >
                {display}
              </Card>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  }
}
const mapStateToProps = (state) => ({ currentuser: state.currentuser });
const PictureDetails = connect(mapStateToProps)(ConnectedPictureDetails);
export default PictureDetails;
