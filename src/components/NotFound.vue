<template>
  <div class="error404">
    <div class="error404-body-con">
      <div class="error404-body-con-title">4<span><Icon type="ios-navigate-outline"></Icon></span>4</div>
      <p class="error404-body-con-message">EERO PAGE</p>
      <p class="error404-body-con-message" style="letter-spacing: 3px;font-size: 20px;">页面不存在 建议您做以下操作</p>
      <div class="error404-btn-con">
        <Button @click="goHome"  style="width: 160px;" type="primary">返回首页</Button>
        <Button @click="backPage" size="large" style="width: 160px;margin-left: 40px;" type="primary">返回上一页</Button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
    methods: {
      backPage() {
        this.$router.go(-1)
      },
      goHome() {
        this.$router.push({
          path: '/homePage'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @keyframes error404animation {
    0% {
      transform: rotateZ(0deg);
    }
    20% {
      transform: rotateZ(-60deg);
    }
    40% {
      transform: rotateZ(-10deg);
    }
    60% {
      transform: rotateZ(50deg);
    }
    80% {
      transform: rotateZ(-20deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
  .error404 {
    &-body-con {
      width: 700px;
      height: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-350px, -250px);
      &-title {
        text-align: center;
        font-size: 240px;
        font-weight: 700;
        color: #004464;
        height: 260px;
        line-height: 260px;
        margin-top: 40px;
        span {
          display: inline-block;
          color: #ED3F14;
          font-size: 230px;
          animation: error404animation 3s ease 0s infinite alternate;
        }
      }
      &-message {
        display: block;
        text-align: center;
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 12px;
        color:#999

      }
    }
    &-btn-con {
      text-align: center;
      padding: 20px 0;
      margin-bottom: 40px;
    }
    .ivu-btn-primary{
      &:first-child {
        background-color: #005178;
        border-color: #005178;
      }
      &:last-child {
        background-color: #ED3F14;
        border-color: #ED3F14;
      }
    }
  }
</style>

