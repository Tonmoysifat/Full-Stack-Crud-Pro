const players = require("../models/crudModel");
const users = require("../models/userModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
exports.createSportsman = async (req, res) => {
    try {
        // let email = req.headers["email"];
        let userID = req.headers.user_id;
        let playerData = req.body;
        playerData.userID = userID;
        await players.create(playerData);
        res.json({status: "success", message: "Created data successfully"});
    } catch (error) {
        res.json({status: "fail", message: error});
    }
}
exports.readSportsman = async (req, res) => {
    try {
        // let email = req.headers["email"];
        let userID = new ObjectId(req.headers.user_id);
        let data = await players.aggregate([
            {
                $match: {userID: userID},
            },
            {
                $project: {
                    // email: 0,
                    createdAt: 0,
                    updatedAt: 0
                },
            },
        ]);
        res.json({status: "success", playerData: data});
    } catch (error) {
        res.json({status: "Fail", data: error});
    }
}
exports.readBYId = async (req,res)=>{
    try {
        // let email = req.headers["email"];
        let userID = new ObjectId(req.headers.user_id);
        let {id}=req.params
        const data = await players.find(
            { _id: id, userID: userID },
            {  createdAt: 0, updatedAt: 0 }
        );

        res.json({status: "success", playerData: data});
    } catch (e) {
        res.json({status: "Fail", data: e});
    }
}
exports.updateSportsman = async (req, res) => {
    try {
        let {id}=req.params
        let updatedData = req.body;
        await players.updateOne({ _id:id }, updatedData);
        res.json({ status: "success", message: "Successfully updated" });
    } catch (error) {
        res.json({ status: "fail", data: error });
    }
}
exports.deleteSportsman = async (req, res) => {
    try{
        let {id}=req.params
        await players.deleteOne({_id:id});
        return res.json({status:"success",message:"Request Completed"});
    }catch (e) {
        return res.json({err:e.toString()})
    }
}