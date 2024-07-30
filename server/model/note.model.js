const db = require("../db.js");

class NoteModel {
  showDataModel = callBack => {
    const showData = "SELECT * FROM notes";
    db.query(showData, (err, result) => {
      callBack(err, result);
    });
  };

  showDataModelById = (id, callBack) => {
    const showData = "SELECT * FROM notes WHERE note_id = ?";
    db.query(showData, id, (err, result) => {
      callBack(err, result);
    });
  };

  updateDataModel = (id, note_title, note_body, note_date, callBack) => {
    const updateData =
      "UPDATE notes SET note_title = ?, note_body = ?, note_date = ? WHERE note_id = ?";
    db.query(
      updateData,
      [note_title, note_body, note_date, id],
      (err, result) => {
        callBack(err, result);
      },
    );
  };

  deleteDataModel = (id, callBack) => {
    const deleteData = "DELETE FROM notes WHERE note_id = ?";
    db.query(deleteData, id, (err, result) => {
      callBack(err, result);
    });
  };
}

module.exports = new NoteModel();
