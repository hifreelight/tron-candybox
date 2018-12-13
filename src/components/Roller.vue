<template>
  <div id="home">
    <HeaderTemplate
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    />

    <div class="title">
      必中过山车
    </div>
    <div class="play" id="rate">
      <div>
        <section id="examples">
          <div id="js-example-change-value">
            <input type="range" v-bind:min="min" v-bind:max="max"  data-rangeslider>
            <output style="opacity: 0"></output>
          </div>
        </section>
        <div class="rate">
          <span>{{min}}%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>{{max}}%</span>
        </div>
        <div class="ts">调整您的胜率</div>
        <div class="rate_num">
          <div v-on:click="valuation($event)">{{Number(min_num)}}</div>
          <div v-on:click="valuation($event)" v-bind:class="{ active: isActive1 }">0.2</div>
          <div v-on:click="valuation($event)" v-bind:class="{ active: isActive2 }">0.4</div>
          <div v-on:click="valuation($event)">最大</div>
        </div>
        <div class="rate_option">
          <div class="add" v-on:click="reduce"><img src="/static/img/reduce.png"></div>
          <div>
            <input type="text" v-model="rate_num" v-on:change="write">
          </div>
          <div class="reduce" v-on:click="add"><img src="/static/img/add.png"></div>
        </div>
        <div class="ts">您的赌注</div>
        <div  v-if="isWeb3" class="software">
          <div class="software_title">
            <img src="/static/img/9@2x.png">
            {{Mask}}
          </div>
          <div class="software_ts">{{ts}}</div>
          <div class="software_option" v-if="isMask">获取MetaMask</div>
        </div>
        <div class="stake"  >下注</div>
        <div class="roll_state"  v-if="isstate">
          <img src="/static/img/10@2x.png">
          <div v-if="isok">请确认投注交易</div>
          <div v-if="issumit">投注已提交！等待以太坊。。。</div>
          <div v-if="isbet">投注已确认！等待结果。。。</div>
        </div>
        <div class="roll_result" v-if="isresult">
          <div class="title">您{{bet_result}}了！</div>
          <div class="money">{{money}}</div>
          <div class="datail">
            <div>
              <div class="text">您押注</div>
              <div class="text_num" style="font-size: 2.5rem;">{{bet_num}}</div>
            </div>
            <div>
              <div class="text">结果</div>
              <div class="text_num">{{result}}</div>
            </div>
          </div>
          <div class="close" v-on:click="close()">再玩一次</div>
        </div>
      </div>
      <div style="text-align: center;">
        <div class="play_title">获胜机会</div>
        <div class="info" style="margin-bottom: 5.833333rem;">{{chance}}.00%</div>
        <div class="play_title">获胜倍数</div>
        <div class="info multiple">
          <img src="/static/img/7@2x.png">
          {{multiplex}} x
        </div>
        <div class="green">您将赢得{{getMoney}}ETH（1%费用）</div>
        <div class="play_title">大奖包括</div>
        <div class="info eth">
          <img src="/static/img/5@2x.png">
          {{bigMoney}} ETH
        </div>
      </div>
    </div>
    <BodyTemplate
      :current-view="currentView"
    />
  </div>
</template>

<script>
import $ from 'jquery'
import BigNumber from 'bignumber.js'
let bigMoney = 0
let maxBat = 0
let getMoney = 0
let multiplex = 0

export default {
  name: 'rate',
  data: function () {
    return {
      rate_num: 0,
      isActive1: true,
      isActive2: true,
      chance: 50,
      isWeb3: true,
      max: '',
      min: '',
      Mask: '安装MetaMask',
      isMask: true,
      ts: '您需要一个兼容Web3的钱包来玩我们的游戏',
      bigMoney: '',
      multiplex: '',
      min_num: '',
      getMoney: '',
      maxBat: '',
      isstate: false,
      isresult: false,
      isok: true,
      issumit: false,
      isbet: false,
      bet_num: 0,
      result: 0,
      money: 0,
      address: '',
      bet_result: ''
    }
  },
  props: ['currentView'],
  methods: {
    logUserIn (evt) {
      this.$emit('log-user-in', evt)
    },
    logUserOut (evt) {
      this.$emit('log-user-out', evt)
    },
    reduce () {
      if (this.rate_num <= this.min_num) {
        this.rate_num = this.min_num
      } else {
        this.rate_num = (this.rate_num - 0.01).toFixed(2)
      }
      this.change()
    },
    add () {
      if (this.rate_num >= maxBat) {
        this.rate_num = this.maxBat
      } else {
        this.rate_num = (Number(this.rate_num) + 0.01).toFixed(2)
      }
      this.change()
    },
    write () {
      if (this.rate_num <= this.min_num) {
        this.rate_num = this.min_num
      } else {
        if (this.rate_num >= maxBat) {
          this.rate_num = this.maxBat
        } else {
          this.rate_num = (Number(this.rate_num) + 0.01).toFixed(2)
        }
      }
      this.change()
    },
    valuation (e) {
      var contant = event.currentTarget.innerText
      if (contant === '最大') {
        this.rate_num = this.maxBat
      } else {
        this.rate_num = contant
      }
      this.change()
    },
    close: function () {
      this.isresult = false
      this.isstate = false
      this.isok = true
      this.issumit = false
      this.isbet = false
    },
    change: function () {
      let vm = this
      getMoney = new BigNumber((window.ContractBridge.getProfit(Number(vm.rate_num), new BigNumber(vm.chance).plus(1)).toString()))
      multiplex = getMoney.dividedBy(vm.rate_num)
      vm.getMoney = getMoney.times(10000).floor().dividedBy(10000).toNumber()
      vm.multiplex = getMoney.dividedBy(vm.rate_num).times(1000).floor().dividedBy(1000).toNumber()
      maxBat = new BigNumber(bigMoney).dividedBy(multiplex)
      vm.maxBat = maxBat.times(100).floor().dividedBy(100)
      if (vm.rate_num >= maxBat) {
        vm.rate_num = vm.maxBat
      }
      if (maxBat >= 0.2) {
        vm.isActive1 = false
      }
      if (maxBat >= 0.4) {
        vm.isActive1 = false
        vm.isActive2 = false
      }
      if (maxBat < 0.2) {
        vm.isActive1 = true
        vm.isActive2 = true
      }
      if (maxBat < 0.4) {
        vm.isActive2 = true
      }
    }
  },
  components: {
    HeaderTemplate,
    BodyTemplate,
    FooterTemplate
  },
  mounted () {
    $('.stake').click(function () {
      window.ContractBridge.playerRollDice(Number(this.rate_num), this.chance, function () {
        this.issumit = true
      })
      $('.mask').show(1000)
    })
  }
}

import HeaderTemplate from './layout/HeaderTemplate'
import BodyTemplate from './layout/BodyTemplate'
import FooterTemplate from './layout/FooterTemplate'

// import '../../static/css/rangeslider.css'
// import '../../static/css/roller.css'
</script>

<style scoped>
  /* @import '../../static/css/rangeslider.css';
  @import '../../static/css/roller.css' */
</style>
