import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditSkills = props => {
  let form = "";
  if (
    localStorage.getItem("id") === props.id &&
    localStorage.getItem("type") === "student"
  ) {
    form = (
      <Form>
        <Row style={{ marginTop: "20px" }}>
          <Col sm={8}>
            <Form.Control
              onChange={props.skillschange}
              name="skill"
              type="text"
              placeholder="Add more skills"
            />
          </Col>
          <Col sm={4}>
            <Button className="save" onClick={props.save}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  } else {
    form = "";
  }

  return <div>{form}</div>;
};
export default EditSkills;
