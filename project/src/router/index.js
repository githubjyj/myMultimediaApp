import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入 4 个界面
import Tv from '../views/Tv.vue'
import Book from '../views/Book.vue'
import Music from '../views/Music.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/',name: 'Tv',component: Tv },
  { path: '/book',name: 'Book',component: Book },
  { path: '/music',name: 'Music',component: Music },
  { path: '/chat',name: 'Chat',component: Chat }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
