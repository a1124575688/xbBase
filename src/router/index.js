import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    // name: '停车资源态势',
    redirect: '/parkResource', //重定向到停车资源态势
    component: () => import('@/views/ParkResource.vue'),
    meta: {
      index: 0
    }
  },
  {
    path: '/parkResource',
    name: '停车资源态势',
    component: () => import('@/views/ParkResource.vue'),
    meta: {
      index: 0
    }
  },
  {
    path: '/parkTeZheng',
    name: '停车特征纵览',
    component: () => import('@/views/ParkTeZheng.vue'),
    meta: {
      index: 1
    }
  },
  {
    path: '/parkWenTi',
    name: '停车问题分析',
    component: () => import('@/views/ParkWenTi.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/parkWeiFa',
    name: '违法停车态势',
    component: () => import('@/views/ParkWeiFa.vue'),
    meta: {
      index: 3
    }
  },
  {
    path: '/parkJiaoTong',
    name: '公共交通态势',
    component: () => import('@/views/ParkJiaoTong.vue'),
    meta: {
      index: 4
    }
  }
];

const router = new VueRouter({
  routes,
});

export default router;
