const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const routes = require("./routes/note.routes.js");
const db = require("./db.js");
app.use("/", routes);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads") == false) {
      fs.mkdirSync("./uploads");
    }
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const fileName = Date.now() + "." + ext;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

app.post("/post", upload.single("file"), (req, res) => {
  const insertData =
    "INSERT INTO notes (note_title, note_body, note_date, note_image) VALUES (?,?,?,?)";
  const { note_title, note_body, note_date } = req.body;
  const note_image = req.file.filename;
  db.query(
    insertData,
    [note_title, note_body, note_date, note_image],
    (err, result) => {
      if (err) return res.status(500).send(err.message);
      return res.status(201).send(result);
    },
  );
});
app.use("/uploads", express.static("uploads"));

app.get("/image/:name", (req, res) => {
  const width = req.query.w ? parseInt(req.query.w) : null;
  const height = req.query.h ? parseInt(req.query.h) : null;
  const quality = req.query.q ? parseInt(req.query.q) : 100;
  const fileName = req.params.name;
  const filePath = path.join(__dirname, "./uploads", fileName);

  try {
    Jimp.read(filePath)
      .then(image => {
        if (width && height) {
          image.resize(width, height);
        } else if (width && !height) {
          image.resize(width, Jimp.AUTO);
        } else if (!width && height) {
          image.resize(Jimp.AUTO, height);
        }

        image.quality(quality);

        image.getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          res.set("Content-Type", Jimp.MIME_JPEG);
          res.send(buffer);
        });
      })
      .catch(err => console.log(err.message));
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => console.log("Running"));
