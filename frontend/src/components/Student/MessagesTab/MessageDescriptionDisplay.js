import React from "react";
import "../../components.css";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";

const ConnectedMessageDescriptionDisplay = (props) => {
  let m = "";
  let messagesList = "";
  let id = "";
  let type = "";

  if (props.message.message === null) {
    m = "No conversation selected.";
  }

  if (props.message.message !== null) {
    if (props.message.message.message) {
      if (
        props.message.message.message[0].toid === localStorage.getItem("id")
      ) {
        if (props.message.message.message[0].onModel1 === "students") {
          id = props.message.message.message[0].fromid._id;
          type = "students";
        } else {
          id = props.message.message.message[0].fromid._id;
          type = "companies";
        }
      } else if (
        props.message.message.message[0].fromid._id
        === localStorage.getItem("id")
      ) {
        if (props.message.message.message[0].onModel2 === "students") {
          id = props.message.message.message[0].toid;
          type = "students";
        } else {
          id = props.message.message.message[0].toid;
          type = "companies";
        }
      }

      messagesList = props.message.message.message.map((message) => {
        let name = "";
        let fname = "";
        let lname = "";
        let photo = "";
        let img = "";

        if (message.onModel1 === "companies") {
          name = message.fromid.name;

          if (message.fromid.photo) photo = message.fromid.photo;

          if (photo === "") {
            img = (
              <div>
                <div className="studentslistpics">
                  <p style={{ paddingTop: "10px" }}>{name.charAt(0)}</p>
                </div>
              </div>
            );
          } else {
            img = (
              <Image
                className="studentslistpics"
                src={`http://localhost:3001/resumesandimages/${photo}`}
                roundedcircle="true"
              />
            );
          }
        } else {
          fname = message.fromid.fname;
          lname = message.fromid.lname;
          name = `${fname} ${lname}`;

          if (message.fromid.photo) photo = message.fromid.photo;

          if (photo === "") {
            img = (
              <div>
                <div className="studentslistpics">
                  <p style={{ paddingTop: "10px" }}>
                    {fname.charAt(0)}
                    {lname.charAt(0)}
                  </p>
                </div>
              </div>
            );
          } else {
            img = (
              <Image
                className="studentslistpics"
                src={`http://localhost:3001/resumesandimages/${photo}`}
                roundedcircle="true"
              />
            );
          }
        }

        if (message.fromid._id === localStorage.getItem("id")) {
          return (
            <Container
              style={{
                width: "60%",
                marginRight: "0",
              }}
            >
              <Row>
                <Col
                  md={9}
                  style={{
                    backgroundColor: "rgb(100,149,237)",
                    borderRadius: "5px",
                    marginTop: "20px",
                    paddingRigth: "30px",
                    paddingLeft: "30px",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  <Row>{message.messages.message}</Row>
                  <Row style={{ fontSize: "10px" }}>
                    {`${message.messages.messagemonth + 1}/${
                      message.messages.messageday
                    }/${message.messages.messageyear} ${
                      message.messages.messagehour
                    }:${
                      message.messages.messageminute < 10
                        ? `0${message.messages.messageminute}`
                        : message.messages.messageminute
                    } ${message.messages.messagedaytime}`}
                  </Row>
                </Col>
                <Col md={3}>{img}</Col>
              </Row>
            </Container>
          );
        }
        return (
          <Container
            style={{
              width: "60%",
              marginLeft: "0",
              marginTop: "20px",
            }}
          >
            <Row>
              <Col md={3}>{img}</Col>
              <Col
                md={9}
                style={{
                  backgroundColor: "rgb(239, 240, 241)",
                  borderRadius: "5px",
                  paddingRigth: "30px",
                  paddingLeft: "30px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <Row>{message.messages.message}</Row>
                <Row style={{ fontSize: "10px" }}>
                  {`${message.messages.messagemonth + 1}/${
                    message.messages.messageday
                  }/${message.messages.messageyear} ${
                    message.messages.messagehour
                  }:${
                    message.messages.messageminute < 10
                      ? `0${message.messages.messageminute}`
                      : message.messages.messageminute
                  } ${message.messages.messagedaytime}`}
                </Row>
              </Col>
            </Row>
          </Container>
        );
      });
    }
  }

  let display = "";
  if (m === "") {
    display = (
      <>
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
        <Container
          style={{
            overflowY: "scroll",
            height: "700px",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {messagesList}
        </Container>
        <Container
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
          }}
        >
          <Row>
            <Col md={10}>
              <Form.Group controlId="message">
                <Form.Control
                  as="textarea"
                  onChange={props.handleMessage}
                  name="message"
                  type="text"
                  rows="3"
                  placeholder="Type a message..."
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Button
                className="save"
                onClick={(e) => props.onSend(e, id, type)}
              >
                Send
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  return (
    <div>
      <Container style={{ padding: "0" }}>
        {display}
        <p>{m}</p>
      </Container>
    </div>
  );
};
const mapStateToProps = (state) => ({ message: state.allmessages });
const MessageDescriptionDisplay = connect(mapStateToProps)(
  ConnectedMessageDescriptionDisplay
);
export default MessageDescriptionDisplay;
