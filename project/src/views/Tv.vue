<template>
  <div>
    <ul>
      <li v-for="item in tvList" :key="item.id">

        <div class="img">
          <img :src="'https://images.weserv.nl/?url=' + item.cover.url" />
        </div>

        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.info }}</p>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  },
  mounted() {
    this.listenScroll();
  },
  data() {
    return {
      tvList: [],
      start: 0,
      isFinish:true
    };
  },
  methods: {
    getData() {
      console.log("这是第" + this.start +"现在状况"+this.isFinish);
      if (this.isFinish) {
        this.isFinish = false
        console.log("开始请求前置为"+this.isFinish)
        let baseUrl = "https://bird.ioliu.cn/v2?url=";
        let tvUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=ios&for_mobile=1&start=${this.start}&count=10`;
        this.axios
          .get(baseUrl + tvUrl)
          .then((response) => {
            console.log(response);
            this.tvList = this.tvList.concat(response.data.subject_collection_items);
            this.isFinish = true
            console.log("请求完毕" + this.isFinish);
          })
          .catch((err) => console.log(err));
      }
    },

    listenScroll() {
      let htmlDom = document.documentElement;
      let deviceHeight = 0;
      let fullHeight = 0;
      let scrollTop = 0;
      window.onscroll = () => {
        deviceHeight = htmlDom.clientHeight; // 获取窗口的高度
        fullHeight = htmlDom.offsetHeight;   // 页面总高度
        scrollTop = htmlDom.scrollTop;       // 滚动条距离顶部的距离
        if (deviceHeight + scrollTop > fullHeight - 20) {
          this.start += 10;
          if (this.start < 50) {
            this.getData();
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  padding: 3px;
  border-bottom: 1px solid black;
  .img {
    flex: 3;
    img {
      width: 100%;
    }
  }
  .content {
    flex: 5;
    h3 {
      font-weight: bolder;
      margin-bottom: 2px;
    }
  }
}
</style>  