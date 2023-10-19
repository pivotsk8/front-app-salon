import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AppoinementLayout from '../views/appointment/AppointmentsLayout.vue'
import AuthApi from '../api/AuthApi'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/adminLayout.vue'),
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/appointmentsView.vue'),
        }
      ]
    },

    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppoinementLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'my-appointment',
          component: () => import('../views/appointment/MyAppointmentView.vue')
        },
        {
          path: 'nueva',
          component: () => import('../views/appointment/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointment/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'appointment-details',
              component: () => import('../views/appointment/AppointmentView.vue')
            },
          ]
        },
        {
          path: ':id/editar',
          component: () => import('../views/appointment/EditappointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointment/ServicesView.vue')
            },
            {
              path: 'detalles',
              name: 'edit-appointment-details',
              component: () => import('../views/appointment/AppointmentView.vue')
            },
          ]
        }
      ]
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if (requiresAuth) {
    try {
      const { data } = await AuthApi.auth()
      data.admin
        ? next({ name: 'admin' })
        : next()
    } catch (error) {
      next({ name: 'login' })
    }
  }

  if (!requiresAuth) {
    next()
  }
})
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if (requiresAdmin) {
    try {
      await AuthApi.auth()
      // data.admin
      //   ? next({ name: 'admin' })
      next()
    } catch (error) {
      next({ name: 'login' })
    }
  }

  if (!requiresAdmin) {
    next()
  }
})

export default router
