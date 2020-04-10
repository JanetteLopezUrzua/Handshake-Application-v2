import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const ConnectedRSVPModal = (props) => {
  let studentsList = "";

  if (props.rsvplist.students !== null) {
    if (props.rsvplist.students.students) {
      if (props.rsvplist.students.students.length === 0) {
        studentsList = "";
      } else {
        studentsList = props.rsvplist.students.students.map((student) => {
          let img = "";

          if (!student.studentid.photo) {
            img = (
              <div>
                <div className="studentslistpics">
                  <p style={{ paddingTop: "10px" }}>
                    {student.studentid.fname.charAt(0)}
                    {student.studentid.lname.charAt(0)}
                  </p>
                </div>
              </div>
            );
          } else {
            img = (
              <Image
                className="studentslistpics"
                src={`http://localhost:3001/resumesandimages/${student.studentid.photo}`}
              />
            );
          }

          const path = `/student/${student.studentid._id}`;

          return (
            <Container key={student.studentid.id}>
              <Row style={{ paddingTop: "10px" }}>
                <Col sm={2}>{img}</Col>
                <Col sm={10} style={{ paddingTop: "10px" }}>
                  <Link
                    to={path}
                    className="studentslistinfo"
                    style={{ color: "#1569e0", fontSize: "16px" }}
                  >
                    {student.studentid.fname} {student.studentid.lname}
                  </Link>
                </Col>
              </Row>
            </Container>
          );
        });
      }
    }
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        <Modal.Title>RSVP</Modal.Title>
      </Modal.Header>
      <Modal.Body>{studentsList}</Modal.Body>
      <Modal.Footer>
        <p>{studentsList.length} students in list. </p>
      </Modal.Footer>
    </Modal>
  );
};
const mapStateToProps = (state) => {
  return { rsvplist: state.rsvplist };
};
const RSVPModal = connect(mapStateToProps)(ConnectedRSVPModal);
export default RSVPModal;
