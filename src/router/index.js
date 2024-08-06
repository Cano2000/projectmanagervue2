import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/store/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import TasksView from '@/views/TasksView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      requireAuth: true
    },
    component: HomeView
  },
  {
    path: '/projects',
    name: 'projects',
    meta: {
      requireAuth: true
    },
    component: ProjectsView
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      requireAuth: true
    },
    component: TasksView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  const isAuth = auth.token

  if((to.meta.requireAuth) && (isAuth == null)) {
    next("/")
  } else {
    next()
  }
})

export default router