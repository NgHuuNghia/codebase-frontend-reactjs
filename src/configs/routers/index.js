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
  },
  {
    exact: true,
    path: '/roleManage',
    component: 'role',
    name: 'Quản lý quyền'
  },
  {
    exact: true,
    path: '/nodeManager',
    component: 'node',
    name: 'Quản lý Nhánh'
  },
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
  },
  {
    name: 'Role',
    dest: '/roleManage',
    icon: 'shield',
    requiredRoles: ['SUPERADMIN']
  },
  {
    name: 'Node',
    dest: '/nodeManager',
    icon: 'map-pin',
    requiredRoles: ['SUPERADMIN']
  },

]
