import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import BasicDetails from "./BasicDetails/BasicDetails";
import CareerObjective from "./CareerObjective/CareerObjective";
import Skillset from "./Skillset/Skillset";
import PictureDetails from "./PictureDetails/PictureDetails";
import ContactInformation from "./ContactInfo/ContactInformation";
import EducationDetails from "./EducationDetails/EducationDetails";
import WorkDetails from "./WorkDetails/WorkDetails";

import setAuthToken from "../../../utils/setAuthToken";
import { connect } from "react-redux";
import { loadstudentprofile } from "../../../actions/studentprofile";

class ConnectedProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const id = this.props.match.params.id;
    console.log("compoent did mount");
    await this.props.dispatch(loadstudentprofile(id));
  }

  render() {
    console.log("rendering");
    // if not logged in redirect to first page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    }

    return (
      <Container>
        {redirectVar}
        <Row>
          <Col sm={4}>
            <PictureDetails id={this.props.match.params.id} />
            <Skillset id={this.props.match.params.id} />
            <BasicDetails id={this.props.match.params.id} />
          </Col>
          <Col sm={8}>
            <CareerObjective id={this.props.match.params.id} />
            <EducationDetails id={this.props.match.params.id} />
            <WorkDetails id={this.props.match.params.id} />
            <ContactInformation id={this.props.match.params.id} />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return { userprofile: state.userprofile };
};
const ProfilePage = connect(mapStateToProps)(ConnectedProfilePage);
export default ProfilePage;
