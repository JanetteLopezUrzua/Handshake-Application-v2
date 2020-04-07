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
