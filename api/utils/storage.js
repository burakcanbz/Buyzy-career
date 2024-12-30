const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const { folder }  = req.query;
      if (folder === "client") {
        return cb(null, `./${folder}/public/images`)
      }
      return cb(null, "./api/public/images")
    },
    filename: function (req, file, cb) {
      return cb(null, `${file.originalname}`)
    }
  })
  
exports.upload = multer({storage,  limits: { fileSize: 1000 * 1024 * 1024 }})
