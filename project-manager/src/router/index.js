import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Projects from '../views/Projects.vue';
import ProjectDetail from '../views/ProjectDetail.vue';
import ProjectForm from '../views/ProjectForm.vue';
import Tasks from '../views/Tasks.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/projects', name: 'projects', component: Projects },
  {
    path: '/projects/new',
    name: 'project-new',
    component: ProjectForm,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'admin') next();
      else next('/');
    }
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetail,
    props: true,
    children: [
      {
        path: 'tasks',
        name: 'project-tasks',
        component: Tasks,
        props: true,
      },
      {
        path: 'edit',
        name: 'project-edit',
        component: ProjectForm,
        props: true,
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard: block /projects/* if not authenticated
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (to.path.startsWith('/projects') && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;