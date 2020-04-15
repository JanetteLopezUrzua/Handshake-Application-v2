import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { FaCamera } from "react-icons/fa";
import NewBannerModal from "./NewBannerModal";

class NewBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      tempimage: "",
      show: false,
      data: "",
      validimage: "",
      errormessage: "",
      photo: "",
      has_image: false,
    };
  }

  photoHandler = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    console.log(file);
    this.getImage(file);
  };

  getImage = (file) => {
    const data = new FormData();
    const reader = new FileReader();

    if (file && file.type.match("image.*")) {
      data.append("file", file);
      data.append("name", "file");

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.setState({
          data,
          tempimage: reader.result,
          validimage: true,
          errormessage: "",
        });
      };
    } else {
      this.setState({
        validimage: false,
        errormessage: "File not accepted. Choose an Image.",
      });
    }
  };

  onUpload = (e) => {
    console.log(this.state.validimage);
    e.preventDefault();
    if (this.state.validimage === true) {
      const { tempimage } = this.state;

      this.setState({
        photo: tempimage,
        has_image: true,
        show: false,
      });

      this.props.handlephotochange(this.state.data);
    }
  };

  onDelete = (e) => {
    e.preventDefault();

    this.setState({
      show: false,
      has_image: false,
      photo: "",
    });

    this.props.handlephotochange("");
  };

  handleClose = () => {
    this.setState({
      show: false,
      errormessage: "",
    });
  };

  handleShow = () => this.setState({
    show: true,
  });

  render() {
    let banner = "";

    if (this.state.has_image === false) {
      banner = (
        <Button className="BannerPicButton" onClick={this.handleShow}>
          <Row>
            <FaCamera size={25} style={{ margin: "0 auto" }} />
          </Row>
          <Row>
            <h5 style={{ margin: "0 auto", fontSize: "13px" }}>Add a Photo</h5>
          </Row>
        </Button>
      );
    } else if (this.state.has_image === true) {
      banner = (
        <>
          <Image
            className="BannerPicImage"
            src={this.state.photo}
            roundedcircle="true"
          />
          <Button className="BannerPicButtononImage" onClick={this.handleShow}>
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
    }

    return (
      <Card style={{ height: "200px", padding: "0" }}>
        <NewBannerModal
          show={this.state.show}
          close={this.handleClose}
          onUpload={this.onUpload}
          photoHandler={this.photoHandler}
          errormessage={this.state.errormessage}
          has_image={this.state.has_image}
          onDelete={this.onDelete}
        />
        {banner}
      </Card>
    );
  }
}

export default NewBanner;
