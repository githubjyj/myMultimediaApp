<template>
  <div>

      <div class="box1">
          <div class="img">
              <img :src="'https://images.weserv.nl/?url='+ tvObj.data.cover.image.small.url "/>
          </div>

          <div class="info">
              {{tvObj.data.card_subtitle}}
          </div>
          
      </div>

      <div class="introduce">
          <h3>故事情节</h3>
          {{tvObj.data.intro}}
      </div>

      <div class="actor">
          <h3>主演介绍</h3>
          <ul>
              <li v-for="item in actorList" :key="item.id">
                  <span>{{item.title}}</span>
              </li>
          </ul>
      </div>

      <div class="comment">
          <h3>短评</h3>
          <ul>
              <li v-for="item in commentList" :key="item.id">
                  <img :src="item.user.avatar" class="head_img"><span>{{item.user.name}}</span><el-rate :value="Math.trunc(item.rating.value/2)" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                  <p>{{item.comment}}</p>
              </li>
          </ul>
      </div>

  </div>
</template>

<script>
export default {
    created () {
        this.getData()
        this.getComment()
    },
    data(){
        return{
            tvObj:{},
            actorList:[],
            commentList:[]
        }
    },
    methods:{
        getData(){
            let baseUrl = "https://bird.ioliu.cn/v2?url=";
            let tvUrl = "https://m.douban.com/rexxar/api/v2/tv/" + this.$route.params.id + "?ck=&for_mobile=1"
            this.axios
                .get(baseUrl + tvUrl)
                .then((response) => {
                    this.tvObj = response
                    this.actorList = response.data.actors
                })
                .catch((err) => console.log(err));
        },
        
        getComment(){
            let baseUrl = "https://bird.ioliu.cn/v2?url=";
            let commentUrl = "https://m.douban.com/rexxar/api/v2/tv/" + this.$route.params.id + "/interests?count=4&order_by=hot&start=0&ck=vFuH&for_mobile=1";
            this.axios
                .get(baseUrl + commentUrl)
                .then((response) => {
                    // console.log(response.data.interests);
                    this.commentList = response.data.interests
                    // console.log(this.commentList);
                })
                .catch((err) => console.log(err));
        }
    }
}
</script>

<style scoped lang="scss">
    .box1{
        width:100%;
        height:7rem;
        border-bottom:0.02rem solid black;
        display:flex;
        .img{
            flex:3;
            img{
                width:100%;
                height:100%;
            }
        }
        .info{
            flex:2;
        }
    }
    .introduce{
        border-bottom: 0.02rem solid black;
        h3{
            font-weight: bolder;
        }
    }
    .actor{
        width:100%;
        h3{
            font-weight: bolder;
            font-size: 0.36rem;
        }
        border-bottom: 0.02rem solid black;
    }
    .comment{
        width:100%;
        h3{
            font-weight: bolder;
            border-bottom:0.02rem solid pink;
        }
        li{
            border-bottom: rgb(35,40,52);
            // background-color: red;
            border-bottom: red solid 0.02rem;

            .head_img{
                width:0.5rem;
                border-radius: 50%;
                margin-top:0.1rem;
            }
        }
    }
</style>