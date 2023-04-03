const multer = require('multer');
const path = require('path');

//storage engine
export const storage = multer.diskStorage({
  destination: '../Ticket_Management_System/upload/file',
  filename: (req, file, callback) => {      
    return callback(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`);    //callback has two params one is error i.e null and second is result
  }
});

export const upload = multer({
  storage: storage,
  limits:{fieldSize:100}
});


