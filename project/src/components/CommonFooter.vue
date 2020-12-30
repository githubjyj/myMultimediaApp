<template>
  <footer :style="{backgroundColor:curMenu.bgColor}">

    <div v-for="item in menuList" :key="item.path" @click="changeMenu(item)">
      <router-link :to="item.path">{{item.name}}</router-link>
    </div>

  </footer>
</template>

<script>
import { mapState } from "vuex"
import { mapMutations } from "vuex"

export default {
  data(){
    return {
      menuList:[
        {
          path:'/',
          name:'看剧',
          bgColor:'red'
        },
        {
          path:'/music',
          name:'音乐',
          bgColor:'green'
        },
        {
          path:'/book',
          name:'书籍',
          bgColor:'yellow'
        },
        {
          path:'/chat',
          name:'聊天',
          bgColor:'blue'
        }
      ]
    }
  },
  methods:{
    ...mapMutations(['setCurMenu']),
    changeMenu(obj){
      this.setCurMenu(obj)
    }
  },
  computed:{
    ...mapState(['curMenu'])
  }
};
</script>

<style scoped lang="scss">

footer {
  height: 1rem;
  background-color: red;
  line-height: 1rem;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  display:flex;
  justify-content: space-around;

  a{
    color:black;
  }
  .router-link-exact-active{
    color:white;
  }
}

</style>