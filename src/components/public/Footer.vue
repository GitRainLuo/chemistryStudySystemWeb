<template>
  <div class="footer">
    <span>2019 &copy; &nbsp;&nbsp;</span>
    <span @click="jumpGXJ">蜀ICP备19008734号-1</span>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    methods:{
      jumpGXJ(){
        let tempWin = window.open('_blank')
        tempWin.location.href = 'http://beian.miit.gov.cn'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: #ccc;

    span {
      height: 30px;
      line-height: 30px;
      padding: 5px 2px;
    }
  }
</style>
