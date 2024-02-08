class AuthsHandler {
  constructor(authService, userService, tokenManager, validator) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;
  }

  async postAuthHandler(request, h) {
    this._validator.validatePostAuthPayload(request.payload);

    const { username, password } = request.payload;
    const id = await this._userService.verifyUserCredential(username, password);
    const accessToken = this._tokenManager.generateAccessToken({ id });
    const refreshToken = this._tokenManager.generateRefreshToken({ id });

    await this._authService.addRefreshToken(refreshToken);

    return h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    }).code(201);
  }

  async putAuthHandler(request, h) {
    this._validator.validatePutAuthPayload(request.payload);

    const { refreshToken } = request.payload;
    await this._authService.verifyRefreshToken(refreshToken);
    const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

    // Setelah refreshToken lolos dari verifikasi database dan signature
    const accessToken = this._tokenManager.generateAccessToken({ id });

    return h.response({
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: { accessToken },
    });
  }

  async deleteAuthHandler(request, h) {
    this._validator.validateDeleteAuthPayload(request.payload);

    const { refreshToken } = request.payload;
    // cek token apakah valid (ada dalam database)
    await this._authService.verifyRefreshToken(refreshToken);

    await this._authService.deleteRefreshToken(refreshToken);
    return h.response({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  }
}

module.exports = AuthsHandler;
