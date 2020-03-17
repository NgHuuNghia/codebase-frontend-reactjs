import { action, observable } from 'mobx'

class Auth {
  @observable isAuth = !!window.localStorage.getItem('access-token')

  @action
  authenticate = (token) => {
    window.localStorage.setItem('access-token', token)
    this.isAuth = true
  }

  logout = () => {
    window.localStorage.removeItem('access-token')
    this.isAuth = false
  }
}

export { Auth }
