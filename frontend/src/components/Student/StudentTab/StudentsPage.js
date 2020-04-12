import React from "react";
import "../../components.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { Redirect } from "react-router";
import DisplayStudent from "./DisplayStudent";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import setAuthToken from "../../../utils/setAuthToken";
import { connect } from "react-redux";
import { loadstudentprofile } from "../../../actions/studentprofile";
import { loadstudentslist } from "../../../actions/studentslist";

class ConnectedStudentTab extends React.Component {
  constructor() {
    super();
    this.state = {
      nameorcollege: "",
      major: "",
      redirect: "",
      page: 0,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.nameorcollege !== this.state.nameorcollege ||
      prevState.major !== this.state.major
    ) {
      await this.props.dispatch(
        loadstudentslist(
          this.state.page,
          this.state.nameorcollege,
          this.state.major
        )
      );
      window.scrollTo(0, 0);
      this.setState({
        page: 1,
        redirect: (
          <Redirect
            to={`/student/students?page=1&nameorcollege=${this.state.nameorcollege}&major=${this.state.major}`}
          />
        ),
      });
    }
  }

  async componentDidMount() {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    const id = localStorage.getItem("id");
    await this.props.dispatch(loadstudentprofile(id));
    await this.props.dispatch(loadstudentslist(1, "", ""));

    this.setState({
      page: 1,
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  nextPage = async () => {
    let nextpage = this.state.page + 1;
    await this.props.dispatch(
      loadstudentslist(nextpage, this.state.nameorcollege, this.state.major)
    );
    window.scrollTo(0, 0);
    this.setState({
      page: nextpage,
      redirect: (
        <Redirect
          to={`/student/students?page=${nextpage}&nameorcollege=${this.state.nameorcollege}&major=${this.state.major}`}
        />
      ),
    });
  };

  prevPage = async () => {
    let prevpage = this.state.page - 1;
    await this.props.dispatch(
      loadstudentslist(prevpage, this.state.nameorcollege, this.state.major)
    );
    window.scrollTo(0, 0);
    this.setState({
      page: prevpage,
      redirect: (
        <Redirect
          to={`/student/students?page=${prevpage}&nameorcollege=${this.state.nameorcollege}&major=${this.state.major}`}
        />
      ),
    });
  };

  async componentWillUnmount() {
    await this.props.dispatch(loadstudentslist(1, "", ""));
  }

  render() {
    // if not logged in go to login page
    let redirectVar = null;
    if (this.props.userprofile.isAuthenticated === false) {
      redirectVar = <Redirect to="/" />;
    } else if (localStorage.getItem("type") === "company") {
      redirectVar = <Redirect to={`/company/${localStorage.getItem("id")}`} />;
    }

    let studentsList = "";
    let message = "";
    let currPage = "";
    let numOfPages = "";
    let limit = "";
    let totalStudents = "";
    let pageRedirect = null;
    let pagesArrows = "";

    if (this.props.studentslist.students !== null) {
      if (this.props.studentslist.students.studentsList.docs) {
        if (this.props.studentslist.students.studentsList.docs.length === 0) {
          studentsList = "";
          message = "No Students Found";
        } else {
          studentsList = this.props.studentslist.students.studentsList.docs.map(
            (student) => {
              return (
                <DisplayStudent
                  key={student._id}
                  studentid={student._id}
                  student={student}
                />
              );
            }
          );
          currPage = this.props.studentslist.students.studentsList.page;
          numOfPages = this.props.studentslist.students.studentsList.pages;
          limit = this.props.studentslist.students.studentsList.limit;
          totalStudents = this.props.studentslist.students.studentsList.total;
          pageRedirect = this.state.redirect;

          if (this.state.page === 1 && currPage !== numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.prevPage}
                    disabled
                  >
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${this.state.page} / ${numOfPages}`}</div>
                  <Button className="pagesbuttons" onClick={this.nextPage}>
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else if (this.state.page === 1 && currPage === numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.prevPage}
                    disabled
                  >
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${this.state.page} / ${numOfPages}`}</div>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.nextPage}
                    disabled
                  >
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else if (currPage === numOfPages) {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button className="pagesbuttons" onClick={this.prevPage}>
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${currPage} / ${numOfPages}`}</div>
                  <Button
                    className="pagesbuttons"
                    style={{ cursor: "not-allowed" }}
                    onClick={this.nextPage}
                    disabled
                  >
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          } else {
            pagesArrows = (
              <Container style={{ display: "flex", justifyContent: "center" }}>
                <Row>
                  <Button className="pagesbuttons" onClick={this.prevPage}>
                    <FaChevronLeft />
                  </Button>
                  <div className="pagesinfo">{`${currPage} / ${numOfPages}`}</div>
                  <Button className="pagesbuttons" onClick={this.nextPage}>
                    <FaChevronRight />
                  </Button>
                </Row>
              </Container>
            );
          }
        }
      }
    }

    return (
      <div>
        {redirectVar}
        {pageRedirect}
        <Card className="studentslistbarcard">
          <Container>
            <Row>
              <Col sm={4}>
                <Card.Title className="studentslistbar">
                  <h2>Explore Students</h2>
                </Card.Title>
              </Col>
            </Row>
          </Container>
        </Card>
        <Container>
          <Row>
            <Col sm={4}>
              <Card style={{ padding: "0" }}>
                <ListGroup variant="flush">
                  <ListGroup.Item className="studentslisttitle">
                    <Row>
                      <Col>Search</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">
                      Name or College
                    </Card.Text>
                    <Form.Group controlId="nameorcollege">
                      <Form.Control
                        onChange={this.handleChange}
                        name="name"
                        type="search"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                  <ListGroup.Item className="studentslisttitle">
                    Filter
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Text className="studentslistsubtitle">
                      Major
                    </Card.Text>
                    <Form.Group controlId="major">
                      <Form.Control
                        onChange={this.handleChange}
                        name="major"
                        type="search"
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col sm={8}>
              <Container>
                {studentsList}
                {pagesArrows}
                <p className="errormessage">{message}</p>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userprofile: state.userprofile,
    studentslist: state.studentslist,
  };
};
const StudentTab = connect(mapStateToProps)(ConnectedStudentTab);
export default StudentTab;
