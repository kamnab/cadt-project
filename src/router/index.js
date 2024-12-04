import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassActivity from '@/views/classItem/ClassActivity.vue'
import ClassContentAndMaterials from '@/views/classItem/ClassContentAndMaterials.vue'
import TenantActivity from '@/views/tenantItem/TenantActivity.vue'
import LoginCallback from '@/components/auth/Callback.vue'
import NewTenant from '@/views/tenants/CreateView.vue'
import EditTenant from '@/views/tenants/EditView.vue'

import NotFound from '@/components/NotFound.vue'
import { loggedInUser } from '@/services/authService'

const requiredAuthentication = async (to, from, next) => {
  try {
    const user = await loggedInUser(); // Await the result from loggedInUser()
    if (user) {
      next(); // Proceed to the route if authenticated
    } else {
      next({ name: 'home' }); // Redirect to home if not authenticated
    }
  } catch (error) {
    console.error('Error during authentication check:', error);
    next({ name: 'home' }); // Handle error by redirecting to home or a fallback route
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/lessons/:id/',
      name: 'class-content',
      component: ClassContentAndMaterials
    },
    {
      path: '/lessons/:id/activities',
      name: 'class-activity',
      component: ClassActivity
    },
    {
      path: '/callback',
      name: 'login-callback',
      component: LoginCallback
    },
    {
      path: '/tenants/create',
      name: 'tenant-create',
      component: NewTenant,
      beforeEnter: requiredAuthentication
    },
    {
      path: '/tenants/:id/edit',
      name: 'tenant-edit',
      component: EditTenant,
      beforeEnter: requiredAuthentication
    },
    {
      path: '/tenants/:id/',
      name: 'tenant-content',
      component: TenantActivity,
      beforeEnter: requiredAuthentication
    },
    {
      path: '/tenants/:id/c/:categoryId',
      name: 'tenant-content-by-categoryId',
      component: TenantActivity,
      beforeEnter: requiredAuthentication
    },
    { path: '/:pathMatch(.*)*', component: NotFound }, // 404 route
  ]
})

export default router
