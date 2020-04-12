import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const ConnectedJobApplicationModal = (props) => {
  let applicationsList = "";

  if (props.applicationslist.applications !== null) {
    if (props.applicationslist.applications.applications) {
      if (props.applicationslist.applications.applications.length === 0) {
        applicationsList = "";
      } else {
        applicationsList = props.applicationslist.applications.applications.map(
          (application) => {
            let img = "";
            if (!application.studentid.photo) {
              img = (
                <div>
                  <div className="studentslistpics">
                    <p style={{ paddingTop: "10px" }}>
                      {application.studentid.fname.charAt(0)}
                      {application.studentidlname.charAt(0)}
                    </p>
                  </div>
                </div>
              );
            } else {
              img = (
                <Image
                  className="studentslistpics"
                  src={`http://localhost:3001/resumesandimages/${application.studentid.photo}`}
                />
              );

              const path = `/student/${application.studentid._id}`;

              return (
                <Container key={application.studentid._id}>
                  <Row style={{ paddingTop: "10px" }}>
                    <Col sm={2}>{img}</Col>
                    <Col sm={4} style={{ paddingTop: "10px" }}>
                      <Link
                        to={path}
                        className="studentslistinfo"
                        style={{ color: "#1569e0", fontSize: "16px" }}
                      >
                        {application.studentid.fname}{" "}
                        {application.studentid.lname}
                      </Link>
                    </Col>
                    <Col
                      sm={2}
                      style={{ paddingLeft: "0", paddingTop: "10px" }}
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://localhost:3001/resumesandimages/${application.resume.replace(
                          "resume",
                          "file"
                        )}`}
                      >
                        Resume
                      </a>
                    </Col>
                    <Col sm={4}>
                      <Form.Group controlId="appstatus">
                        <Form.Label className="labels">Status</Form.Label>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            props.handleStatus(e, application._id);
                          }}
                          name="appstatus"
                        >
                          <option hidden>{application.status} </option>
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Declined">Declined</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              );
            }
          }
        );
      }
    }
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>Applications</Modal.Title>
      </Modal.Header>
      <Modal.Body>{applicationsList}</Modal.Body>
      <Modal.Footer>
        <p>{applicationsList.length} students have applied. </p>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return { applicationslist: state.applicationslist };
};
const JobApplicationModal = connect(mapStateToProps)(
  ConnectedJobApplicationModal
);
export default JobApplicationModal;
