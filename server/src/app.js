const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Connected to the root path")
})

app.listen(3000, () => {
    console.log("Server running at port 3000");
}) 