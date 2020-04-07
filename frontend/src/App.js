import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Firstscreen from "./components/Firstscreen";
import StudentSignup from "./components/Student/Signup";
import StudentLogin from "./components/Student/Login";
import CompanySignup from "./components/Company/Signup";
import CompanyLogin from "./components/Company/Login";
import StudentProfile from "./components/Student/StudentProfile/ProfilePage";
import CompanyProfile from "./components/Company/CompanyProfile/ProfilePage";
import StudentStudentsList from "./components/Student/StudentTab/StudentsPage";
import CompanyStudentsList from "./components/Company/StudentTab/StudentsPage";
import NewEvent from "./components/Company/Events/NewEvent/NewEventInfo";
import CompanyEvents from "./components/Company/Events/EventPage";
import Event from "./components/Company/Events/EventContainer/EventContainer";
// import EventsSearch from "./components/Student/StudentEvents/EventsSearch/EventsSearchPage";
// import RegisteredEvents from "./components/Student/StudentEvents/RegisteredEvents/RegisteredEventsPage";
// import UpcomingEvents from "./components/Student/StudentEvents/UpcomingEvents/UpcomingEventsPage";
import Navbar from "./components/Navigationbar";
// import EventsNavBar from "./components/Student/StudentEvents/EventsNavBar";
// import NewJob from "./components/Company/JobPostings/NewJobPosting/NewJobPosting";
// import CompanyJobs from "./components/Company/JobPostings/JobsPage";
// import Job from "./components/Company/JobPostings/JobContainer/JobContainer";
// import JobsNavBar from "./components/Student/StudentJobs/JobsNavBar";
// import JobsSearch from "./components/Student/StudentJobs/JobsSearch/JobsSearch";
// import ApplicationsList from "./components/Student/StudentJobs/JobsApplications/ApplicationsPage";

// App Component
class App extends Component {
  render() {
    // const JobsContainer = () => (
    //   <div>
    //     <JobsNavBar />
    //     <Switch>
    //       <Route exact path="/student/jobs/search" component={JobsSearch} />
    //       <Route exact path="/student/jobs/applications" component={ApplicationsList} />
    //     </Switch>
    //   </div>
    // );

    // const EventsContainer = () => (
    //   <div>
    //     <EventsNavBar />
    //     <Switch>
    //       <Route exact path="/student/events/upcoming" component={UpcomingEvents} />
    //       <Route exact path="/student/events/search" component={EventsSearch} />
    //       <Route exact path="/student/events/registered" component={RegisteredEvents} />
    //     </Switch>
    //   </div>
    // );

    const DefaultContainer = () => (
      <div>
        <Navbar />
        <Switch>
          {/* <Route exact path="/job/:job_id" component={Job} /> */}
          <Route exact path="/event/:event_id" component={Event} />
          <Route exact path="/company/events/new" component={NewEvent} />
          <Route exact path="/company/events" component={CompanyEvents} />
          {/* <Route exact path="/company/jobs/new" component={NewJob} />
          <Route exact path="/company/jobs" component={CompanyJobs} /> */}
          <Route
            exact
            path="/student/students"
            component={StudentStudentsList}
          />
          <Route
            exact
            path="/company/students"
            component={CompanyStudentsList}
          />
          <Route exact path="/student/:id" component={StudentProfile} />
          <Route excat path="/company/:id" component={CompanyProfile} />
          {/* <Route path="/student/jobs/" component={JobsContainer} />
          <Route path="/student/events/" component={EventsContainer} /> */}
        </Switch>
      </div>
    );

    return (
      // Use Browser Router to route to different pages
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Firstscreen} />
          <Route path="/student/signup" component={StudentSignup} />
          <Route path="/student/login" component={StudentLogin} />
          <Route path="/company/signup" component={CompanySignup} />
          <Route path="/company/login" component={CompanyLogin} />
          <Route component={DefaultContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}
// Export the App component so that it can be used in index.js
export default App;
