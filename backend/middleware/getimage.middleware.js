const multer = require("multer");
//
const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
//
const upload = multer({ storage: filestorage });

module.exports =  upload ;
