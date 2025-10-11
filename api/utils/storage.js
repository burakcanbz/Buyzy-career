const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { folder } = req.query;
    let destPath;

    if (folder === "client") {
      destPath = path.join(__dirname, "../../client/public/images");
    } else {
      destPath = path.join(__dirname, "../public/files");
    }

    // Eğer klasör yoksa oluştur
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    cb(null, destPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

exports.upload = multer({
  storage,
  limits: { fileSize: 1000 * 1024 * 1024 }
});
