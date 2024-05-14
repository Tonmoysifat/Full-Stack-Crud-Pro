const mongoose = require("mongoose");
const proImgSchema = new mongoose.Schema(
    {
        userID: {type: mongoose.Schema.Types.ObjectId, required: true},
        // email: { type: String, require: true },
        profilePicUrl: { type: String}
    },
    { timestamps: true, versionKey: false }
);
const proImgs = mongoose.model("proimgs", proImgSchema);
module.exports = proImgs;