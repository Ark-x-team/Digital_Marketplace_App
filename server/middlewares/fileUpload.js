const multer = require('multer'); 
const fs = require('fs'); 
const path = require('path'); 

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage });

// Custom file upload middleware
const multerMiddleware = (req, res, next) => {

  // Use multer upload instance
  upload.single('file')(req, res, (error) => {
    if (error) return res.status(400).json({ error: error.message });

    // Retrieve uploaded file
    const file = req.file;
    
    // Validate file type and size
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Set type and size rules
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; 

    // Validate file type and size
    if (!allowedTypes.includes(file.mimetype) || file.size > maxSize) {
      // Handle errors
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: 'Invalid file type or size.' });
    }

    // Attach the file to the request object
    req.file = file;
    next();
  });
};

module.exports = multerMiddleware;
