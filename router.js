import Vue from 'vue';
import VueRouter from 'vue-router';
// import Login from 'components/views/login/login';
import Layout from 'components/layout/layout';
Vue.use(VueRouter);
export const constantRoutes = [{
    path: '/',
    redirect: '/login',
    hidden: true,
    noCache: true
  },
  {
    path: '/404',
    name: 'error404',
    component: () => import('@/components/views/error/404'),
    hidden: true,
    noCache: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/views/login')
  },
  {
    path: '/page',
    component: Layout,
    name: 'Layout',
    children: [{
      path: 'home',
      component: () => import('@/components/views/home'),
      name: 'home',
      meta: {
        title: '首页',
        icon: 'chart'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    noCache: true
  }
];
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}
export default router;