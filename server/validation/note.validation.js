const Joi = require("joi");

class NoteValidation {
  insertDataValidation = (note_title, note_body, note_date) => {
    const schema = Joi.object({
      note_title: Joi.string().required(),
      note_body: Joi.string().required(),
      note_date: Joi.date().required(),
    });
    return schema.validate({ note_title, note_body, note_date });
  };

  updateDataValidation = (note_title, note_body, note_date) => {
    const schema = Joi.object({
      note_title: Joi.string().required(),
      note_body: Joi.string().required(),
      note_date: Joi.date().required(),
    });
    return schema.validate({ note_title, note_body, note_date });
  };
}

module.exports = new NoteValidation();
