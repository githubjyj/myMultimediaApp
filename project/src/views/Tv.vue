<template>
  <div>
    <ul>
      <li v-for="item in tvList" :key="item.id" @click="getDetail(item.id)">

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
  data() {
    return {
      tvList: [],
      start: 0,
      isFinish:true
    };
  },
  created() {
    this.getData();
  }, 
  mounted() {
    this.listenScroll();
  },
  methods: {
    getData() {
      if (this.isFinish) {
        this.isFinish = false
        let baseUrl = "https://bird.ioliu.cn/v2?url=";
        let tvUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=ios&for_mobile=1&start=${this.start}&count=10`;
        this.axios
          .get(baseUrl + tvUrl)
          .then((response) => {
            this.tvList = this.tvList.concat(response.data.subject_collection_items);
            this.isFinish = true
            // console.log(this.tvList);
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
          if (this.isFinish ) {
            this.start += 10;
          }
          if (this.start < 50) {
            this.getData();
          }
        }
      };
    },
    // 获取详情页
    getDetail(id){
      this.$router.push('/tvdetails/'+ id)
    }
  },
};
</script>

<style lang="scss" scoped>
li {
  display: flex;
  padding: 0.06rem;
  border-bottom: 0.02rem solid black;
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
      margin-bottom: 0.04rem;
    }
  }
}
</style>  