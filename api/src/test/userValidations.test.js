const validations = require("../middlewares/userValidations");
const chai = require("chai");
const assert = require("chai").assert;
//Assertion style
chai.should();

describe("Testing password validations", () => {
  it("if password is weak", () => {
    const message = validations.verifyPassword("password");
    assert.equal(message, "That password security level is WEAK");
  });
  it("if password is medium", () => {
    const message = validations.verifyPassword("Password1234");
    assert.equal(message, "That password security level is MEDIUM");
  });
  it("if password is strong", () => {
    const message = validations.verifyPassword("PassWord*!1234");
    assert.equal(message, "That password security level is STRONG");
  });
});
