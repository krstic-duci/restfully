const multer = require('multer');

const storage = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, './uploads/');
  },
  filename (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    return cb(null, true);
  } else {
    return cb(new Error('Please check the mime type and file size for uploaded file'), false);
  }
};

const upload = multer({
  storage,
  limits: {fileSize: 1024 * 1024 * 2},
  fileFilter: fileFilter

});

module.exports = upload;
