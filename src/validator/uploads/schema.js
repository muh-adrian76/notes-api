const Joi = require('joi');

const ImageHeaderSchema = Joi.object({
  'content-type': Joi.string().valid('image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/webp').required(),
}).unknown();

/* objek dapat memiliki properti apa pun selama terdapat properti content-type
karena properti tersebut ditandai dengan required */

module.exports = { ImageHeaderSchema };
