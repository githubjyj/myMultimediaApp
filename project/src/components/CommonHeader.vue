<template>
  <header :style="{ backgroundColor: curMenu.bgColor }">
    <span @click="goHome" class="home">首页</span>
    {{ curMenu.name }}
  </header>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["curMenu"]),
  },
  methods: {
    ...mapMutations(["setCurMenu"]),
    goHome() {
      this.$router.push("/"),
        this.setCurMenu({
          name: "剧集",
          bgColor: "red",
        });
    },
  },
};
</script>

<style scoped lang="scss">
header {
  height: 1rem;
  background-color: red;
  line-height: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color:white;
  z-index: 999;

  .home {
    position: absolute;
    left: 0;
  }
  .router-link-exact-active{
    color:white;
  }
}
</style>