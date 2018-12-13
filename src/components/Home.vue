<template>
  <div id="home">
    <HeaderTemplate
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    />

  <div class="title">采用智能合约的公平博彩</div>
    <div class="info">
      <div>公平性可被证明的博彩游戏由开源的智能合约提供支持</div>
      <div>无需押金或注册，只有1%的抽水，还有幸运大奖</div>
    </div>
    <div class="play">
      <div id="roller">
        <div class="black">
          <div class="name">过山车</div>
          <div class="detail">在数字1至100之间下注</div>
          <div class="detail">获胜就能赢得高达25倍的投注</div>
        </div>
        <div class="start">开始游戏</div>
      </div>
      <div id="coin">
        <div class="black">
          <div class="name">币中3D</div>
          <div class="detail">在数字1至100之间下注</div>
          <div class="detail">获胜就能赢得高达25倍的投注</div>
        </div>
        <div class="start">开始游戏</div>
      </div>
      <div id="dice" @click="await()">
        <div class="black">
          <div class="name">骰子</div>
          <div class="detail">在数字1至100之间下注</div>
          <div class="detail">获胜就能赢得高达25倍的投注</div>
        </div>
        <div class="start">开始游戏</div>
      </div>
    </div>

    <FooterTemplate />
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'home',
    props: ['currentView'],
    methods: {
      logUserIn (evt) {
        this.$emit('log-user-in', evt)
      },
      logUserOut (evt) {
        this.$emit('log-user-out', evt)
      },
      await () {
        alert('敬请期待')
      }
    },
    components: {
      HeaderTemplate,
      BodyTemplate,
      FooterTemplate
    },
    mounted () {
      $('#roller').click(function () {
        window.location.href = 'roller'
      })
    }
  }

  import HeaderTemplate from './layout/HeaderTemplate'
  import BodyTemplate from './layout/BodyTemplate'
  import FooterTemplate from './layout/FooterTemplate'
  // import '../../static/css/index_pc.css'
</script>

<style scoped>
  /* @import '../../static/css/index_pc.css' */
</style>
