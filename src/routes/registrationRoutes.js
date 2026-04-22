const express = require("express");
const {
  createRegistration,
  getMyRegistrations,
  cancelRegistration,
} = require("../controllers/registrationController");
const { protect } = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  createRegistrationValidation,
  registrationIdValidation,
} = require("../validations/registrationValidation");

const router = express.Router();

router.use(protect);

router.get("/me", getMyRegistrations);
router.post("/", createRegistrationValidation, validateRequest, createRegistration);
router.patch("/:id/cancel", registrationIdValidation, validateRequest, cancelRegistration);

module.exports = router;
