import { Auth } from './auth'

class Store {
  constructor () {
    this.Auth = new Auth(this)
  }
}

export { Store }
