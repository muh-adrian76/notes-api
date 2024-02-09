const Joi = require('joi');

const collabsPayloadSchema = Joi.object({
  noteId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { collabsPayloadSchema };
