const asyncHandler = require("express-async-handler");
const Application = require("../model/applicationModel");
const { filterApplications } = require("../helpers/utils");
const User = require("../model/userModel");
const Position = require("../model/positionModel");

exports.getApplications = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  const applications = await Application.find();
  const filteredApplications = filterApplications(applications, user?.division)
  return res.status(200).json({applications: filteredApplications });
});

exports.getApplicationByQuery = asyncHandler(async (req, res) => {
  const { filter, name } = req.query;
  const allApplications = await Application.find();

  if (filter === "id") {
    const applications = allApplications.filter(
      (item) => String(item.position._id) === name
    );
    return res.status(200).json({ applications });
  }

  const applications = allApplications.filter(
    (item) => item.position[filter] === name
  );
  return res.status(200).json({ applications });
});

exports.getApplicationDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const allApplications = await Application.find();
  const applicationDetail = allApplications.find(
    (item) => String(item._id) === id
  );
  if (!applicationDetail) {
    res.status(500);
    throw new Error("There is no application with that id");
  }
  return res.status(200).json({ applicationDetail });
});

exports.addApplicationForm = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      location,
      company,
      message,
      hireStatus,
      position,
      files,
      links,
    } = req.body;
    const parsedPosition = JSON.parse(position);
    const parsedFiles = files ? JSON.parse(files) : [];
    const parsedLinks = links ? JSON.parse(links) : [];
    const appPosition = await Position.findById(parsedPosition._id);
    if (!appPosition) {
      res.status(404);
      throw new Error("Position not found");
    }

    const existingApp = await Application.findOne({
      email,
    });

    if (existingApp) {
      res.status(400);
      throw new Error("Application already exists for this position.");
    }

    const newApp = await Application.create({
      name,
      email,
      phone,
      location,
      company,
      message,
      hireStatus,
      files: parsedFiles,
      links: parsedLinks,
      position: parsedPosition,
    });

    return res.status(201).json({
      error: false,
      message: "Application saved successfully",
      application: newApp,
    });
  } catch (err) {
    console.error("Add application error:", err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

exports.updateHireStatus = asyncHandler(async (req, res) => {
  const { message, id } = req.body;
  const app = await Application.findById(id);
  if (!app) {
    res.status(404);
    throw new Error("Application not found");
  }
  app.hireStatus = message;
  await app.save();
  return res.json({
    error: false,
    message: "Hire status updated successfully",
    app,
  });
});
