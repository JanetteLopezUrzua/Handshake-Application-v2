import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MdEdit } from "react-icons/md";

import { connect } from "react-redux";

const ConnectedEventDisplayDescription = (props) => {
  let company_id = "";
  let description = "";

  if (props.event.event !== null) {
    company_id = props.event.event.event.companyid._id
      ? props.event.event.event.companyid._id
      : "";
    description = props.event.event.event.description
      ? props.event.event.event.description
      : "";
  }

  let button = "";

  if (
    localStorage.getItem("id") === company_id &&
    localStorage.getItem("type") === "company"
  ) {
    button = (
      <Col style={{ textAlign: "right" }}>
        <Button className="editbutton" onClick={props.clicked}>
          <MdEdit style={{ color: "black" }} />
        </Button>
      </Col>
    );
  }

  return (
    <Card>
      <Row>{button}</Row>
      <Card.Text style={{ fontSize: "14px", color: "black" }}>
        {description}
      </Card.Text>
    </Card>
  );
};
const mapStateToProps = (state) => {
  return { event: state.event };
};
const EventDisplayDescription = connect(mapStateToProps)(
  ConnectedEventDisplayDescription
);
export default EventDisplayDescription;
