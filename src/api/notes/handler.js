class NotesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postNoteHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    // authorization
    const { id: credentialId } = request.auth.credentials;

    const noteId = await this._service.addNote({
      title, body, tags, owner: credentialId,
    });

    return h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: { noteId },
    }).code(201);
  }

  async getNotesHandler(request, h) {
    // authorization
    const { id: credentialId } = request.auth.credentials;

    const notes = await this._service.getNotes(credentialId);
    return h.response({
      status: 'success',
      data: { notes },
    });
  }

  async getNoteByIdHandler(request, h) {
    const { id } = request.params; // ambil nilai id dari path parameter

    // authorization
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteAccess(id, credentialId);

    // masukkan ke var baru menggunakan NotesService
    const note = await this._service.getNoteById(id);
    return h.response({
      status: 'success',
      data: { note },
    });
  }

  async putNoteByIdHandler(request, h) {
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;

    // authorization
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteAccess(id, credentialId);

    await this._service.editNoteById(id, request.payload);
    return h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
  }

  async deleteNoteByIdHandler(request, h) {
    const { id } = request.params;

    // authorization
    const { id: credentialId } = request.auth.credentials;
    await this._service.verifyNoteOwner(id, credentialId);

    await this._service.deleteNoteById(id);
    return h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
  }
}

module.exports = NotesHandler;
