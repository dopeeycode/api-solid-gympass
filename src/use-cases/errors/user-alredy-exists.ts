export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Already exists a user with this email.')
  }
}
