const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log('File received:', file); 
      cb(null, "./uploads/"); 

    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${Date.now()}${path.extname(file.originalname)}`); 
    }
});

const upload = multer({ storage: storage, });

module.exports ={ upload};
