
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user.vue') },
      { path: '/chat/:otherUserID', component: () => import('pages/chat.vue') },
      { path: '/auth', component: () => import('pages/auth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
