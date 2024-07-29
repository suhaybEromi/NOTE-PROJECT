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

  // insertDataModel = (
  //   note_title,
  //   note_body,
  //   note_date,
  //   note_image,
  //   callBack,
  // ) => {
  //   const insertData =
  //     "INSERT INTO notes (note_title, note_body, note_date,note_image) VALUES (?, ?, ?, ?)";
  //   db.query(
  //     insertData,
  //     [note_title, note_body, note_date, note_image],
  //     (err, result) => {
  //       callBack(err, result);
  //     },
  //   );
  // };

  updateDataModel = (
    id,
    note_title,
    note_body,
    note_date,
    note_image,
    callBack,
  ) => {
    const updateData =
      "UPDATE notes SET note_title = ?, note_body = ?, note_date = ?, note_image = ? WHERE note_id = ?";
    db.query(
      updateData,
      [note_title, note_body, note_date, note_image, id],
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
