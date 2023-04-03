import HttpStatus from 'http-status-codes'

//Check the user is a admin or not
export const adminCheck = async(req,res,next) => {

  if (req.body.role === 'Admin') {   
    next()
  } else {
    res.status(HttpStatus.UNAUTHORIZED).json({
      code: HttpStatus.UNAUTHORIZED,
      message: 'Not an authorized person'
    });
  }
};
