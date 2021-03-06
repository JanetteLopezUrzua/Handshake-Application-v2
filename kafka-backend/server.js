var connection = new require("./kafka/Connection");
const connectDB = require("./config/db");
//Connect to Database
connectDB();

//topics files

/************* STUDENT *************************/
var StudentLogin = require("./services/student/auth/student_login.js");
var StudentSignup = require("./services/student/auth/student_signup.js");
var StudentInfo = require("./services/student/profile/student_info");
var StudentUpdateBasicInfo = require("./services/student/profile/student_update_basic_info");
var StudentUpdateCareerObjective = require("./services/student/profile/student_update_career_objective");
var StudentUpdatePhoto = require("./services/student/profile/student_update_photo");
var StudentDeletePhoto = require("./services/student/profile/student_delete_photo");
var StudentUpdateContactInfo = require("./services/student/profile/student_update_contact_info");
var StudentUpdateSkillset = require("./services/student/profile/student_update_skillset");
var StudentDeleteSkill = require("./services/student/profile/student_delete_skill");
var StudentAddNewSchool = require("./services/student/profile/student_add_new_school");
var StudentDeleteSchool = require("./services/student/profile/student_delete_school");
var StudentUpdateSchool = require("./services/student/profile/student_update_school");
var StudentAddNewJob = require("./services/student/profile/student_add_new_job");
var StudentDeleteJob = require("./services/student/profile/student_delete_job");
var StudentUpdateJob = require("./services/student/profile/student_update_job");
var StudentsList = require("./services/student/studentslist/students_list");
var StudentEventsList = require("./services/student/events/student_events_list");
var StudentRegisteredEventsList = require("./services/student/events/student_registered_events_list");
var StudentUpcomingEventsList = require("./services/student/events/student_upcoming_events_list");
var StudentJobsList = require("./services/student/jobs/student_jobs_list");
var StudentUploadResume = require("./services/student/jobs/student_upload_resume");
var StudentApplicationsList = require("./services/student/jobs/student_applications_list");
var StudentNewMessage = require("./services/student/messages/student_add_new_message");
var StudentMessagesList = require("./services/student/messages/student_messages_list");
var StudentMessageInfo = require("./services/student/messages/student_message_info");

/************* COMPANY *************************/
var CompanyLogin = require("./services/company/auth/company_login.js");
var CompanySignup = require("./services/company/auth/company_signup.js");
var CompanyInfo = require("./services/company/profile/company_info");
var CompanyUpdateBasicInfo = require("./services/company/profile/company_update_basic_info");
var CompanyUpdateContactInfo = require("./services/company/profile/company_update_contact_info");
var CompanyUpdatePhoto = require("./services/company/profile/company_update_photo");
var CompanyDeletePhoto = require("./services/company/profile/company_delete_photo");
var CompanyUpdateName = require("./services/company/profile/company_update_name");
var CompanyStudentsList = require("./services/company/studentslist/company_students_list");
var CompanyAddNewEvent = require("./services/company/events/company_add_new_event");
var CompanyEventsList = require("./services/company/events/company_events_list");
var CompanyUpdateBannerPhoto = require("./services/company/events/company_update_banner_photo");
var CompanyDeleteBannerPhoto = require("./services/company/events/company_delete_banner_photo");
var EventInfo = require("./services/company/events/event_info");
var CompanyUpdateEventDescription = require("./services/company/events/company_update_event_description");
var CompanyUpdateEventInfo = require("./services/company/events/company_update_event_info");
var CompanyDeleteEvent = require("./services/company/events/company_delete_event");
var CompanyRSVPList = require("./services/company/events/company_event_rsvp_list");
var CompanyRSVPStudent = require("./services/company/events/company_rsvp_student");
var CompanyUnregisterStudent = require("./services/company/events/company_unregister_student");
var CompanyAddNewJob = require("./services/company/jobs/company_add_new_job");
var CompanyJobsList = require("./services/company/jobs/company_jobs_list");
var CompanyDeleteJob = require("./services/company/jobs/company_delete_job");
var CompanyApplicationsList = require("./services/company/jobs/company_job_applications_list");
var JobPostingInfo = require("./services/company/jobs/job_posting_info");
var CompanyUpdateJobInfo = require("./services/company/jobs/company_update_job_info");
var CompanyUpdateApplicationStatus = require("./services/company/jobs/company_update_application_status");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

/************* STUDENT *************************/
handleTopicRequest("student_login", StudentLogin);
handleTopicRequest("student_signup", StudentSignup);
handleTopicRequest("student_info", StudentInfo);
handleTopicRequest("student_update_basic_info", StudentUpdateBasicInfo);
handleTopicRequest(
  "student_update_career_objective",
  StudentUpdateCareerObjective
);
handleTopicRequest("student_update_photo", StudentUpdatePhoto);
handleTopicRequest("student_delete_photo", StudentDeletePhoto);
handleTopicRequest("student_update_contact_info", StudentUpdateContactInfo);
handleTopicRequest("student_update_skillset", StudentUpdateSkillset);
handleTopicRequest("student_delete_skill", StudentDeleteSkill);
handleTopicRequest("student_add_new_school", StudentAddNewSchool);
handleTopicRequest("student_delete_school", StudentDeleteSchool);
handleTopicRequest("student_update_school", StudentUpdateSchool);
handleTopicRequest("student_add_new_job", StudentAddNewJob);
handleTopicRequest("student_delete_job", StudentDeleteJob);
handleTopicRequest("student_update_job", StudentUpdateJob);
handleTopicRequest("students_list", StudentsList);
handleTopicRequest("student_events_list", StudentEventsList);
handleTopicRequest(
  "student_registered_events_list",
  StudentRegisteredEventsList
);
handleTopicRequest("student_upcoming_events_list", StudentUpcomingEventsList);
handleTopicRequest("student_jobs_list", StudentJobsList);
handleTopicRequest("student_upload_resume", StudentUploadResume);
handleTopicRequest("student_applications_list", StudentApplicationsList);
handleTopicRequest("student_add_new_message", StudentNewMessage);
handleTopicRequest("student_messages_list", StudentMessagesList);
handleTopicRequest("student_message_info", StudentMessageInfo);

/************* COMPANY *************************/
handleTopicRequest("company_login", CompanyLogin);
handleTopicRequest("company_signup", CompanySignup);
handleTopicRequest("company_info", CompanyInfo);
handleTopicRequest("company_update_basic_info", CompanyUpdateBasicInfo);
handleTopicRequest("company_update_contact_info", CompanyUpdateContactInfo);
handleTopicRequest("company_update_photo", CompanyUpdatePhoto);
handleTopicRequest("company_delete_photo", CompanyDeletePhoto);
handleTopicRequest("company_update_name", CompanyUpdateName);
handleTopicRequest("company_students_list", CompanyStudentsList);
handleTopicRequest("company_add_new_event", CompanyAddNewEvent);
handleTopicRequest("company_events_list", CompanyEventsList);
handleTopicRequest("company_update_banner_photo", CompanyUpdateBannerPhoto);
handleTopicRequest("company_delete_banner_photo", CompanyDeleteBannerPhoto);
handleTopicRequest("event_info", EventInfo);
handleTopicRequest(
  "company_update_event_description",
  CompanyUpdateEventDescription
);
handleTopicRequest("company_update_event_info", CompanyUpdateEventInfo);
handleTopicRequest("company_delete_event", CompanyDeleteEvent);
handleTopicRequest("company_event_rsvp_list", CompanyRSVPList);
handleTopicRequest("company_rsvp_student", CompanyRSVPStudent);
handleTopicRequest("company_unregister_student", CompanyUnregisterStudent);
handleTopicRequest("company_add_new_job", CompanyAddNewJob);
handleTopicRequest("company_jobs_list", CompanyJobsList);
handleTopicRequest("company_delete_job", CompanyDeleteJob);
handleTopicRequest("company_job_applications_list", CompanyApplicationsList);
handleTopicRequest("job_posting_info", JobPostingInfo);
handleTopicRequest("company_update_job_info", CompanyUpdateJobInfo);
handleTopicRequest(
  "company_update_application_status",
  CompanyUpdateApplicationStatus
);
