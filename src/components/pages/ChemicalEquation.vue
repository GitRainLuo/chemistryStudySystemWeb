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
              <Select v-model="searchCondition.reactionType" transfer="true" clearable>
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
        <Button class="export">导出Excel</Button>
      </div>
      <!--表格-->
      <Table :columns="table.equationColumns" :data="table.equationData" border stripe no-data-text="暂无数据" style="width: 100%;margin: 0 5px"></Table>
      <!--分页-->
      <Page :total="table.total" show-total show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
      <!--查看详细弹框-->
      <Modal v-model="showDetails" draggable scrollable  title="详细"></Modal>
    </div>
</template>

<script>
    import navHeader from "../public/NavHeader.vue"
    import {ajax} from "../../http/ajax"
    export default{
        name:"ChemicalEquation",
        components:{
            navHeader
        },
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
                                         alert(this.table.equationData[index].equation)
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
                    reactionType:"",
                    reactionTypeName:"",
                },
                reactTypeList:[
                  {
                    code:"YH",
                    description:"氧化反应"
                  },
                  {
                    code:"HY",
                    description:"还原反应"
                  },
                  {
                    code:"ZH",
                    description:"置换反应"
                  },
                  {
                    code:"FJ",
                    description:"分解反应"
                  },
                  {
                    code:"YHHY",
                    description:"氧化还原反应"
                  }
                ]
            }
        },
        mounted(){
            //获取数据
            this.getData()
        },
        watch:{
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
                  params.reactionType = ""
              }
//              alert(JSON.stringify(params))
              ajax.post("/equation/findEquationDataList?",params,{headers:{"Content-Type":"application/json;charset=utf-8"}}).then((response)=>{
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
          }
        }
    }
</script>

<style lang="scss" scoped>
  h3{
    margin: 10px auto;
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
