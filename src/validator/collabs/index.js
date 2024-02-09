const { collabsPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const CollabsValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = collabsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollabsValidator;
