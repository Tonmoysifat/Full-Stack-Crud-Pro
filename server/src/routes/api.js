const express = require("express")
const crudController = require("../controllers/crudController");
const userController = require("../controllers/userController");
const {verifyUser} = require("../middlewares/authMiddleware");
const {upload} = require("../backUtilities/multerConfig");
const router = express.Router()

router.post("/createUser",userController.createUser)
router.post("/verifyOtp",userController.verifyOtp)
router.post("/loginUser",userController.loginUser)
router.post("/passwordReset",userController.passwordReset)
router.post("/profileImage",verifyUser,upload,userController.profileImage)
router.get("/removeProfileImg",verifyUser,userController.removeProfileImg)
router.get("/readUser", verifyUser ,userController.readUser)
router.post("/updateUser",verifyUser , userController.updateUser)
router.post("/createSportsman",verifyUser , crudController.createSportsman)
router.get("/readSportsman",verifyUser , crudController.readSportsman)
router.get("/readBYId/:id",verifyUser, crudController.readBYId)
router.get("/deleteSportsman/:id", crudController.deleteSportsman)
router.post("/updateSportsman/:id", crudController.updateSportsman)

module.exports = router