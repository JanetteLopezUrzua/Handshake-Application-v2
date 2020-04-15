import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

const MessagesListDisplay = (props) => {
  let name = "";
  let fname = "";
  let lname = "";
  let photo = "";
  let img = "";
  let lastmessage = "";
  if (localStorage.getItem("type") === "student") {
    if (props.message.onModel1 === "companies") {
      name = props.message.fromid.name;
      lastmessage =
        props.message.messages[props.message.messages.length - 1].message;
      if (props.message.fromid.photo) photo = props.message.fromid.photo;

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
    }

    if (props.message.onModel1 === "students") {
      fname = props.message.fromid.fname;
      lname = props.message.fromid.lname;
      name = `${fname} ${lname}`;
      lastmessage =
        props.message.messages[props.message.messages.length - 1].message;
      if (props.message.fromid.photo) photo = props.message.fromid.photo;

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
  } else {
    if (props.message.onModel1 === "companies") {
      fname = props.message.toid.fname;
      lname = props.message.toid.lname;
      name = `${fname} ${lname}`;
      lastmessage = "";
      if (props.message.toid.photo) photo = props.message.toid.photo;

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
    }

    if (props.message.onModel1 === "students") {
      name = props.message.toid.name;
      lastmessage = "";
      if (props.message.toid.photo) photo = props.message.toid.photo;

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
  }

  let id = "";
  if (localStorage.getItem("type") === "company") {
    id = props.message.toid._id;
  } else {
    id = props.message.fromid._id;
  }

  return (
    <Container
      style={{ padding: "10px" }}
      onClick={(e) => props.messageClick(id)}
    >
      <Link style={{ color: "black" }} to="###">
        <Row>
          <Col sm={3}>{img}</Col>
          <Col sm={9}>
            <Card.Title className="studentslistname">{name}</Card.Title>
            <p
              style={{
                whiteSpace: "nowrap",
                width: "100%",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lastmessage}
            </p>
          </Col>
        </Row>
      </Link>
    </Container>
  );
};

export default MessagesListDisplay;
