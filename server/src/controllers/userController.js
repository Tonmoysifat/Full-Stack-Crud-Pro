const users = require("../models/userModel");
const otpNumbers = require("../models/otpModel");
const sendEmailUtility = require("../backUtilities/sendEmailUtility");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    try {
        let userData = req.body
        await otpNumbers.deleteOne({email: userData["email"]})
        let OTP = Math.floor(100000 + Math.random() * 900000);
        await sendEmailUtility(
            userData["email"],
            `Your PIN: ${OTP}`,
            "Full-stack-crud-pro"
        )
        await otpNumbers.create({email: userData["email"], otp: OTP, status: "active"});
        res.status(200).json({
            status: "success",
            email: userData["email"],
            firstname: userData["firstname"],
            lastname: userData["lastname"],
            mobile: userData["mobile"],
            password: userData["password"],
            message: "Verification code has been sent to your email",
        });

    } catch (e) {
        res.json({status: "fail", message: e});
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        // const email = req.headers["email"];
        // const firstname = req.headers["firstname"];
        // const lastname = req.headers["lastname"];
        // const mobile = req.headers["mobile"];
        // const password = req.headers["password"];
        let userMData = req.body
        // let userMData = {
        //     email:email,
        //     firstname:firstname,
        //     lastname:lastname,
        //     mobile:mobile,
        //     password:password
        // }
        // const otp = req.body["otp"];
        let user = await otpNumbers.find({
            email: userMData["email"],
            otp: userMData["otp"],
            status: "active",
        });
        if (user.length > 0) {
            await users.create(userMData)
            let payLoad = {
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                data: userMData["email"],
            };
            let token = jwt.sign(payLoad, "SecretKey123")
            res.json({
                status: "success",
                message: "OTP Verification success & Registration Completed",
                token: token,
            });
            await otpNumbers.deleteOne({email: userMData["email"], otp: userMData["otp"]});
        } else {
            res.status(404).json({status: "fail", data: "Wrong OTP"});
        }
    } catch (error) {
        res.json({status: "fail", data: error});
    }
};


exports.readUser = async (req, res) => {
    try {
        let email = req.headers["email"];
        let data = await users.aggregate([
            {
                $match: {email: email},
            },
            {
                $project: {
                    _id: 0,
                    createdAt: 0,
                    updatedAt: 0,
                    password: 0,
                },
            },
        ]);
        res.json({status: "success", UserInformation: data});
    } catch (error) {
        res.json({status: "fail", data: error});
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
            let payLoad = {
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
                data: userData["email"],
            };
            let token = jwt.sign(payLoad, "SecretKey123");
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

exports.verifyOtpForPass = async (req, res) => {
    try {
        const email = req.body["email"];
        const otp = req.body["otp"];
        let user = await otpNumbers.find({
            email: email,
            otp: otp,
            status: "active",
        });
        if (user.length > 0) {
            await otpNumbers.updateOne(
                { email: email, otp: otp },
                { status: "verified" }
            );
            res.status(200).json({
                status: "success",
                message: "OTP Verification success",
                otp: otp,
            });
        } else {
            res.status(404).json({ status: "fail", data: "No user" });
        }
    } catch (error) {
        res.json({ status: "fail", data: error });
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
                status: "verified",
            });
            if (user.length > 0) {
                await otpNumbers.deleteOne({email: email, otp: otp});
                await users.updateOne({email: email}, {password: confirmPass});
                res.status(200).json({
                    status: "success",
                    message: "Password reset successfully done",
                });
            } else {
                res.status(404).json({status: "fail", data: "No user"});
            }

        } else {
            res.status(404).json({
                status: "fail",
                data: "Please new password and confirm password should be equal",
            });
        }
    } catch (error) {
        res.json({status: "fail", data: error});
    }
};

exports.updateUser = async (req, res) => {
    try {
        let email = req.headers["email"];
        let updatedData = req.body;
        await users.updateOne({ email: email }, updatedData);
        res.json({ status: "success", message: "Successfully updated" });
    } catch (error) {
        res.json({ status: "fail", data: error });
    }
};