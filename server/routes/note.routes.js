const express = require("express");
const app = express();
const controller = require("../controller/note.controller.js");

app.get("/get", controller.showDataController());
app.get("/get/:id", controller.showDataControllerById());
// app.post("/post", controller.insertDataController());
app.put("/update/:id", controller.updateDataController());
app.delete("/delete/:id", controller.deleteDataController());

module.exports = app;
