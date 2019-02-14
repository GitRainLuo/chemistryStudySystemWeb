<template>
    <div>
        <nav-header></nav-header>
        <div class="container">
          <table class="table" cellspacing="0" cellpadding="0">
            <tr>
              <td>元素序号:</td>
            </tr>
            <tr>
              <td>{{table.elementId}}</td>
            </tr>
            <tr>
              <td>元素符号:</td>
            </tr>
            <tr>
              <td>{{table.element}}</td>
            </tr>
            <tr>
              <td>元素名:</td>
            </tr>
            <tr>
              <td>{{table.elementName}}</td>
            </tr>
            <tr>
              <td>相对原子质量:</td>
            </tr>
            <tr>
              <td>{{table.elementRelativeMass}}</td>
            </tr>
          </table>
          <ul class="ulContainer">
            <!--<li v-for="item in elementsList">{{item.element}}</li>-->
            <li v-for="item in elementsList" :class="item.elementId ? 'addBorder': ''" @click="lookInfo(item)">
              <p class="top"><span>{{item.elementId}}</span>{{item.element}}</p>
              <p>{{item.elementName}}</p>
              <p class="bottom">{{item.elementRelativeMass}}</p>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
    //将数据引过来
    import {elementsData} from "../../data/elmentsData"
    //公共导航
    import navHeader from "../public/NavHeader.vue"
    export default{
        name:"elementsPeriodicTable",
        components:{
            navHeader
        },
        data () {
            return {
//              elementsList:[
//                {element:"H",elementId:1,elementName:"氢",elementRelativeMass:1.008}
//              ]
              elementsList:[],
              table:{
                  elementId:"",
                  element:"",
                  elementName:"",
                  elementRelativeMass:""
              }
            }
        },
        watch:{
            "elementsList.elementId":function (val) {
              if(val){
                  alert(1)
              }
            }
        },
        mounted(){
            //将引过来的数据赋给本页需要的data
            this.elementsList = elementsData
        },
        methods:{
            lookInfo(item){
//                console.log(event.currentTarget.innerHTML)
//              let el = event.currentTarget;
//              alert("当前对象的内容："+JSON.stringify(el.innerHTML));
//              alert(JSON.stringify(item.elementId))
              this.table.elementId = item.elementId
              this.table.element = item.element
              this.table.elementName = item.elementName
              this.table.elementRelativeMass = item.elementRelativeMass
            }
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    width: 100%;
    .ulContainer{
      width: 80%;
      height: 570px;
      margin: 2px auto 0 auto;
      padding: 5px;
      border: 1px solid #ccc;
      li{
        /*position: relative;*/
        width: 50px;
        height: 50px;
        font-size: 12px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        /*line-height: 30px;*/
        list-style: none;
        margin-left: 5px;
        margin-top: 5px;
        float: left;
        /*border: 1px solid #ccc;*/
        .top{
          width: 50px;
          text-align: center;
          /*margin: 0 auto;*/
          span{
            margin-right: 5px;
          }
        }
        .bottom{
          /*position: absolute;*/
          /*left: 50%;*/
          /*margin-left: -10px;*/
          width: 50px;
          height: 10px;
          margin-bottom: 2px;
          text-align: center;
          font-size: 9px;
        }
      }
      .addBorder{
        border: 1px solid #ccc;
      }
    }
    .table{
      width: 9%;
      margin: 0 0.5% 0 0.5%;
      float: left;
      /*tr td:nth-child(1){*/
        /*border-left: 1px solid #ccc;*/
        /*border-top: 1px solid #ccc;*/
      /*}*/
      tr:nth-child(1) td{
        border-top: 1px solid #ccc;
      }
      tr td{
        /*border-left: 1px solid #ccc;*/
        /*border-top: 1px solid #ccc;*/
        width: 100px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ccc;
        border-top: none;
      }
    }
  }
</style>
