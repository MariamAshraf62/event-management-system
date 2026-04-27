const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/auth");
const validateRequest = require("../middleware/validateRequest");
const {
  createEventValidation,
  eventIdValidation,
  eventListValidation,
} = require("../validations/eventValidation");

const router = express.Router();

router.get("/", eventListValidation, validateRequest, getEvents);
router.get("/:id", eventIdValidation, validateRequest, getEventById);
router.post("/", protect, createEventValidation, validateRequest, createEvent);
router.put("/:id", protect, eventIdValidation, createEventValidation, validateRequest, updateEvent);
router.delete("/:id", protect, eventIdValidation, validateRequest, deleteEvent);

module.exports = router;
