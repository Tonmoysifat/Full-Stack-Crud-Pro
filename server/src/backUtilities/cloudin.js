let cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadResult = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath)
        return result
    } catch (e) {
    }
}
module.exports = uploadResult;

