const jwt = require("jsonwebtoken");

exports.verifyUser = (req, res, next) => {
    let token = req.headers["token"];
    jwt.verify(token, "SecretKey123", (err, decodedData) => {
        if (err) {
            res.status(401).json({ status: "unauthorized", data: err });
        } else {
            let email = decodedData["data"];
            let user_id = decodedData["user_id"]
            req.headers.email = email;
            req.headers.user_id = user_id
            next();
        }
    });
};