export const routersNotAuth = [
  {
    exact: true,
    path: '/login',
    component: 'login'
  },
  {
    exact: true,
    path: '/map',
    component: 'map'
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
    name: 'Maps',
    dest: '/map',
    icon: 'user',
    requiredRoles: ['USER'] // code in role colection
  },
  {
    name: 'User',
    dest: '/userManage',
    icon: 'user',
    requiredRoles: ['ADMIN', 'SUPERADMIN']
  }

]
