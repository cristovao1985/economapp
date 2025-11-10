const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('src/pages/Index.vue') },
      { path: '/produtos', name: 'produtos', component: () => import('src/pages/Produtos.vue') },
      { path: '/nfe', name: 'nfe', component: () => import('pages/AdicionarNFE.vue') },
      { path: '/historico', name: 'historico', component: () => import('pages/Historico.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
