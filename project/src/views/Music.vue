<template>
  <div>
    <!-- 音乐播放 -->
    <aplayer :audio="audio" />

    <!-- 歌曲列表 -->
    <ul>
      <li class="music-item">
        <span class="order">编号</span>
        <span class="name">歌曲名</span>
        <span class="artist">歌手名</span>
      </li>

      <li
        v-for="(item, index) in musicList"
        :key="item.id"
        class="music-item music"
        @click="getMusic(item.id)"
      >
        <span class="order">{{ index + 1 }}</span>
        <span class="name">{{ item.name }}</span>
        <span class="artist">{{ item.artist }}</span>
      </li>
    </ul>

    <ul class="musicImg">
      <li v-for="item in musicList" :key="item.id" @click="getMusic(item.id)">
        <img :src="item.imgUrl" />
      </li>
      <div class="musicInfo"><i class="el-icon-headset"></i>{{musicInfo}}</div>
    </ul>

    <div class="broadcase">
      假如生活中没有能够滋润我们生活的音乐，生活会将是何等的单调，孤寂、枯燥、苍白无力！
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";
Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true,
});

export default {
  created() {
    this.getData();
  },
  data() {
    return {
      // 歌曲集合
      musicList: [],
      musicInfo:'',
      audio: {
        name: "民谣",
        artist: "点击选歌",
        url: "",
        cover: 'http://p2.music.126.net/kZZnakCALvjHrqKvGjmfoQ==/109951164365202983.jpg', // prettier-ignore
      },
    };
  },
  methods: {
    getData() {
      //             第三方代理                                歌单的 id 号
      let musicUrl = "https://bird.ioliu.cn/netease/playlist?id=2501115348";
      this.axios
        .get(musicUrl)
        .then((response) => {
          // console.log(response.data.playlist.tracks)
          // map 犯法返回一个数组，数组中的数据是 return 回来的值
          this.musicList = response.data.playlist.tracks.map((item) => {
            return {
              id: item.id,
              name: item.name,
              artist: item.ar[0].name,
              imgUrl: item.al.picUrl,
            };
          });
          this.musicInfo = response.data.playlist.description
          // console.log(response);
        })
        .catch((err) => console.log(err));
    },
    getMusic(id) {
      let musicObj = {};
      let musicUrl = "https://bird.ioliu.cn/netease/song?id=" + id;
      this.axios
        .get(musicUrl)
        .then((res) => {
          musicObj = {
            name: res.data.data.name,
            artist: res.data.data.ar[0].name,
            url: res.data.data.mp3.url,
            cover: res.data.data.al.picUrl,
          };
          this.audio = musicObj;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.music-item {
  display: flex;
  padding: 0.2rem;
  .order {
    flex: 1;
  }
  .name {
    flex: 4;
  }
  .artist {
    flex: 2;
  }
}
.music:hover {
  background: #eee;
}
.musicImg {
  margin-top:0.1rem;
  li {
    width: 2.5rem;
    height: 4rem;
    float: left;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .musicInfo{
    margin-left:0.6rem;
    height:1rem;
    line-height: 1rem;
    font-size:0.4rem;
  }
} 
 .broadcase{
    position:relative;
    top:1rem;
    font-size:0.355rem;
  }
  .broadcase::before{
    content:"";
  }
</style>