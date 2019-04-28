<template>
    <div>
      <div class="container">
        <div class="nav">
          <!--<ul class="navContainer">-->
            <!--<li><router-link to="/homePage">首页</router-link></li>-->
            <!--<li><router-link to="/elementsPeriodicTable">周期表</router-link></li>-->
            <!--&lt;!&ndash;直接用a标签 router-link默认渲染成正确的a标签&ndash;&gt;-->
            <!--&lt;!&ndash;<li><a href="#/elementsPeriodicTable">元素周期表</a></li>&ndash;&gt;-->
            <!--<li><router-link to="/ChemicalEquation">方程式大全</router-link></li>-->
            <!--<li><router-link to="/elementsPeriodicTable">实验介绍</router-link></li>-->
            <!--<li><router-link to="/elementsPeriodicTable">教学视频</router-link></li>-->
            <!--<li><router-link to="/examQuestion">在线测试</router-link></li>-->
          <!--</ul>-->
          <ul class="navContainer">
            <li v-for="(item,index) in urlList"><router-link :to=item.url>{{item.navName}}</router-link></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
    export default{
        name:"NavHeader",
        data () {
            return {
                urlList:[
                  {
                    id:1,
                    url:"/homePage",
                    navName:"首页"
                  },
                  {
                    id:2,
                    url:"/elementsPeriodicTable",
                    navName:"周期表"
                  },
                  {
                    id:3,
                    url:"/ChemicalEquation",
                    navName:"方程式大全"
                  },
                  {
                    id:4,
                    url:"/elementsPeriodicTable",
                    navName:"教学视频"
                  },
                  {
                    id:5,
                    url:"/elementsPeriodicTable",
                    navName:"实验介绍"
                  },
                  {
                    id:6,
                    url:"/examQuestion",
                    navName:"在线测试"
                  }
                ]
            }
        },
        mounted(){
        },
        methods:{
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    height: 40px;
    background-color: lightblue;
    .nav{
      width: 100%;
      .navContainer {
        width: 95%;
        height: 40px;
        margin: 0 auto;
        text-align: center;
        li {
          list-style-type: none;
          float: left;
          display: block;
          width: 16.5%;
          height: 40px;
          line-height: 40px;
          a {
            display: block;
            width: 100%;
            margin: 0 auto;
            color: black;
          }
          a:hover {
            background-color: red;
            color: #fff;
          }
        }
      }
    }
  }
</style>
