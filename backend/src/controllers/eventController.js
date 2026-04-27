const Category = require("../models/Category");
const Event = require("../models/Event");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const { buildPagination, buildPaginationMeta } = require("../utils/pagination");

const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, capacity, category } = req.body;

  const categoryExists = await Category.findById(category);
  if (!categoryExists) throw new ApiError(404, "Category not found");

  const event = await Event.create({
    title,
    description,
    date,
    location,
    capacity,
    category,
    createdBy: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Event created successfully",
    data: event,
  });
});

const getEvents = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query);
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const [events, total] = await Promise.all([
    Event.find(filter)
      .populate("category", "name")
      .populate("createdBy", "name email role")
      .sort({ date: 1 })
      .skip(skip)
      .limit(limit),
    Event.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    pagination: buildPaginationMeta({ page, limit, total }),
    data: events,
  });
});

const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)
    .populate("category", "name")
    .populate("createdBy", "name email role");

  if (!event) throw new ApiError(404, "Event not found");

  return res.status(200).json({
    success: true,
    data: event,
  });
});

const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, capacity, category } = req.body;
  const event = await Event.findById(req.params.id);

  if (!event) throw new ApiError(404, "Event not found");

  const isOwner = event.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not allowed to update this event");
  }

  const categoryExists = await Category.findById(category);
  if (!categoryExists) throw new ApiError(404, "Category not found");

  event.title = title;
  event.description = description;
  event.date = date;
  event.location = location;
  event.capacity = capacity;
  event.category = category;
  await event.save();

  return res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: event,
  });
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) throw new ApiError(404, "Event not found");

  const isOwner = event.createdBy.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "Not allowed to delete this event");
  }

  await event.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

module.exports = { createEvent, getEvents, getEventById, updateEvent, deleteEvent };
