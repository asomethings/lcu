export class PortNotSpecified extends Error {
  name = 'PortNotSpecified'

  constructor() {
    super()
    this.message = 'Port must be an integer between 0-65535'
  }
}
