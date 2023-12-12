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
  upload.array('files', 5)(req, res, (error) => {
    if (error) return res.status(400).json({ error: error.message });

    // Retrieve uploaded files
    const files = req.files;
    const errors = [];

    // Validate file types and sizes
    files.forEach((file) => {
      // Set type and size rules
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'audio/mpeg', 'font/ttf', 'application/pdf', 'video/mp4', 'text/plain'];
      const maxSize = 10 * 1024 * 1024; // 10 MB

      console.log(`${file.originalname}: ${file.mimetype}`);

      // Handle errors using if statements for better readability
      if (!allowedTypes.includes(file.mimetype)) {
        errors.push(`Invalid file type: ${file.originalname}`);
      }

      if (file.size > maxSize) {
        errors.push(`File too large: ${file.originalname}`);
      }
    });

    // Remove uploaded files if there are any errors
    if (errors.length > 0) {
      files.forEach(file => fs.unlinkSync(file.path));
      return res.status(400).json({ errors });
    }

    // Attach files to the request object
    req.files = files;
    next();
  });
};

module.exports = multerMiddleware;
