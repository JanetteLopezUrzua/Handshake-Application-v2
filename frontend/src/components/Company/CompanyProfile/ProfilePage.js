import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import BasicDetails from "./BasicDetails/BasicDetails";
import PictureDetails from "./PictureDetails/PictureDetails";
import ContactInformation from "./ContactInfo/ContactInformation";

import setAuthToken from "../../../utils/setAuthToken";
import { connect } from "react-redux";
import {
  loadcompanyprofile,
  loadcurrentcompany,
} from "../../../actions/companyprofile";
import { loadcurrentstudent } from "../../../actions/studentprofile";

class ConnectedProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const id = this.props.match.params.id;

    if (localStorage.getItem("type") === "company") {
      await this.props.dispatch(loadcompanyprofile(localStorage.getItem("id")));
      await this.props.dispatch(loadcurrentstudent(id));
    } else await this.props.dispatch(loadcurrentcompany(id));
  }

  render() {
    // if not logged in redirect to first page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <Container>
        {redirectVar}
        <PictureDetails id={this.props.match.params.id} />
        <Row>
          <Col sm={8}>
            <BasicDetails id={this.props.match.params.id} />
          </Col>
          <Col sm={4}>
            <ContactInformation id={this.props.match.params.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { userprofile: state.userprofile, currentuser: state.currentuser };
};
const ProfilePage = connect(mapStateToProps)(ConnectedProfilePage);
export default ProfilePage;
