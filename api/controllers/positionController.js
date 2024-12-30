const asyncHandler = require("express-async-handler");
const { fileReader, addPosition, updatePosition, deletePosition, updateApplications } = require("../helpers/utils");

exports.openPositions = asyncHandler(async (req, res) => {
  const data = await fileReader("positions");
  return res.status(200).json({ data: data });
});

exports.openPositionDetail = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const data = await fileReader("positions");
  const position = data.openPositions.find((item) => item.id === Number(id));
  if(!position){
    return res.status(404).json({ error: true, message: "Resource not found."})
  }
  return res.status(200).json({ position });
});

exports.openPositionPaginated = asyncHandler( async(req, res) => {
    const { page, limit } = req.query
    const data = await fileReader('positions');
    const positions = data.openPositions;
    const totalPages = positions.length !== 0 ? Math.ceil((positions.length / limit)) : null;

    if(!totalPages){
      res.status(404)
      throw new Error("Data not found");
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + Number(limit);
    const paginatedPositions = positions.slice(startIndex, endIndex);

    return res.status(200).json({
      currentPage: page,
      totalPages,
      paginatedPositions
    })
})

exports.updatePosition = asyncHandler( async(req, res) => {
  const { id, title, summary, division, location, requirements, responsibilities, image } = req.body;
  const updatedPosition = { id: Number(id), title, summary, division, location, requirements, responsibilities, image};
  await updatePosition(Number(id), 'positions', updatedPosition)
  const info = await updateApplications('applications', updatedPosition, id);
  return res.status(200).json(info);
})

exports.deletePosition = asyncHandler( async(req, res) => {
  const { id } = req.params;
  console.log(id);
  await deletePosition("positions", id)
  return res.json({})
})

exports.addPosition = asyncHandler( async(req, res) => {
  const { title, summary, division, location, requirements, responsibilities } = req.body;
  const image = JSON.parse(req.body.image);
  const position = { title, summary, division, location, requirements, responsibilities, image};
  await addPosition("positions", position)
  return res.status(200).json({
    error: false,
    message: "Position saved successfully",
    position,
  });
})