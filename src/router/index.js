import Vue from 'vue';
import VueRouter from 'vue-router';
import PaginaComponent from '../views/PaginaComponent.vue';
import PaginaWeb from '../views/PaginaWeb.vue';
import CreateNews from '../views/CreateNews.vue';
import NewsList from '../views/NewsList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'PaginaComponent',
    component: PaginaComponent
  },
  {
    path: '/pagina-web',
    name: 'PaginaWeb',
    component: PaginaWeb
  },
  {
    path: '/news-list',
    name: 'NewsList',
    component: NewsList // Cambiado a NewsList
  },
  {
    path: '/create-news',
    name: 'CreateNews',
    component: CreateNews // Cambiado a CreateNews
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
