export class AuthKeyNotFoundError extends Error {
  name = 'LcuUnauthorizedError'
  constructor() {
    super()
    this.message = 'No auth key was found'
  }
}
