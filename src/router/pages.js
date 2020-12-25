import About from 'views/About.vue'

export default [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/components/Layout/index'),
    children: [
      {
        path: '/music',
        name: 'Music',
        component: () => import('@/views/Music.vue')
      }, {
        path: '/about',
        name: 'About',
        component: About
      }
    ]
  },
  {
    path: '/tray',
    name: 'Tray',
    component: () => import('@/views/Tray.vue')
  },
  {
    path: '/desktopNotice',
    name: 'DesktopNotice',
    component: () => import('@/views/DesktopNotice.vue')
  }
]
