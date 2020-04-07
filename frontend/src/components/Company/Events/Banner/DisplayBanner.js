import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import BannerModal from "./EditBannerModal";

import { connect } from "react-redux";
import {
  updatebannerphoto,
  deletebannerphoto,
} from "../../../../actions/events";

class ConnectedDisplayBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      event_id: "",
      show: false,
      data: "",
      validimage: "",
      errormessage: "",
    };
  }

  static getDerivedStateFromProps = (props) => ({ event_id: props.event_id });

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

  onUpload = async (e) => {
    console.log(this.state.validimage);
    e.preventDefault();

    if (this.state.validimage === true) {
      const { event_id, data } = this.state;

      await this.props.dispatch(updatebannerphoto(event_id, data));

      if (this.props.event.payload) {
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
    const event_id = this.state.event_id;
    await this.props.dispatch(deletebannerphoto(event_id));

    if (this.props.event.payload) {
    } else {
      this.setState({
        show: false,
      });
    }
  };

  render() {
    let photo = "";
    let has_image = "";
    let company_id = "";

    if (this.props.event.event !== null) {
      photo = this.props.event.event.event.bannerphoto
        ? this.props.event.event.event.bannerphoto
        : "";
      company_id = this.props.event.event.event.companyid._id
        ? this.props.event.event.event.companyid._id
        : "";
    }

    if (photo === "") {
      has_image = false;
    } else {
      has_image = true;
    }

    let banner = "";

    if (has_image === false) {
      if (
        localStorage.getItem("id") === company_id &&
        localStorage.getItem("type") === "company"
      ) {
        banner = (
          <Button className="BannerPicButton" onClick={this.handleShow}>
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
      }
    } else if (has_image === true) {
      if (
        localStorage.getItem("id") === company_id &&
        localStorage.getItem("type") === "company"
      ) {
        banner = (
          <>
            <Image
              className="BannerPicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
            <Button
              className="BannerPicButtononImage"
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
        banner = (
          <>
            <Image
              className="BannerPicImage"
              src={`http://localhost:3001/resumesandimages/${photo}`}
              roundedcircle="true"
            />
          </>
        );
      }
    }

    return (
      <Card style={{ height: "200px", padding: "0" }}>
        <BannerModal
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={has_image}
          onDelete={this.onDelete}
        />
        {banner}
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return { event: state.event };
};
const DisplayBanner = connect(mapStateToProps)(ConnectedDisplayBanner);
export default DisplayBanner;
