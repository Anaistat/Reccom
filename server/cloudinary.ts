import cloudinaryv2 from 'cloudinary'
import dotenv from 'dotenv'
const { CloudinaryStorage } = require('multer-storage-cloudinary');
import multer from "multer";
dotenv.config()

const cloudinary = cloudinaryv2.v2

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
	cloudinary,
	allowedFormats: ['jpg', 'png'],
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});
const uploadCloud = multer({ storage });

export default uploadCloud