import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/HomeView.vue';
import MovieDetails from '@/components/MovieDetails.vue';
import MovieForm from '@/components/MovieForm.vue';

export const routes = [
  {path: '/', component: Home},
  {path: '/movie/:id', component: MovieDetails, props: true},
  {path: '/add', component: MovieForm},
  {path: '/edit/:id', component: MovieForm, props: true},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
