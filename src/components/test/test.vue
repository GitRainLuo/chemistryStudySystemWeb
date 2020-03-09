<template>
    <div>
        <div id="test" v-html="testTick"></div>
        <div v-cloak>{{message}}</div>
        <!--<Input autofocus="autofocus"/>-->
        <input v-focus/>
        <div>
          <ul>
            <li class="example" v-for="item in list1">{{item}}</li>
          </ul>
          <ul>
            <li class="example" v-for="item in list2">{{item}}</li>
          </ul>
          <ol>
            <li class="example" v-for="item in list3">{{item}}</li>
          </ol>
          <ol>
            <li class="example" v-for="item in list4">{{item}}</li>
          </ol>
          <ol>
            <li class="example" v-for="item in list5">{{item}}</li>
          </ol>
        </div>
        <div @click="reCreateVerificationCode">
          <identify :verificationCode="verificationCode"></identify>
        </div>
        <input v-model="code" placeholder="请输入验证码" style="width: 30%;" clearable/>
        <Button @click="submitCode">提交</Button>
    </div>
</template>

<script>
    import identify from "../public/identify.vue"
    export default{
        name:"Test",
        components:{
            identify
        },
        data () {
            return {
                testTick:"",
                message:"message",
                list1: [],
                list2: [],
                list3: [],
                list4: [],
                list5: [],
                code:"",
                verificationCode:"",
                verificationCodes:"0123456789abcdefghijklmnopqrstABCDEFGHIJKLMNOPQRSTUVWXYZ"
            }
        },
        created(){
//          this.composeList12()
//          this.composeList34()
//          this.composeList5()
//          this.$nextTick(function() {
//            // DOM 更新了
//            console.log('finished test ' + new Date().toString(),document.querySelectorAll('.example').length)
//          })
        },
        mounted(){
//            setInterval(this.testInterval,1000)
            console.log("$router")
            console.log(this.$router)
            console.log("$route")
            console.log(this.$route)
            this.testTick = 1000;
            console.log(document.getElementById("test").innerHTML+":no")
//            setTimeout(()=>{
//                console.log(document.getElementById("test").innerHTML+":update")
//            },0)
            this.$nextTick(()=>{
                console.log(document.getElementById("test").innerHTML+":update")
            })
            this.createVerificationCode(this.verificationCodes,4)
        },
        methods:{
          composeList12() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
              this.$set(me.list1, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list1 ' + new Date().toString(),document.querySelectorAll('.example').length)

            for (let i = 0; i < count; i++) {
              this.$set(me.list2, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list2 ' + new Date().toString(),document.querySelectorAll('.example').length)

            this.$nextTick(function() {
              // DOM 更新了
              console.log("dom更新了")
              console.log('finished tick1&2 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
          },
          composeList34() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
              this.$set(me.list3, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list3 ' + new Date().toString(),document.querySelectorAll('.example').length)

            this.$nextTick(function() {
              // DOM 更新了
              console.log('finished tick3 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout1, 0)
          },
          setTimeout1() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
              this.$set(me.list4, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list4 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
              // DOM 更新了
              console.log('finished tick4 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
          },
          composeList5() {
            let me = this
            let count = 10000

            this.$nextTick(function() {
              // DOM 更新了
              console.log('finished tick5-1 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })

            setTimeout(me.setTimeout2, 0)
          },
          setTimeout2() {
            let me = this
            let count = 10000

            for (let i = 0; i < count; i++) {
              this.$set(me.list5, i, 'I am a 测试信息～～啦啦啦' + i)
            }
            console.log('finished list5 ' + new Date().toString(),document.querySelectorAll('.example').length)

            me.$nextTick(function() {
              // DOM 更新了
              console.log('finished tick5 ' + new Date().toString(),document.querySelectorAll('.example').length)
            })
          },
          randomNum(min,max){
              return Math.floor(Math.random()*(max-min)+min)
          },
          createVerificationCode(obj,num){
              this.verificationCode = ""
              for(let i = 0;i<num;i++){
                  this.verificationCode += obj[this.randomNum(0,obj.length)]
              }
          },
          reCreateVerificationCode(){
              let _this = this
              _this.createVerificationCode(this.verificationCodes,4)
          },
          //提交
          submitCode(){
              alert(this.verificationCode == this.code)
            alert(this.verificationCode)
            alert("输入的:"+this.code)
          },
          //测试
          testInterval(){
              alert(1)
          }
        },
        directives:{
            focus:{
              inserted:function (el) {
                el.focus()
              }
            }
        }
    }
</script>

<style>
  [v-cloak]{
    display: none;
  }
</style>
