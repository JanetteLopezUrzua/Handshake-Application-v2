import React from "react";
// import cookie from 'react-cookies';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

const JobsListDisplay = (props) => {
  const { name } = props.job.companyid;
  let photo = "";
  if (props.job.companyid.photo) photo = props.job.companyid.photo;

  let img = "";
  if (photo === "") {
    img = (
      <div>
        <div className="eventslistpics">
          <p>{name.charAt(0)}</p>
        </div>
      </div>
    );
  } else {
    img = (
      <Image
        className="eventslistpics"
        src={`http://localhost:3001/resumesandimages/${photo}`}
      />
    );
  }

  return (
    <Container
      style={{ padding: "10px" }}
      onClick={(e) => props.jobClick(props.jobid)}
    >
      <Link style={{ color: "black" }} to="###">
        <Row>
          <Col sm={3}>{img}</Col>
          <Col sm={9}>
            <Card.Title className="studentslistname">
              {props.job.title}
            </Card.Title>
            <Card.Title className="studentslistcollege">
              {name} - {props.job.location}
            </Card.Title>
            <Card.Title className="studentslistinfo">
              {props.job.category}
            </Card.Title>
          </Col>
        </Row>
      </Link>
    </Container>
  );
};

export default JobsListDisplay;
