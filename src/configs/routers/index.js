export const routersNotAuth = [
  {
    exact: true,
    path: '/login',
    component: 'login'
  }
]

export const routersAuth = [
  {
    exact: true,
    path: '/home',
    component: 'home',
    root: true
  },
  {
    exact: true,
    path: '/userManage',
    component: 'user',
    name: 'Quản lý người dùng'
  }
]

export const menuRoutes = [
  {
    name: 'User',
    dest: '/userManage',
    icon: 'user',
    requiredRoles: []
  }
]
