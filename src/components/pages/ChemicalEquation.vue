<template>
    <!--方程式大全页面-->
    <div>
      <nav-header></nav-header>
      <h3>方程式大全</h3>
      <!--查询条件-->
      <Form :model="searchCondition" ref="searchCondition" :label-width="85" label-position="center">
        <Row>
          <Col span="4">
            <FormItem label="反应物:" prop="reactantName">
              <Input v-model="searchCondition.reactantName" placeholder="输入反应物查询有关反应" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="生成物:" prop="resultantName">
              <Input v-model="searchCondition.resultantName" placeholder="输入生成物查询有关反应" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="反应条件:" prop="reactionCondition">
              <Input v-model="searchCondition.reactionCondition" placeholder="输入反应条件" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="方程式说明:" prop="equationDes">
              <Input v-model="searchCondition.equationDes" placeholder="输入方程式说明" clearable/>
            </FormItem>
          </Col>
          <Col span="4">
            <FormItem label="反应类型:" prop="reactionType">
              <Select v-model="searchCondition.reactionType" :transfer="true" clearable multiple>
                <Option v-for="item in reactTypeList" :key="item.code" :value="item.code">{{item.description}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="2">
            <Button @click="searchInfo">查询</Button>
          </Col>
          <Col span="1">
            <Button @click="clearCondition">清空</Button>
          </Col>
        </Row>
      </Form>
      <div class="function">
        <p class="tips">共找到符合条件<span style="color: aquamarine">{{table.total}}</span>个方程式</p>
        <Button class="export" @click.native="exportExcel" :loading = "exportLoading">导出Excel</Button>
      </div>
      <!--表格-->
      <Table :columns="table.equationColumns" :data="table.equationData" border stripe no-data-text="暂无数据" style="width: 100%;margin: 0 auto"></Table>
      <!--分页-->
      <Page :total="table.total" show-total show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange" style="margin-top: 5px"></Page>
      <!--查看详细弹框-->
      <Modal v-model="showDetails" draggable scrollable title="详细" class="modal">
        <Form :label-width="85" label-position="right">
          <Row>
            <Col>
              <FormItem label="方程式:">
                <!--<Input v-model="curEquationDetails.equation" readonly/>-->
                <span>{{curEquationDetails.equation}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="反应类型:">
                <!--<Input v-model="curEquationDetails.equation" readonly/>-->
                <span>{{curEquationDetails.reactionTypeName}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="方程式说明:">
                <!--<Input v-model="curEquationDetails.equation" readonly/>-->
                <span>{{curEquationDetails.equationDes}}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormItem label="详细介绍:">
                <!--<Input v-model="curEquationDetails.equation" readonly/>-->
                <Input type="textarea" v-model="curEquationDetails.equationDes" :autosize="true" readonly/>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
      <p-footer></p-footer>
    </div>
</template>

<script>
    import navHeader from "../public/NavHeader.vue"
    import pFooter from "../public/Footer.vue"
    import {ajax} from "../../http/ajax"
    import equationReactionType from "../../data/reactionType"
    export default{
        name:"ChemicalEquation",
        components:{
            navHeader,pFooter
        },
        //methods 直接this.reload()实现刷新
        inject:["reload"],
        data () {
            return {
                 table:{
                   equationColumns:[
                     {
                       type:"selection",
                       width:50
                     },
                     {
                       type:"index",
                       title:"编号",
                       width:70,
                       align:"center"
                     },
                     {
                       key:"equation",
                       title:"反应方程式",
                       minWidth:120,
                       align:"center",
                       render:(h,{row,column,index})=>{
                         let str = row.equation
                         //利用数组渲染
                         let arr = []
                         //循环判断条件 push到数组
                         for(let i = 0;i<str.length;i++){
                           let asc = str.charCodeAt(i)
                           let lAsc = str.charCodeAt(i-1)
                           if(lAsc<0){
                               lAsc = 0
                           }
//                           alert(str.charAt(i))
                           //let nAsc = str.charAt(i+1)
                           //是数字 且前面一个不是数字的 还要抛开等于号和加号
                           if(asc>=49 && asc<=57 && (lAsc<49 || lAsc>57) && lAsc != 61 && lAsc != 43){
//                               alert(str.charAt(i-1))
//                             alert(i)
                             arr.push(h("sub",{},str.charAt(i)))
                           }else {
                             arr.push(h("span",{},str.charAt(i)))
                           }
                         }
//                            alert(arr)
                         //最后 return 将数组赋值
                         return h("div",arr)
                       }
                     },
                     {
                       key:"equationDes",
                       title:"方程式说明",
//                       width:150,
                       align:"center"
                     },
                     {
                       key:"reactant",
                       title:"反应物",
//                       width:150,
                       align:"center",
                       render:(h,{row,column,index})=>{
                         let str = row.reactant
                         //利用数组渲染
                         let arr = []
                         //循环判断条件 push到数组
                         for(let i = 0;i<str.length;i++){
                           let asc = str.charCodeAt(i)
                           if(asc>=49 && asc<=57){
                             arr.push(h("sub",{},str.charAt(i)))
                           }else {
                             arr.push(h("span",{},str.charAt(i)))
                           }
                         }
//                            alert(arr)
                         //最后 return 将数组赋值
                         return h("div",{},arr)
                       }
                     },
                     {
                       key:"reactantName",
                       title:"反应物名",
//                       width:150,
                       align:"center"
                     },
                     {
                       key:"reactionCondition",
                       title:"反应条件",
//                       width:150,
                       align:"center"
                     },
                     {
                       key:"resultant",
                       title:"生成物",
//                       width:150,
                       align:"center",
                       render:(h,{row,column,index})=>{
                            let str = row.resultant
                            //利用数组渲染
                            let arr = []
                            //循环判断条件 push到数组
                            for(let i = 0;i<str.length;i++){
                                let asc = str.charCodeAt(i)
                                if(asc>=49 && asc<=57){
                                    arr.push(h("sub",{},str.charAt(i)))
                                }else {
                                    arr.push(h("span",{},str.charAt(i)))
                                }
                            }
//                            alert(arr)
                            //最后 return 将数组赋值
                            return h("div",{},arr)
                       }
                     },
                     {
                       key:"resultantName",
                       title:"生成物名",
//                       width:150,
                       align:"center"
                     },
                     {
                       key:"reactionTypeName",
                       title:"反应类型",
//                       width:150,
                       align:"center"
                     },
                     {
                       key:"action",
                       title:"操作",
//                       width:100,
                       align:"center",
                       render:(h,{row,column,index})=>{
                           return h("Button",
                             {
                                 props:{
                                     size:"small"
                                 },
                                 style:{
                                     display:"inline-block"
                                 },
                                 on:{
                                     click:()=>{
//                                         alert(row.equation)
//                                         alert(this.table.equationData[index].equation)
                                       this.curEquationDetails = Object.assign({},row)
//                                       alert(JSON.stringify(this.curEquationDetails))
                                       this.showDetails = true
                                     }
                                 }
                             },"查看详情")
                       }
                     }
                   ],
                   equationData:[
//                     {
//                       equation:"2H2+O2=2H2O",
//                       equationDes:"氢气燃烧",
//                       reactant:"H2,O2",
//                       reactantName:"氢气,氧气",
//                       reactionCondition:"点燃",
//                       resultant:"H2O",
//                       resultantName:"水",
//                       reactionTypeName:"氧化还原反应"
//                     }
                   ],
                   total:0,
                   page:1,
                   size:10
                 },
                showDetails:false,
                searchCondition:{
                    reactantName:"",
                    resultantName:"",
                    reactionCondition:"",
                    equationDes:"",
                    reactionType:[],
                },
                reactTypeList:[],
                exportLoading:false,
                //情况一导出的数据
                exportData:[],
                //当前行的方程式详情
                curEquationDetails:{},
            }
        },
        beforeRouteEnter(to,from,next){
            console.log("equation页面"+"to")
            console.log(to)
            console.log("equation页面"+"from")
            console.log(from)
            next()
        },
        mounted(){
            //获取反应类型
            this.reactTypeList = equationReactionType
            //获取数据
            this.getData()
            console.log(this.$router)
            console.log(this.$route)
        },
        watch:{
            //导出情况一使用
            "exportData":function () {
                let _this = this
                _this.$nextTick(()=>{
                    this.exportDataToExcel()
                })
            }
        },
        methods:{
          //页数改变
          pageChange(page){
              this.table.page = page
          },
          //每页显示条数(size)改变
          pageSizeChange(size){
              this.table.size = size
          },
          //查询
          searchInfo(){
            this.getData()
          },
          //清空条件
          clearCondition(){
              //使用此方法清空表单 需要在formItem使用prop
              this.$refs.searchCondition.resetFields()
          },
          //获取数据
          getData(){
              let page = this.table.page
              let size = this.table.size
              let params = this.searchCondition
//              //反应类型
//              for(let i = 0;i<this.reactTypeList.length;i++){
//                if(this.searchCondition.reactionType == this.reactTypeList[i].code){
//                  this.searchCondition.reactionTypeName = this.reactTypeList[i].description
//                }
//              }
//              let params = {
//                  reactantName:this.searchCondition.reactantName,
//                  resultantName:this.searchCondition.resultantName,
//                  reactionCondition:this.searchCondition.reactionCondition,
//                  equationDes:this.searchCondition.equationDes,
//                  reactionType:this.searchCondition.reactionType ? this.searchCondition.reactionType:"",
//                  reactionTypeName:this.searchCondition.reactionTypeName,
//              }
              params.page = page
              params.size = size
              //清空后将reactionType置为空
              if(!params.reactionType){
                  params.reactionType = []
              }
//              alert(JSON.stringify(params))
              ajax.post("/equation/findEquationDataList",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((response)=>{
//                  alert(JSON.stringify(response))
                  if(response.status == 200 && response.data){
                      //内容
                      this.table.equationData = response.data.content
                      //alert(JSON.stringify(this.table.equationData ))
                      //总数
                      this.table.total = response.data.numberOfElements
                      //response.data.totalPages 总页数
                      //response.data.number  response.data.size
                  }else {
                      this.table.equationData = []
                      this.table.total = 0
                  }
              }).catch((err)=>{
                  alert(JSON.stringify(err))
              })
          },
          //导出excel
          exportExcel(){
            this.exportLoading = true
//              //情况一 直接导出 相当于跳过查询直接导出 需要先拿数据
//              let param = this.searchCondition
//              param.page = this.table.page
//              param.size = this.table.size
//              ajax.post("/equation/findEquationDataList",param,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then(res=>{
//                  if(res.status == 200 && res.data){
//                      this.exportData = res.data.content
//                  }else {
//                      this.exportData = []
//                  }
//              }).catch(err=>{
//                  alert(JSON.stringify(err))
//              })
            //情况二 先查询再导出 导出的是查询出来的数据
            this.exportDataToExcel()
          },
          exportDataToExcel(){
            let _this = this
            require.ensure([],()=>{
              //Export2Excel.js地址
              const {export_json_to_excel} = require("../../assets/export/Export2Excel")
              //头部
              const tHeader = this.valueToArr(_this.table.equationColumns,"title")
//              alert("tHeader:"+JSON.stringify(tHeader))
              //过滤条件
              const filterVal = this.valueToArr(_this.table.equationColumns,"key")
//              alert("filterKey:"+JSON.stringify(filterVal))
              //data
              const listData = _this.table.equationData
              //导出的data
              const jsonData = this.formatJson(filterVal,listData)
//              alert("data:"+jsonData)
              export_json_to_excel(tHeader,jsonData,"方程式列表")
              this.exportLoading = false
            })
          },
          //导出用 将数值转化为数组
          valueToArr(target,name){
              let arr = []
              //去除不需要的前两项以及最后一项(i从2开始)
              for(let i = 2;i<target.length-1;i++){
                  arr.push(target[i][name])
              }
              return arr
          },
          //转json
          formatJson(filterVal,jsonData){
              console.log("jsonData:"+JSON.stringify(jsonData))
            return jsonData.map(v =>filterVal.map(j => v[j]))
          }
        }
    }
</script>

<style lang="scss">
  h3{
    margin: 10px auto;
  }
  //选择下拉框样式
  .ivu-select-selection{
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .function{
    position: relative;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    .tips{
      float: left;
      width: 200px;
      height:30px;
      margin-left: 10px;
      line-height: 30px;
      text-align: center;
    }
    .export{
      position: absolute;
      left: 210px;
    }
  }
</style>
