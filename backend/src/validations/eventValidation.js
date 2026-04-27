const { body, param, query } = require("express-validator");

const objectIdMessage = (field) => `${field} must be a valid MongoDB ObjectId`;

const createEventValidation = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("date").isISO8601().withMessage("Date must be a valid ISO date"),
  body("location").trim().notEmpty().withMessage("Location is required"),
  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be an integer greater than 0"),
  body("category").isMongoId().withMessage(objectIdMessage("Category")),
];

const eventIdValidation = [
  param("id").isMongoId().withMessage(objectIdMessage("Event id")),
];

const eventListValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  query("category")
    .optional()
    .isMongoId()
    .withMessage(objectIdMessage("Category filter")),
];

module.exports = { createEventValidation, eventIdValidation, eventListValidation };
