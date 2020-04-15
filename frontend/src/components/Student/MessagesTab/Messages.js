import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { MdLocationOn } from "react-icons/md";
import { Redirect } from "react-router";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import MessagesListDisplay from "./MessagesListDisplay";
import MessagesDescriptionDisplay from "./MessageDescriptionDisplay";

import { connect } from "react-redux";
import { loadmessage, loadmessageslist } from "../../../actions/messages";

class ConnectedMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  async componentDidMount() {
    let toid = localStorage.getItem("id");
    await this.props.dispatch(loadmessageslist(toid));
  }

  handleMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  messageClick = async (fromid) => {
    let currid = localStorage.getItem("id");
    await this.props.dispatch(loadmessage(fromid, currid));
  };

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    }

    let messagesList = "";
    let m = "";
    if (this.props.messageslist.messages !== null) {
      if (this.props.messageslist.messages.messagesList) {
        if (this.props.messageslist.messages.messagesList.length === 0) {
          messagesList = "";
          m = "Found 0 messages";
        } else {
          messagesList = this.props.messageslist.messages.messagesList.map(
            (message) => {
              return (
                <MessagesListDisplay
                  key={message._id}
                  messageid={message._id}
                  message={message}
                  messageClick={this.messageClick}
                />
              );
            }
          );
        }
      }
    }

    return (
      <Container>
        {redirectVar}
        <Row>
          <Col sm={4} style={{ paddingRight: "0" }}>
            <Card
              style={{
                marginRight: "0",
                borderBottomRightRadius: "0",
                borderTopRightRadius: "0",
                maxHeight: "900px",
                height: "900px",
                overflowY: "scroll",
              }}
            >
              <Container>
                <p
                  style={{
                    textAlign: "center",
                    color: "rgba(0,0,0,.98)",
                    lineHeight: "1.33em",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  Messages
                </p>
              </Container>
              <Nav>{messagesList}</Nav>
              <p className="errormessage">{m}</p>
            </Card>
          </Col>
          <Col sm={8} style={{ paddingLeft: "0" }}>
            <Card
              style={{
                marginLeft: "0",
                borderBottomLeftRadius: "0",
                borderTopLeftRadius: "0",
                maxHeight: "900px",
                height: "900px",
                position: "relative",
              }}
            >
              <MessagesDescriptionDisplay handleMessage={this.handleMessage} />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userprofile: state.userprofile,
    messageslist: state.messageslist,
  };
};
const Messages = connect(mapStateToProps)(ConnectedMessages);
export default Messages;
