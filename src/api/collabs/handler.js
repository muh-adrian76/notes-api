class CollabsHandler {
  constructor(collabsService, notesService, validator) {
    this._collabsService = collabsService;
    this._notesService = notesService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    // authorization
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;
    await this._notesService.verifyNoteOwner(noteId, credentialId);
    const collaborationId = await this._collabsService.addCollaboration(noteId, userId);

    return h.response({
      status: 'success',
      message: 'Kolaborasi berhasil ditambahkan',
      data: { collaborationId },
    }).code(201);
  }

  async deleteCollaborationHandler(request, h) {
    this._validator.validateCollaborationPayload(request.payload);

    // authorization
    const { id: credentialId } = request.auth.credentials;
    const { noteId, userId } = request.payload;
    await this._notesService.verifyNoteOwner(noteId, credentialId);
    await this._collabsService.deleteCollaboration(noteId, userId);

    return h.response({
      status: 'success',
      message: 'Kolaborasi berhasil dihapus',
    });
  }
}

module.exports = CollabsHandler;
