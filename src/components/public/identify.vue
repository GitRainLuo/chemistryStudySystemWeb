<template>
    <!--验证码组件-->
    <div>
        <canvas class="verificationCanvas" ref="verificationCanvas" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>

<script>
    export default{
        name:"identify",
        data () {
            return {
            }
        },
        props:{
          //容器宽度
          contentWidth:{
            type:Number,
            default:116
          },
          //容器高度
          contentHeight:{
            type:Number,
            default:32
          },
          //默认验证码
          verificationCode:{
            type:String,
            default:"1234"
          },
          //最小字体
          minFontSize:{
            type:Number,
            default:25
          },
          //最大字体
          maxFontSize:{
            type:Number,
            default:30
          },
          //字体样式
          //"Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
          fontFamily:{
            type:Array,
//            default:["Arial","Microsoft YaHei","sans-serif","Helvetica"]
            default:"Arial"
          },
          //验证码背景颜色最小值
          minBackGroundColor:{
            type:Number,
            default:200
          },
          //验证码背景颜色最大值
          maxBackGroundColor:{
            type:Number,
            default:220
          },
          //背景干扰点最小值
          minDotColor:{
            type:Number,
            default:60
          },
          //背景干扰点最大值
          maxDotColor:{
            type:Number,
            default:120
          }
        },
        methods:{
            //生成一个随机数
          randomNum(min,max){
              //生成 min - max 之间的一个随机数
              return Math.floor(Math.random()*(max-min)+min)
          },
          //生成随机颜色
          randomColor(min,max){
              let rgb = ""
              let r = this.randomNum(min,max)
              let g = this.randomNum(min,max)
              let b = this.randomNum(min,max)
              rgb = 'rgb('+r+','+g+','+b+')'
              return rgb
          },
          //绘制图形
          drawPic(){
             let _this = this
             let canvas = this.$refs.verificationCanvas
             let ctx = canvas.getContext("2d")
             ctx.textBaseline = "bottom"
            //绘制背景
             ctx.fillStyle = this.randomColor(this.minBackGroundColor,this.maxBackGroundColor)
            //绘制矩形
             ctx.fillRect(0,0,this.contentWidth,this.contentHeight)
            //绘制文字
             for(let i = 0;i<this.verificationCode.length;i++){
                 _this.drawText(ctx,this.verificationCode[i],i)
             }
            //绘制干扰线
              _this.drawLine(ctx)
            //绘制干扰点
              _this.drawDot(ctx)
          },
          //绘制文字
          drawText(ctx,text,i){
            let _this = this
            //随机生成字体颜色
            ctx.fillStyle = _this.randomColor(50,160)
            //随机生成字体字体大小
//            ctx.font =_this.randomNum(this.minFontSize,this.maxFontSize)+"px"+" "+this.fontFamily[Math.floor(_this.randomNum(0,this.fontFamily.length))]
            ctx.font = _this.randomNum(this.minFontSize,this.maxFontSize)+"px"+" "+this.fontFamily
            //x位置
            let x = (i+1)*(Math.floor(this.contentWidth/(this.verificationCode.length+1)))
            //y位置
            let y = _this.randomNum(this.maxFontSize,this.contentHeight - 5)
            //字体随机倾斜度数(旋转角度)
            let deg = _this.randomNum(-30,30)
            console.log(x+"-"+y+"-"+deg)
            //重新定位原点位置 和 旋转角度
            ctx.translate(x,y)
            ctx.rotate(deg*Math.PI/180)
            ctx.fillText(text,0,0)
            //恢复原点坐标和旋转角度
            ctx.rotate(-deg*Math.PI/180)
            ctx.translate(-x,-y)
          },
          //绘制干扰线
          drawLine(ctx){
            for(let i = 0;i<4;i++){
              ctx.strokeStyle = this.randomColor(100,200)
              ctx.beginPath()
              ctx.moveTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight))
              ctx.lineTo(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight))
              ctx.stroke()
            }
          },
          //绘制干扰点
          drawDot(ctx){
             for(let i = 0;i<30;i++){
                 //随机颜色
               ctx.fillStyle = this.randomColor(0,255)
               ctx.beginPath()
               ctx.arc(this.randomNum(0,this.contentWidth),this.randomNum(0,this.contentHeight),1,0,2*Math.PI)
               ctx.fill()
             }
          },
        },
        watch:{
            "verificationCode":function () {
                this.drawPic()
            }
        },
        mounted(){
            this.drawPic()
        }
    }
</script>

<style>
.verificationCanvas{
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>
