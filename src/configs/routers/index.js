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
  {
    exact: true,
    path: '/shopManager',
    component: 'shop',
    name: 'Quản lý Cửa hàng'
  },
  {
    exact: true,
    path: '/menuManager',
    component: 'menu',
    name: 'Quản lý thực đơn'
  },
  {
    exact: true,
    path: '/roomchat',
    component: 'roomChat',
    name: 'Phòng chat'
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
  {
    name: 'Shop',
    dest: '/shopManager',
    icon: 'home',
    requiredRoles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'Menu',
    dest: '/menuManager',
    icon: 'menu',
    requiredRoles: ['SUPERADMIN', 'ADMIN']
  },
  {
    name: 'RoomChat',
    dest: '/roomchat',
    icon: 'message-square',
    requiredRoles: ['USER', 'SUPERADMIN', 'ADMIN']
  }

]
