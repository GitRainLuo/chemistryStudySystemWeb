<template>
  <div class="exam" v-cloak>
    <div class="navHeader">
      <nav-header></nav-header>
    </div>
    <div style="margin-top: 40px"></div>
    <div class="titleContainer">
      <h2 class="title">在线测试</h2>
      <p>欢迎参加本次测试,本次测试时间为90分钟，满分100分</p>
      <div>
        <Button @click="startTest" :disabled="disableButton">开始答题</Button>
        <span class="totalScore" v-show="isShowTotalScore">本次测试得分:{{totalScore}}分</span>
      </div>
    </div>
    <div class="time">
      <p>距离本次测试结束还剩:</p>
      <div class="timeDown" :style="{'color':color}">{{minutes | minutesFilter}}分{{seconds | secondsFilter}}秒</div>
      <div style="color: red" v-if="showTips">剩余时间不足5分钟了！</div>
    </div>
    <div class="examContainer" :class="{'no-click':isPermitClick}">
      <!--<div v-for="(item,index) in questionList" :key="index">-->
      <!--<p style="text-align: left"><span>{{index+1}}.</span>{{item.title}}</p>-->
      <!--<div v-for="(selection,i) in item.section" style="text-align: left">-->
      <!--<input type="checkbox" :id="selection.code" :value="selection.code" @change="show(selection)"/>-->
      <!--<label :for="selection.code">{{selection.code}}.{{selection.des}}</label>-->
      <!--{{selected}}-->
      <!--</div>-->
      <!--</div>-->
      <div class="questionTitle">
        <p>
          一.单选题(每题{{scoreConfig.singleScore}}分,共计{{singleQuestionList.questionList.length*scoreConfig.singleScore}}分)</p>
      </div>
      <!--单选-->
      <div v-for="(item,index) in singleQuestionList.questionList" :key="index" class="questionList">
        <p>{{index+1}}.{{item.title}}<span>({{singleSelected[index]}})</span></p>
        <RadioGroup v-model="singleSelected[index]">
          <!--{{multiSelected[index]}}-->
          <Radio v-for="data in item.section" :label="data.code" :key="data.code">
            {{data.code}}.{{data.desc}}
          </Radio>
        </RadioGroup>
      </div>
      <div class="showScore" v-if="showScore">
        <p><span class="green">得分提示:</span>单选得分:<span class="score">{{getSingleScore}}</span>分</p>
      </div>
      <div class="questionTitle">
        <p>
          二.多选题(每题{{scoreConfig.multiScore}}分,共计{{multiQuestionList.questionList.length*scoreConfig.multiScore}}分,选不全得一半)</p>
      </div>
      <!--多选-->
      <div v-for="(item,index) in multiQuestionList.questionList" :key="index" class="questionList">
        <p>{{index+1}}.{{item.title}}<span>({{multiSelected[index] | resultFilter}})</span></p>
        <CheckboxGroup v-model="multiSelected[index]">
          <!--{{multiSelected[index]}}-->
          <Checkbox v-for="data in item.section" :label="data.code" :key="data.code">
            {{data.code}}.{{data.desc}}
          </Checkbox>
        </CheckboxGroup>
      </div>
      <div class="showScore" v-if="showScore">
        <p><span class="green">得分提示:</span>多选得分:<span class="score">{{getMultiScore}}</span>分</p>
      </div>
      <!--提交-->
      <div class="subBtn">
        <Button @click="submitExam">提交</Button>
      </div>
    </div>
    <p-footer></p-footer>
  </div>
</template>

<script>
  import navHeader from "../../public/NavHeader.vue"
  import pFooter from "../../public/Footer.vue"
  import {ajax} from "../../../http/ajax"

  export default {
    name: "ExamQuestion",
    components: {
      navHeader,
      pFooter
    },
    data() {
      return {
        singleQuestionList: [],
        multiQuestionList: [],
//                questionData:[
//                  {
//                    questionType:"single",
//                    questionList:[
//                      {
//                        title:"下面说法哪个是正确的",
//                        rightAnswer:"A",
//                        analysis:"",
//                        section:[
//                          {
//                            code:"A",
//                            des:"0000"
//                          },
//                          {
//                            code:"B",
//                            des:"1111"
//                          },
//                          {
//                            code:"C",
//                            des:"2222"
//                          },
//                          {
//                            code:"D",
//                            des:"3333"
//                          }
//                        ]
//                      },
//                    ]
//                  },
//                  {
//                    questionType:"multi",
//                    questionList:[
//                      {
//                        title:"下面说法哪些是正确的",
//                        rightAnswer:"AB",
//                        analysis:"",
//                        section:[
//                          {
//                            code:"A",
//                            des:"0000"
//                          },
//                          {
//                            code:"B",
//                            des:"1111"
//                          },
//                          {
//                            code:"C",
//                            des:"2222"
//                          },
//                          {
//                            code:"D",
//                            des:"3333"
//                          },
//                        ]
//                      }
//                    ]
//                  }
//                ],
        //分数配置
        scoreConfig: {
          singleScore: 5,
          multiScore: 10,
          halfScore: 5,
        },
        //多选
        multiSelected: [],
        //单选
        singleSelected: [],
        //单选得分
        getSingleScore: 0,
        //多选得分
        getMultiScore: 0,
        //总分
        totalScore: 0,
        //是否显示分数
        showScore: false,
        //是否显示总分
        isShowTotalScore: false,
        //是否允许点击答题
        isPermitClick: true,
        //进制答题按钮
        disableButton: false,
        //倒计时 90分钟
        endTime: 90 * 60,
        timer: null,
        minutes: "90",
        seconds: "0",
        //颜色提示
        color: "#000",
        //剩余5分钟提示
        showTips: false
      }
    },
    mounted() {
      this.getQuestionList();
    },
    filters: {
      resultFilter: function (val) {
//              alert(JSON.stringify(val))
        let str = ""
        if (val) {
          if (val.length > 0) {
            //不排序
//                 for(let i = 0;i<val.length;i++){
//                   str+=val[i]
//                 }
            //排序(冒泡)  对选项进行排序显示
            var temp = ""
            for (let i = 0; i < val.length; i++) {
              for (let j = 0; j < val.length - 1 - i; j++) {
                if (val[j].charCodeAt() > val[j + 1].charCodeAt()) {
                  temp = val[j + 1]
                  val[j + 1] = val[j]
                  val[j] = temp
                }
              }
            }
            for (let i = 0; i < val.length; i++) {
              str += val[i]
            }
          }
        }
        return str
      },
      codeNameFilter: function (val) {
        var arr = []
        var res = ""
        if (val) {
          arr = val.split("(")
          res = arr[0]
        }
        return res
      },
      scoreFilter: function (val) {
        var arr = []
        var arr1 = []
        var res = ""
        if (val) {
          arr = val.split("(")
          arr1 = arr[1].split(")")
          res = arr1[0]
        }
        return res
      },
      //倒计时 分
      minutesFilter: function (val) {
        let minu = ""
        if (Number(val) <= 9) {
          minu = "0" + val
        } else {
          minu = val
        }
        return minu
      },
      //倒计时  秒
      secondsFilter: function (val) {
        let sec = ""
        if (Number(val) <= 9) {
          sec = "0" + val
        } else {
          sec = val
        }
        return sec
      }
    },
    methods: {
      getQuestionList(type) {
//              let url = `/question/questionList?questionType=`+"single"
        let url = ""
        if (type) {
          url = "/question/questionList?questionType=" + type
        } else {
          url = "/question/questionList"
        }
        ajax.get(url, {headers: {"Content-Type": "application/json;charset=utf-8"}}).then(res => {
//                  alert(JSON.stringify(res))
          if (res.status == 200 && res.data) {
            let data = res.data
//                    alert(JSON.stringify(data))
            for (let i = 0; i < data.length; i++) {
              //单选
              if (data[i].questionType == "single") {
                this.singleQuestionList = data[i]
              } else if (data[i].questionType == "multi") {
                //多选
                this.multiQuestionList = data[i]
              }
            }
          }
        }).catch(err => {
          alert("err:" + JSON.stringify(err))
        })
      },
      submitExam() {
        //点击提交 关闭计时
        clearInterval(this.timer)
        //现将分数重置
        this.getSingleScore = 0
        this.getMultiScore = 0
        alert("您的单选答案:" + JSON.stringify(this.singleSelected))
        //单选题校验分
        this.singleSelected.map((v, i) => {
          if (v == this.singleQuestionList.questionList[i].rightAnswer) {
//                alert("correct")
            this.getSingleScore += this.scoreConfig.singleScore;
          } else {
//                alert("error")
          }
        })
        alert("您的多选答案:" + JSON.stringify(this.multiSelected))
        //多选题检验分
        this.multiSelected.map((v, i) => {
          let answerStr = ""
          if (v) {
            //先转成字符串 判断是否有,即是否是多选的 然后按,分割
            if (v.toString().indexOf(",") !== -1) {
              let answerArr = v.toString().split(",")
              //去掉, 即按""加入 组成新的字符串
              answerStr = answerArr.join("")
            } else {
              answerStr = v
            }
          } else {
            answerStr = ""
          }
          //如正确答案对比 验证
          let rightAnswer = this.multiQuestionList.questionList[i].rightAnswer
          if (answerStr == rightAnswer) {
//                alert("correct")
            this.getMultiScore += this.scoreConfig.multiScore
          } else if (answerStr.length < rightAnswer.length && rightAnswer.includes(answerStr)) {
            //选不全判定
//                alert("half")
            this.getMultiScore += this.scoreConfig.halfScore
          } else {
//                alert("error")
          }
        })
        this.totalScore = this.getSingleScore + this.getMultiScore
        this.showScore = true
        this.isShowTotalScore = true
//            alert("您的得分:"+this.totalScore)
      },
      //倒计时
      restTime() {
        var _this = this
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          _this.getRestTime()
        }, 1000)
      },
      getRestTime() {
        //设置结束时间长度 按秒
        if (this.endTime > 0) {
          this.minutes = Math.floor(this.endTime / 60)
          this.seconds = Math.floor(this.endTime % 60)
          if (this.minutes <= 4) {
            this.color = "#E82100"
            this.showTips = true
          }
          --this.endTime
        } else {
          clearInterval(this.timer)
        }
      },
      //开始答题
      startTest() {
        var _this = this
        //允许答题
        this.isPermitClick = false
        //开始倒计时
        this.restTime()
        _this.$nextTick(() => {
          this.disableButton = true
        })
      }
    }
  }
</script>

<style lang="scss">
  body {
    background-color: #f0f0f0;
  }

  [v-cloak] {
    display: none;
  }

  /*禁止点击*/
  .no-click {
    pointer-events: none;
  }

  .exam {
    width: 100%;

    .navHeader {
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 1;
    }

    .time {
      position: fixed;
      top: 40px;
      right: 10px;
      /*width: 200px;*/
      /*padding: 5px;*/
      text-align: center;
      /*background-color: aquamarine;*/
      p {
      }

      .timeDown {
        text-align: right;
        margin-right: 10px;
      }
    }

    .titleContainer {
      width: 60%;
      margin: 0 auto;

      .title {
        display: block;
        width: 100%;
        height: 30px;
        margin-top: 5px;
        line-height: 30px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        /*color: #00ffee;*/
      }

      p {
        margin: 2px 0;
      }

      .totalScore {
        display: inline-block;
        margin-left: 5px;
      }
    }

    .examContainer {
      width: 85%;
      margin: 10px auto;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 5px;
      /*background-color: aquamarine;*/
      .questionList {
        width: 97%;
        margin: 0 auto;
        text-align: left;

        .ivu-checkbox-group {
          margin-left: 10px;

          .ivu-checkbox-wrapper {
            width: 100%;
          }
        }

        .ivu-radio-group {
          margin-left: 10px;

          .ivu-radio-wrapper {
            width: 100%;
          }
        }
      }

      .questionTitle {
        width: 98%;
        margin: 0 auto;
        text-align: left;
      }

      .showScore {
        width: 98%;
        margin: 5px auto;
        text-align: left;
        font-weight: bold;

        .green {
          font-size: medium;
          color: green;
        }

        .score {
          color: red;
        }
      }

      .subBtn {
        zoom: 1;

        Button {
          float: right;
          margin: 10px 0 0 10px;
        }
      }

      .subBtn:after {
        display: block;
        content: "";
        height: 0;
        line-height: 0;
        visibility: hidden;
        clear: both;
      }
    }
  }
</style>
