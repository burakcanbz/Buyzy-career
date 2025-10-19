const asyncHandler = require("express-async-handler");
const Position = require("../model/positionModel");
const { fileReader, addPosition, updatePosition, deletePosition, updateApplications } = require("../helpers/utils");

exports.openPositions = asyncHandler(async (req, res) => {
  const data = await Position.find();
  return res.status(200).json({ data: data });
});

exports.openPositionDetail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const position = await Position.findById(id);
  if(! position){
    return res.status(404).json({ error: true, message: "Resource not found."})
  }
  return res.status(200).json({ position });
});

exports.openPositionPaginated = asyncHandler( async(req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 18;
    const skip = (page - 1) * limit;
    const total = await Position.countDocuments();
    const paginatedPositions = await Position.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPages = Math.ceil(total / limit);

    if(total === 0){
      res.status(404)
      throw new Error("Data not found");
    }

    return res.status(200).json({
      currentPage: page,
      totalPages,
      paginatedPositions
    })
})

exports.updatePosition = asyncHandler( async(req, res) => {
  const { id, title, summary, division, location, requirements, responsibilities, image } = req.body;
  const updatedPosition = { id: Number(id), title, summary, division, location, requirements, responsibilities, image};
  await Position.findByIdAndUpdate(id, updatedPosition);
  return res.status(200).json({ success: true, message: "Applications successfully updated." });
})

exports.deletePosition = asyncHandler( async(req, res) => {
  const { id } = req.params;
  await Position.findByIdAndDelete(id);
  return res.json({})
})

exports.addPosition = asyncHandler( async(req, res) => {
  const { title, summary, division, location, requirements, responsibilities } = req.body;
  const image = JSON.parse(req.body.image);
  const position = { title, summary, division, location, requirements, responsibilities, image};
  await Position.create(position);
  return res.status(200).json({
    error: false,
    message: "Position saved successfully",
    position,
  });
})