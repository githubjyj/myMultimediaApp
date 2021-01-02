<template>

  <div id="book"
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">

    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in carouselList" :key="item">
            <img :src="'https://images.weserv.nl/?url=' + item" />
          </el-carousel-item>
      </el-carousel>
    </div>
  
    <div class="tab">
      <el-tabs stretch v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="虚构类" name="book_fiction">
          <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div class="img">
                  <img :src="'https://images.weserv.nl/?url=' + item.cover.url" />
                </div>
              </el-col>

              <el-col :span="16">
                <div class="content">
                  <h3>{{item.title}}</h3>
                  <p>{{item.info}}</p>
                  <el-rate :value="Math.trunc(item.rating.value/2)" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>

        <el-tab-pane label="非虚构类" name="book_nonfiction">
          <div class="book-list">
            <el-row v-for="item in bookList" :key="item.id">
              <el-col :span="8">
                <div class="img">
                  <img :src="'https://images.weserv.nl/?url=' + item.cover.url" />
                </div>
              </el-col>

              <el-col :span="16">
                <div class="content">
                  <h3>{{item.title}}</h3>
                  <p>{{item.info}}</p>
                  <el-rate :value="Math.trunc(item.rating.value/2)" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>



  </div>
</template>

<script>
export default {
  created () {
    this.getData()
  },
  data(){
    return {
      carouselList:[],
      activeName: 'book_fiction',
      bookList:[],
      bookType:"book_fiction",
      loading:false,
      value: 3.5
    }
  },
  methods:{
    getData(){
      this.loading = true
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let bookUrl = `https://m.douban.com/rexxar/api/v2/subject_collection/${this.bookType}/items?os=ios&start=0&count=8`
      this.axios
          .get(baseUrl + bookUrl)
          .then((reponse) => {
            this.carouselList = reponse.data.subject_collection_items.map((item)=>{
              return item.cover.url
            })
            this.bookList = reponse.data.subject_collection_items
            this.loading = false
          })
    },
    
    handleClick(tab) {
        this.bookType = tab.name
        this.getData()
      },

  }
}
</script>

<style scoped lang="scss">
  .carousel{
    img{
      width:100%;
    }
  }
  .tab{
    padding:0.2rem;
    .book-list{
      .img{
        img{
          width:100%;
        }
      }
      .content{
        padding:0.2rem;
        h3{
          font-weight: bolder;
        }
      }
    }
  }
</style>