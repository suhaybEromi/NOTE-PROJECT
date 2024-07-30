const express = require("express");
const app = express();
const controller = require("../controller/note.controller.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static("uploads"));

app.get("/get", controller.showDataController());
app.get("/get/:id", controller.showDataControllerById());
app.put(
  "/update/:id",
  upload.single("note_image"),
  controller.updateDataController(),
);
app.delete("/delete/:id", controller.deleteDataController());

module.exports = app;
