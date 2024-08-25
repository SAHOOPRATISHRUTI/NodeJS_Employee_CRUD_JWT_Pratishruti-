const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const authMiddleware = require('../middleWare/authMiddleware');
const validator = require('../validators/employeeValidator');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//-----------------routers-------------------------
/* CREATE EMPLOYEE  */
router.post("/createEmployee",
  upload.single('profileImage'), 
  validator.createEmployeeValidator,
  employeeController.createEmployee
);

/* VIEW SINGLE EMPLOYEE  */
router.get("/viewEmployee/:id", 
  validator.viewSingleEmployeeValidator, 
  authMiddleware.verifyUserToken,
  employeeController.viewSinglEmployee
);

/* EDIT EMPLOYEE  */
router.put("/editEmployee/:id", 
  validator.editEmployeeValidator,
  authMiddleware.verifyUserToken, 
  employeeController.editEmployee
);

/* DELETE EMPLOYEE  */
router.delete("/deleteEmployee/:id", 
  validator.deleteEmployeeValidator,
  authMiddleware.verifyUserToken, 
  employeeController.deleteEmployee
);

/* VIEW EMPLOYEE  */
router.post("/listEmployee", 
  validator.listEmployesValidator,
  authMiddleware.verifyUserToken, 
  employeeController.listEmployee
);

module.exports = router;
