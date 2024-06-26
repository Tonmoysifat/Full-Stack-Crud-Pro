const users = require("../models/userModel");
const otpNumbers = require("../models/otpModel");
const sendEmailUtility = require("../backUtilities/sendEmailUtility");

const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const proImgs = require("../models/profileImgModel");
const uploadResult = require("../backUtilities/cloudin");
const ObjectId = mongoose.Types.ObjectId;

exports.createUser = async (req, res) => {
    try {
        let userData = req.body
        // let target = userData["target"] ? "forgetPassword" : "Registration"
        await otpNumbers.deleteOne({email: userData["email"]})
        let OTP = Math.floor(100000 + Math.random() * 900000);
        await sendEmailUtility(
            userData["email"],
            `Your PIN: ${OTP}`,
            "Full-stack-crud-pro"
        )
        await otpNumbers.create({email: userData["email"], otp: OTP, status: userData["target"]});
        res.status(200).json({
            status: "success",
            email: userData["email"],
            firstname: userData["firstname"],
            lastname: userData["lastname"],
            mobile: userData["mobile"],
            password: userData["password"],
            target: userData["target"],
            message: "Verification code has been sent to your email",
        });

    } catch (e) {
        res.json({status: "fail", message: e});
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let userData = req.body
        let target = userData["target"] === "forgetPassword" ? "forgetPassword" : "Registration"
        let user = await otpNumbers.find({
            email: userData["email"],
            otp: userData["otp"],
            status: target,
        });
        if (user.length > 0) {
            if (user[0]["status"] === "Registration") {
                let data = {
                    email: userData["email"],
                    firstname: userData["firstname"],
                    lastname: userData["lastname"],
                    mobile: userData["mobile"],
                    password: userData["password"],
                }
                await users.create(data)
                let user_id = await users.find({email: userData["email"], password: userData["password"]}).select("_id")
                let EXPIRE = {expiresIn: '24h'};
                let payLoad = {email: userData["email"], user_id: user_id[0]["_id"]};
                let token = jwt.sign(payLoad, "SecretKey123", EXPIRE)
                res.json({
                    status: "success",
                    message: "OTP Verification success & Registration Completed",
                    token: token,
                });
                await otpNumbers.deleteOne({email: userData["email"], otp: userData["otp"], status: target});
            } else {
                res.status(200).json({
                    status: "success",
                    message: "OTP Verification success",
                    otp: userData["otp"]
                });
            }
        } else {
            res.status(404).json({status: "fail", data: "Wrong OTP"});
        }
    } catch (error) {
        res.json({status: "fail", data: error});
    }
};

exports.profileImage = async (req, res) => {
    try {
        let userID = req.headers.user_id;
        // let email = req.headers.email;
        const img = await uploadResult(req.file.path)
        let data = {
            userID:userID,
            profilePicUrl: img.secure_url,
        }
        await proImgs.updateOne({userID: userID}, {$set: data}, {upsert: true})
        res.json({status: "success", message: "Successfully Added Profile Images"});
    } catch (error) {
        res.json({status: "fail", message: error});
    }
}

exports.removeProfileImg = async (req,res)=>{
    try{
        let userID = req.headers.user_id;
        await proImgs.deleteOne({userID:userID})
        res.json({status: "success", message: "Profile Image Removed"});
    }
    catch (error) {
        res.json({status: "fail", message: error});
    }
}

exports.readUser = async (req, res) => {
    try {
        let userID = new ObjectId(req.headers.user_id);

        let matchStage = { $match: { _id: userID } };

        let conditionalLookupStage = {
            $lookup: {
                from: "proimgs",
                let: { userId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$userID", "$$userId"] }
                        }
                    }
                ],
                as: "proImg"
            }
        };

        let joinWithProfileImgStage = {
            $addFields: {
                proImg: {
                    $cond: { if: { $ne: [{ $size: "$proImg" }, 0] }, then: { $arrayElemAt: ["$proImg", 0] }, else: null }
                }
            }
        };

        let ProjectionStage = {
            $project: {
                "_id": 0,
                "createdAt": 0,
                "updatedAt": 0,
                "password": 0,
                "proImg._id": 0,
                "proImg.userID": 0,
                "proImg.createdAt": 0,
                "proImg.updatedAt": 0
            }
        };

        let data = await users.aggregate([
            matchStage,
            conditionalLookupStage,
            joinWithProfileImgStage,
            ProjectionStage
        ]);

        res.json({ status: "success", UserInformation: data });
    } catch (error) {
        res.json({ status: "fail", data: error });
    }
};


exports.loginUser = async (req, res) => {
    try {
        let userData = req.body;
        let user = await users.find({
            email: userData["email"],
            password: userData["password"],
        });
        if (user.length > 0) {
            let user_id = await users.find({email: userData["email"], password: userData["password"]}).select("_id")
            let EXPIRE = {expiresIn: '24h'};
            let payLoad = {email: userData["email"], user_id: user_id[0]["_id"]};
            let token = jwt.sign(payLoad, "SecretKey123", EXPIRE)
            // let payLoad = {
            //     exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            //     data: userData["email"],
            // };
            // let token = jwt.sign(payLoad, "SecretKey123");
            res.status(200).json({
                status: "success",
                message: "Logged In Successfully",
                token: token
            });
        } else {
            res.status(200).json({status: "fail", message: "Wrong Password or Email"});
        }
    } catch (error) {
        res.status(404).json({status: "fail", message: error});
    }
};


exports.passwordReset = async (req, res) => {
    try {
        const email = req.body["email"];
        const otp = req.body["otp"];
        const newPass = req.body["NewPassword"];
        const confirmPass = req.body["ConfirmPassword"];
        if (newPass === confirmPass) {
            let user = await otpNumbers.find({
                email: email,
                otp: otp,
                status: "forgetPassword",
            });
            if (user.length > 0) {
                await otpNumbers.deleteOne({email: email, otp: otp, status: "forgetPassword"});
                await users.updateOne({email: email}, {password: confirmPass});
                res.status(200).json({
                    status: "success",
                    message: "Password reset successfully done",
                });
            } else {
                res.status(404).json({status: "fail", data: "No user"});
            }

        } else {
            res.status(200).json({
                status: "fail",
                message: "New password and Confirm password should be equal",
            });
        }
    } catch (error) {
        res.json({status: "fail", data: error});
    }
};

exports.updateUser = async (req, res) => {
    try {
        // let email = req.headers["email"];
        let userID = new ObjectId(req.headers.user_id);
        let updatedData = req.body;
        await users.updateOne({_id: userID}, updatedData);
        res.json({status: "success", message: "Successfully updated"});
    } catch (error) {
        res.json({status: "fail", data: error});
    }
};