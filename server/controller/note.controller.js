const model = require("../model/note.model.js");
const validation = require("../validation/note.validation.js");

class NoteController {
  showDataController = () => {
    return (req, res) => {
      try {
        model.showDataModel((err, result) => {
          if (err) {
            return res.status(500).send(err.message);
          } else {
            return res.status(200).send(result);
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    };
  };

  showDataControllerById = () => {
    return (req, res) => {
      const id = req.params.id;
      try {
        model.showDataModelById(id, (err, result) => {
          if (err) {
            return res.status(500).send(err.message);
          }
          if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Id is Not Found" });
          } else {
            return res.status(200).send(result);
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    };
  };

  updateDataController = () => {
    return (req, res) => {
      const id = req.params.id;
      const { note_title, note_body, note_date } = req.body;

      if (
        validation.updateDataValidation(note_title, note_body, note_date).error
      ) {
        res.send(
          validation.updateDataValidation(note_title, note_body, note_date)
            .error.details[0].message,
        );
      } else {
        try {
          model.updateDataModel(
            id,
            note_title,
            note_body,
            note_date,
            (err, result) => {
              if (err) {
                return res.status(500).send(err.message);
              } else if (result.affectedRows === 0) {
                return res.status(404).send({ message: "ID is Not found" });
              } else {
                return res
                  .status(200)
                  .send({ message: "Update Data Successfully" });
              }
            },
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    };
  };

  deleteDataController = () => {
    return (req, res) => {
      const id = req.params.id;
      try {
        model.deleteDataModel(id, (err, result) => {
          if (err) {
            return res.status(500).send(err.message);
          }
          if (result.affectedRows === 0) {
            return res.status(404).send({ message: "ID is Not Found" });
          } else {
            return res
              .status(200)
              .send({ message: "Delete Data Successfully" });
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    };
  };
}

module.exports = new NoteController();
