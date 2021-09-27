const request = require("supertest");
const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");

//Assertion style
chai.should();
chai.use(chaiHttp);

const api = request(app);

describe("Testing users/ route", () => {
  it.skip("if there are users in db so are returned as objects inside array", (done) => {
    api
      .get("/api/users/")
      .set("Accept", "application/json")
      .end(async (err, response) => {
        response.should.have.status(200);
        const { data } = await response.body;
        data.should.be.an("array");
        data.length.should.not.equal(0);
        done();
      });
  });
  it.skip("if there are not users in db so are returned as message", (done) => {
    api
      .get("/api/users/")
      .set("Accept", "application/json")
      .end(async (err, response) => {
        response.should.have.status(200);
        response.body.message.should.be.a("string");
        response.body.message.should.be.eq("There is no users");
        done();
      });
  });
});
