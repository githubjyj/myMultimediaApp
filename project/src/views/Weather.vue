<template>
  <div>

      <div class="weather">
        <img src="../assets/images/weather.jpg" >
      </div>

      <div class="content">
          <span class="words">选择城市</span>
          <el-select v-model="value" placeholder="选择城市" @click="getCity()">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              <div @click="getCity(item)">{{item.label}}</div>
            </el-option>
          </el-select>
          <div class="todayWeather">
              <!-- 现在的温度 -->
              {{todayWeather.data.now.tmp}} <span>℃</span><span class="cond">{{todayWeather.data.now.cond.txt}}</span>
          </div>
          <div class="weatherDetails">
            PM2.5：{{todayWeather.data.aqi.city.pm25}}  空气质量：{{todayWeather.data.aqi.city.qlty}}
          </div>

          <div class="table">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="日期" width="100"></el-table-column>
              <el-table-column prop="cond.txt_d" label="天气" width="100"></el-table-column>
              <el-table-column prop="tmp.max" label="最高温度" width="100"></el-table-column>
              <el-table-column prop="tmp.min" label="最低温度" width="100"></el-table-column>
              <el-table-column prop="wind.dir" label="风向" width="100"></el-table-column>
            </el-table>
          </div>
      </div>
      <div class="box2">
        <span class="detail">今日天气详解</span>
        <p><span class="detail">空气质量：</span> {{todayWeatherInfo.air.txt}}</p>
        <p><span class="detail">舒适：</span> {{todayWeatherInfo.comf.txt}}</p>
        <p><span class="detail">洗车：</span> {{todayWeatherInfo.cw.txt}}</p>
        <p><span class="detail">衣着：</span> {{todayWeatherInfo.drsg.txt}}</p>
        <p><span class="detail">流感：</span> {{todayWeatherInfo.flu.txt}}</p>
        <p><span class="detail">运动：</span> {{todayWeatherInfo.sport.txt}}</p>
        <p><span class="detail">出游：</span> {{todayWeatherInfo.trav.txt}}</p>
        <p><span class="detail">紫外线：</span> {{todayWeatherInfo.uv.txt}}</p>
      </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData();
  }, 
  data(){
    return {
      options: [{
          value: '城市1',
          label: '绥德'
        },
        {
          value: '城市3',
          label: '哈尔滨'
        }, {
          value: '城市4',
          label: '北京'
        }, {
          value: '城市5',
          label: '天津'
        }],
        value: '绥德',
        city:'绥德',
        todayWeather:{},
        tableData:[],
        todayWeatherInfo:{}
    }
  },
  methods:{
    getData() {
      let jokeUrl = `https://bird.ioliu.cn/weather?city=${this.city}`
      this.axios
          .get(jokeUrl)
          .then((response) => {
            this.todayWeather = response
            this.tableData = response.data.daily_forecast
            this.todayWeatherInfo = response.data.suggestion
            // console.log(this.todayWeather);
          })
          .catch((err) => {
            console.log(err);
          })
    },
    getCity(city){
      console.log(city.label);
      this.city = city.label
      this.getData()
    }
  }
}
</script>

<style scoped lang="scss">
  .weather{
    img{
      width:100%;
    }
  }
  .content{
    position: relative;
    top:-4rem;
      .words{
      margin:0.7rem;
      font-weight: bolder;
      color:white;
      font-size:18px;
    }
    .todayWeather{
      font-size:1.3rem;
      color:white;
      padding-left:15px;
      padding-top:10px;
      .cond{
        font-size:1rem;
        padding-left:1rem;
      }
    }
    .weatherDetails{
      color:white;
      padding-left:15px;
      font-weight: bolder;
    }
  }
  .box2{
    background: white;
    width:100%;
    height:205px;
    position:absolute;
    top:13rem;
    img{
      width:100%;
    }
    .detail{
      font-weight: bolder;
      font-size:18px;
    }
  }
</style>