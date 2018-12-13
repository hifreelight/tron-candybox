<template>
  <div class="rank" id="rank" v-cloak>
		<div class="rank_bt">
			<div class="active all">所有投注</div>
			<div class="my">我的投注</div>
		</div>
		<div class="rank_contant">
			<div id="all" class="active">
				<div class="rank_name">
					<div>投注者</div>
					<div>小于该号码获胜</div>
					<div>投注</div>
					<div>开奖号码</div>
					<div>奖金</div>
				</div>
				<div class="rank_list" id="boxscroll">
					<div v-for="(item, index) in history_list"  v-on:click="detail($event,item.transactionHash)">
						<div v-cloak>{{item.args.BetID}}</div>
						<div v-cloak>{{item.args.PlayerNumber}}</div>
						<div v-cloak>{{item.args.BetValue}} ETH</div>
						<div v-cloak v-bind:class="[item.args.ProfitValue>0?'':'error']">{{item.args.DiceResult}}</div>
						<div v-cloak>
							<span v-bind:class="[item.args.ProfitValue>0?'num':'']">{{item.args.ProfitValue>0?item.args.ProfitValue:""}}</span><span v-cloak v-if="item.args.ProfitValue>0">ETH</span>
						</div>
					</div>
				</div>
			</div>
			<div id="my">
				<div class="rank_name">
					<div>投注者</div>
					<div>小于该号码获胜</div>
					<div>投注</div>
					<div>开奖号码</div>
					<div>奖金</div>
				</div>
				<div class="rank_list" id="boxscrol2">
					<div v-for="(item, index) in my_list" v-cloak  v-on:click="my_detail($event,item.transactionHash)">
						<div v-cloak>{{item.args.BetID}}</div>
						<div v-cloak>{{item.args.PlayerNumber}}</div>
						<div v-cloak>{{item.args.BetValue}} ETH</div>
						<div v-cloak v-bind:class="[item.args.ProfitValue>0?'':'error']">{{item.args.DiceResult}}</div>
						<div v-cloak>
							<span v-bind:class="[item.args.ProfitValue>0?'num':'']">{{item.args.ProfitValue>0?item.args.ProfitValue:""}}</span><span v-cloak v-if="item.args.ProfitValue>0">ETH</span>
						</div>
					</div>
				</div>
			</div>
			<div v-if="isload">
				<img src="/static/img/5-121204193R0-50.gif">
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import $ from 'jquery'
  export default {
    name: 'rank',
    data: function () {
      return {
        history_list: [],
        my_list: [],
        isload: true
      }
    },
    methods: {
      detail (e, address) {
        window.location.href = 'https://ropsten.etherscan.io/tx/' + address
      },
      my_detail (e, address) {
        window.location.href = 'https://ropsten.etherscan.io/tx/' + address
      }
    },
    mounted () {
      // TODO: vue click instead of jquery click
      $('.rank_bt>div').click(function () {
        $(this).addClass('active').siblings('.active').removeClass('active')
        var c = $(this).attr('class').split(' ')[0]
        $('#' + c).addClass('active').siblings('.active').removeClass('active')
      })
    }
  }
</script>

<style scoped>
</style>
