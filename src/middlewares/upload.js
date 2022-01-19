/** @format */

const multer = require("multer");
const path = require("path");
const { nextTick } = require("process");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/submissions"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "file/zip" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limit: {
    fileSize: 1024 * 1024 * 5,
  },
});

const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadItem = upload.single(fieldName);
    uploadItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res.status(400).send({ message: err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(400).send({ message: err.message });
      }
      next();
    });
  };
};

module.exports = { uploadSingle };
