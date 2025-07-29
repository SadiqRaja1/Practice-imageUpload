const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

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

app.post ('/upload', (req, res) => {
    console.log("working")
    console.log(req.file)
})

app.get("/", (req, res) => {
    console.log("hi")
    res.send("Connected to root path")
})

app.listen(3000, () => {
    console.log("Server running at port 3000");
})