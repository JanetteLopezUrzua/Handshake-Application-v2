"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const { secret } = require("./default");
const Students = require("../models/Student/Students");
const Companies = require("../models/Company/Companies");

// Setup work and export for the JWT passport strategy
function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      console.log("JWT Payload:", jwt_payload);
      const user_id = jwt_payload.user.id;
      const user_type = jwt_payload.user.type;
      if (user_type === "student") {
        Students.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }

      if (user_type === "company") {
        Companies.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
