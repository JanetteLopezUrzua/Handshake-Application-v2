import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import MessagesListDisplay from "./MessagesListDisplay";
import MessagesDescriptionDisplay from "./MessageDescriptionDisplay";

import {
  loadmessage,
  loadmessageslist,
  sendmessage,
} from "../../../actions/messages";

class ConnectedMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
  }

  async componentDidMount() {
    const toid = localStorage.getItem("id");
    const type = localStorage.getItem("type");
    await this.props.dispatch(loadmessageslist(type, toid));
  }

  handleMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  onSend = async (e, id, type) => {
    e.preventDefault();
    let fromtype = "";
    if (localStorage.getItem("type") === "student") {
      fromtype = "students";
    } else if (localStorage.getItem("type") === "company") {
      fromtype = "companies";
    }

    const { message } = this.state;
    const fromId = localStorage.getItem("id");

    const date = new Date();
    const day = `${date.getDate()}`.slice(-2);
    const month = `${date.getMonth()}`.slice(-2);
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();

    const day_time = hours >= 12 ? "PM" : "AM";

    hours %= 12;

    await this.props.dispatch(
      sendmessage(
        fromtype,
        fromId,
        type,
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
      const fromid = fromId;
      const currid = id;
      await this.props.dispatch(loadmessage(fromid, currid));
    }
  };

  messageClick = async (fromid) => {
    let currid = localStorage.getItem("id");

    if (localStorage.getItem("type") === "company") {
      const temp = currid;
      currid = fromid;
      fromid = temp;
    }

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
            (message) => (
              <MessagesListDisplay
                key={message._id}
                messageid={message._id}
                message={message}
                messageClick={this.messageClick}
              />
            )
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
              <MessagesDescriptionDisplay
                handleMessage={this.handleMessage}
                onSend={this.onSend}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  userprofile: state.userprofile,
  messageslist: state.messageslist,
  message: state.message,
});
const Messages = connect(mapStateToProps)(ConnectedMessages);
export default Messages;
