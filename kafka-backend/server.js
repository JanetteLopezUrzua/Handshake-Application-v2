var connection = new require("./kafka/Connection");
const connectDB = require("./config/db");
//Connect to Database
connectDB();

//topics files
//var signin = require('./services/signin.js');
var StudentLogin = require("./services/student_login.js");
var StudentSignup = require("./services/student_signup.js");
var StudentInfo = require("./services/student_info");
var StudentUpdateBasicInfo = require("./services/student_update_basic_info");
var StudentUpdateCareerObjective = require("./services/student_update_career_objective");
var StudentUpdatePhoto = require("./services/student_update_photo");
var StudentDeletePhoto = require("./services/student_delete_photo");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
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
