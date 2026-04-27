const { body, param } = require("express-validator");

const createRegistrationValidation = [
  body("event").isMongoId().withMessage("Event must be a valid MongoDB ObjectId"),
];

const registrationIdValidation = [
  param("id").isMongoId().withMessage("Registration id must be valid"),
];

module.exports = { createRegistrationValidation, registrationIdValidation };
