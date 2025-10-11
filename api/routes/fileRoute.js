const express = require("express");
const path = require("path");
const fs = require("fs");
const { admin } = require("../middleware/authMiddleware");

const router = express.Router();
const directoryPath = path.join(__dirname, "../public", "files");

router.route("/").get(admin(['Owner']), async (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(directoryPath, fileName);
  try {
    const fileStream = fs.createReadStream(filePath);
    res.setHeader("Content-Disposition", `attachment; filename="${encodeURIComponent(fileName)}"`); 
    res.setHeader("Content-Type", "application/octet-stream");
    fileStream.pipe(res);
  } catch (err) {
    res.status(404).send("File not found");
  }
});

module.exports = { fileRoute: router };
