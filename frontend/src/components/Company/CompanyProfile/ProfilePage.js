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
import { loadcompanyprofile } from "../../../actions/companyprofile";

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
    await this.props.dispatch(loadcompanyprofile(id));
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
const mapStateToProps = state => {
  return { userprofile: state.userprofile };
};
const ProfilePage = connect(mapStateToProps)(ConnectedProfilePage);
export default ProfilePage;
