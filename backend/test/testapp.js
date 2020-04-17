/* eslint-disable no-undef */
const chai = require("chai");
let should = chai.should();
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../server.js");
// eslint-disable-next-line import/order
const agent = require("chai").request.agent(app);

let defaultUser = {
  email: "draco@gmail.com",
  password: "123456",
};

let token = "";

describe("User", () => {
  beforeEach((done) => {
    agent
      .post("/students/login")
      .send(defaultUser)
      .end((err, res) => {
        token = res.body;
        res.should.have.status(200);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  describe("Handshake Application", () => {
    it("Get first name", (done) => {
      agent
        .get("/students/info/5e851171eccda17ec0b7d7cd")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.student.fname).to.equal("Draco");
          done();
        });
    });

    it("Get total number of upcoming events", (done) => {
      agent
        .get("/students/upcoming/eventslist?page=1")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.eventsList.total).to.equal(9);
          done();
        });
    });

    it("Insert skill", (done) => {
      agent
        .put("/students/skillset")
        .send({ id: "5e851171eccda17ec0b7d7cd", skill: "C" })
        .set("Authorization", token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Get phone number", (done) => {
      agent
        .get("/students/info/5e851171eccda17ec0b7d7cd")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.student.fname).to.equal("Draco");
          done();
        });
    });

    it("Get first skill", (done) => {
      agent
        .get("/students/info/5e851171eccda17ec0b7d7cd")
        .set("Authorization", token)
        .end((err, res) => {
          expect(res.body.student.skillset[0].skill).to.equal("React");
          done();
        });
    });
  });
});
