const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const  UserModel = require("../model/User");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('Public'))

mongoose.connect("mongodb://127.0.0.1:27017/imageUpload")

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'Public/Images' )
    },
    filename:(req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post ('/upload',upload.single('file'), (req, res) => {
    UserModel.create({image : req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

app.get ("/getImage", async (req, res) => {
    try{
        const users = await UserModel.find()
        res.json(users)
    }catch(error) {
        console.log(error);
        res.status(404).json({message: `Some error occured in fetching the data ${error}`})
    }
    
})

app.get("/", (req, res) => {
    console.log("hi")
    res.send("Connected to root path")
})

app.listen(3000, () => {
    console.log("Server running at port 3000");
})