
const multer = require("multer");
const storage = multer.diskStorage({});
exports.upload = multer({ storage: storage, limits: {fileSize: 500000000} }).single("file");