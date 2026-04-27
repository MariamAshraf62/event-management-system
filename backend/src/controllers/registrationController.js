const Event = require("../models/Event");
const Registration = require("../models/Registration");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const createRegistration = asyncHandler(async (req, res) => {
  const { event: eventId } = req.body;
  const userId = req.user._id;

  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, "Event not found");

  const existingRegistration = await Registration.findOne({
    user: userId,
    event: eventId,
    status: { $ne: "cancelled" },
  });
  if (existingRegistration) throw new ApiError(400, "You are already registered for this event");
  const existingRegistration2 = await Registration.findOne({
    user: userId,
    event: eventId,
    status: "cancelled"
  });
  if (existingRegistration2) {
    existingRegistration2.status = "confirmed";
    await existingRegistration2.save();

    return res.status(200).json({
      success: true,
      message: "Re-registered for event successfully",
      data: existingRegistration2,
    });
  }

  const confirmedCount = await Registration.countDocuments({
    event: eventId,
    status: { $in: ["confirmed", "pending"] },
  });

  if (confirmedCount >= event.capacity) {
    throw new ApiError(400, "Event capacity has been reached");
  }

  const registration = await Registration.create({
    user: userId,
    event: eventId,
    status: "confirmed",
  });

  return res.status(201).json({
    success: true,
    message: "Registered for event successfully",
    data: registration,
  });
});

const getMyRegistrations = asyncHandler(async (req, res) => {
  const registrations = await Registration.find({ user: req.user._id })
    .populate({
      path: "event",
      populate: { path: "category", select: "name" },
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations,
  });
});

const cancelRegistration = asyncHandler(async (req, res) => {
  const registration = await Registration.findById(req.params.id);
  if (!registration) throw new ApiError(404, "Registration not found");

  if (registration.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    throw new ApiError(403, "Not allowed to cancel this registration");
  }

  registration.status = "cancelled";
  await registration.save();

  return res.status(200).json({
    success: true,
    message: "Registration cancelled successfully",
    data: registration,
  });
});

module.exports = { createRegistration, getMyRegistrations, cancelRegistration };
