const players = require("../models/crudModel");
const users = require("../models/userModel");
exports.createSportsman = async (req, res) => {
    try {
        let email = req.headers["email"];
        let playerData = req.body;
        playerData.email = email;
        await players.create(playerData);
        res.json({status: "success", message: "Created data successfully"});
    } catch (error) {
        res.json({status: "fail", message: error});
    }
}
exports.readSportsman = async (req, res) => {
    try {
        let email = req.headers["email"];
        let data = await players.aggregate([
            {
                $match: {email: email},
            },
            {
                $project: {
                    email: 0,
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
        let email = req.headers["email"];
        let {id}=req.params
        const data = await players.find(
            { _id: id, email: email }, // Query criteria
            { email: 0, createdAt: 0, updatedAt: 0 } // Projection fields
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