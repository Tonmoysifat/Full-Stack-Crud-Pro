const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, unique: true, require: true },
        firstname: { type: String, require: true },
        lastname: { type: String, require: true },
        mobile: { type: String, require: true },
        password: { type: String, require: true },
    },
    { timestamps: true, versionKey: false }
);
const users = mongoose.model("users", UserSchema);
module.exports = users;