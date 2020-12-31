<template>
  <div>
      <aplayer :audio="audio" :lrcType="3" />

      <ul>
        <li></li>
      </ul>

  </div>
</template>

<script>

import Vue from 'vue';
import APlayer from '@moefe/vue-aplayer';

Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});

export default {
  created () {
    this.getData()
  },
   data() {
    return {
      musicList:[],

      audio: {
        name: '东西（Cover：林俊呈）',
        artist: '纳豆',
        url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
      },

    };
  },
  methods:{
    getData(){
            let musicUrl = "https://bird.ioliu.cn/netease/playlist?id=2501115348";
            this.axios
                .get(musicUrl)
                .then((response) => {
                    console.log(response);
                    
                })
                .catch((err) => console.log(err));
        },
  }

}
</script>

<style>

</style>