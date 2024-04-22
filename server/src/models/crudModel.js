const mongoose = require("mongoose");
const SportsmanSchema = new mongoose.Schema(
    {
        "email": { type: String, require: true },
        "name": { "type": String, "require": true },
        "sport": { "type": String, "require": true },
        "nationality": { "type": String, "require": true },
        "age": { "type": String, "require": true },
    },
    { timestamps: true, versionKey: false }
);
const players = mongoose.model("players", SportsmanSchema);
module.exports = players;