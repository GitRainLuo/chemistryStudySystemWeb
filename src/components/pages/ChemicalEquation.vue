<template>
    <!--方程式大全页面-->
    <div>
      <nav-header></nav-header>
      <h3>方程式大全</h3>
      <Table :columns="table.equationColumns" :data="table.equationData" border stripe no-data-text="暂无数据" style="width: 100%;margin: 10px auto"></Table>
      <Page :total="table.total" show-total show-elevator show-sizer @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
      <!--查看详细弹框-->
      <Modal v-model="showDetails" draggable scrollable  title="详细"></Modal>
    </div>
</template>

<script>
    import navHeader from "../public/NavHeader.vue"
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
                       type:"index",
                       title:"编号",
//                       width:70,
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
                           //是数字 且前面一个不是数字的 还要抛开等于号
                           if(asc>=49 && asc<=57 && (lAsc<49 || lAsc>57) && lAsc != 61){
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
                       key:"equationName",
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
                       key:"reactionType",
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
                     {
                       equation:"2H2+O2=2H2O",
                       equationName:"氢气燃烧",
                       reactant:"H2,O2",
                       reactantName:"氢气,氧气",
                       reactionCondition:"点燃",
                       resultant:"H2O",
                       resultantName:"水",
                       reactionType:"氧化还原反应"
                     },
                     {
                       equation:"2KMnO4=K2MnO4+MnO2+O2",
                       equationName:"高锰酸钾分解制氧气",
                       reactant:"KMnO4",
                       reactantName:"高锰酸钾",
                       reactionCondition:"加热",
                       resultant:"K2MnO4,MnO2,O2",
                       resultantName:"锰酸钾,二氧化锰,氧气",
                       reactionType:"分解反应"
                     },
                     {
                       equation:"Fe2O3+2Al=Al2O3+2Fe",
                       equationName:"铝热反应主反应",
                       reactant:"Fe2O3,Al",
                       reactantName:"三氧化二铁,铝",
                       reactionCondition:"高温",
                       resultant:"Al2O3,Fe",
                       resultantName:"三氧化二铝,铁",
                       reactionType:"置换反应"
                     },
                     {
                       equation:"NaAlO2+H2O+HCL=AL(OH)3+NaCl",
                       equationName:"制氢氧化铝",
                       reactant:"NaALO2,H2O,HCL",
                       reactantName:"铝酸钠,盐酸",
                       reactionCondition:"",
                       resultant:"AL(OH)3,NaCl",
                       resultantName:"氢氧化铝,氯化钠",
                       reactionType:""
                     }
                   ],
                   total:0,
                   page:1,
                   size:10
                 },
                showDetails:false
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
          }
        }
    }
</script>

<style lang="scss" scoped>
  h3{
    margin: 5px auto;
  }
</style>
