
<template>
  <div id="nba">
    <b-table
            responsive
            striped
            hover
            :dark="dark"
            :fields="fields"
            :items="items"
    >
      <template slot="pool" slot-scope="data">
        <div v-if="data.item.pool">
          {{data.item.pool}}
        </div>
      </template>
      <template slot="create" slot-scope="data">
        <div v-if="data.item.tronIsCreated">
          <!-- 已创建{{getGame(data.item.gameId)}} -->
        </div>
        <div v-else>
          <b-button @click="create(data.item)">创建</b-button>
        </div>
      </template>
      <template slot="activate" slot-scope="data">
        <div v-if="data.item.tronIsActivate">
          已激活
        </div>
        <div v-else>
        <b-button @click="active(data.item)">激活</b-button>
        </div>
      </template>
      <template slot="close" slot-scope="data">
        <div v-if="data.item.closeTime">
          已关闭
        </div>
        <div v-else>
          <b-button @click="close(data.item)">关闭</b-button>
        </div>
      </template>
      <template slot="settle" slot-scope="data">
        <div v-if="data.item.end">
          已结算
        </div>
        <div v-else>
          <b-button @click="settle(data.item)">结算</b-button>
        </div>

      </template>
      <template slot="withdraw" slot-scope="data">
        <div v-if="data.item.canClear">
          <b-button @click="withdraw(data.item)">提现</b-button>{{data.item.left}}
        </div>
        <div v-else>
          {{data.item.left}}
        </div>

      </template>
    </b-table>
  </div>
</template>


<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from 'vuex'
import fomoSport from '../js/FomoSportTron'
import store from '../store'
import moment from 'moment'
// const API_HOST = 'http://localhost:2005'
const API_HOST = 'http://api.bet.town'
const findIndex = (val, arr) => (arr.findIndex((el) => el > val) - 1)

export default {
  name: 'nba',
  store,
  data: function () {
    return {
      dark: true,
      fields: [
        'eventId',
        'tronGameId',
        {'key': 'title', 'label': '标题'},
        {'key': 'time', 'label': '开赛时间'},
        {'key': 'name1', 'label': '客场'},
        {'key': 'score1', 'label': '比分'},
        {'key': 'name2', 'label': '主场'},
        {'key': 'score2', 'label': '比分'},
        {'key': 'periodCn', 'label': '状态'},
        {'key': 'pool', 'label': '奖池'},
        {'key': 'create', 'label': '创建'},
        {'key': 'activate', 'label': '激活'},
        {'key': 'close', 'label': '关闭'},
        {'key': 'settle', 'label': '结算'},
        {'key': 'withdraw', 'label': '提现'}
      ],
      items: []
    }
  },
  methods: {
    create (record) {
      let {team1, team2} = record
      const items = ['1-4', '5-7', '8-11', '12-17', '18+']
      let _teams = []
      for (let i of items) {
        _teams.push(team1.nameEn + i)
      }
      for (let i of items) {
        _teams.push(team2.nameEn + i)
      }
      fomoSport.createGame(record.eventId + '', _teams)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.error(err)
        })
    },
    active (record) {
      console.log(record)
      let startTime = moment().unix()
      fomoSport.activate(record.tronGameId, startTime)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.error(err)
        })
    },
    close (record) {
      let closeTime = moment().unix()
      if (!record.tronGameId) {
        alert('没有创建')
        return
      }
      fomoSport.setCloseTime(record.tronGameId, closeTime)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.error(err)
        })
    },
    settle (record) {
      let winTeamIndex = null
      let range = [1, 5, 8, 12, 18, 100]
      let comment = `${record.score1} vs ${record.score2}`
      let deadline = moment().unix() + 3600 * 36
      let score1 = parseInt(record.score1)
      let score2 = parseInt(record.score2)
      if (score1 > score2) {
        const diff = score1 - score2
        winTeamIndex = findIndex(diff, range)
      } else {
        const diff = score2 - score1
        winTeamIndex = findIndex(diff, range) + 5
      }
      if (isNaN(winTeamIndex)) {
        alert('winTeamIndex invalid')
        return
      }
      fomoSport.settleGame(record.tronGameId, winTeamIndex, comment, deadline)
        .then(result => {
          console.log('settleGame result is %o', result)
        })
        .catch(err => {
          console.error(err)
        })
    },
    withdraw (record) {
      fomoSport.clearFund(record.tronGameId)
        .then(response => {
          console.log('withdraw response is %o', response)
        })
    },
    getGame (gameId) {
      return fomoSport.getGame(gameId)
    },
    getGameStatus (gameId) {
      return fomoSport.getGameStatus(gameId)
    },
    getList (cb) {
      let fields = {
        'eventId': true,
        'tronGameId': true,
        'title': true,
        'time': true,
        'name1': true,
        'score1': true,
        'name2': true,
        'score2': true,
        'periodCn': true,
        'tronIsCreated': true,
        'tronIsActivate': true
      }
      let time = moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')
      let filter = {fields, 'where': {'category': 'nba', time: {'gt': time}}, 'order': 'time asc', include: ['team1', 'team2']}
      axios.get(API_HOST + '/api/v1/service/matches', {
        params: {
          filter: filter
        }
      })
        .then(matches => {
          // console.log('matches is %o', matches)
          this.items = matches.data
          cb(null, matches.data)
        })
    },
    loading () {
      let self = this
      this.getList(function (err, items) {
        if (err) {
          console.error('getList err is %o', err)
        }
        fomoSport.setContract(window.tronWeb)
        for (let i in self.items) {
          if (!self.items[i].tronGameId) {
            continue
          }
          self.getGame(self.items[i].tronGameId)
            .then(result => {
              let closeTime = parseInt(result.closeTime._hex)
              let end = result.ended
              self.items[i] = Object.assign({}, self.items[i], {
                closeTime,
                end
              })

              self.$set(self.items, i, self.items[i])
              return result
            })
            .then(result => {
              let startTime = parseInt(result.gameStartTime._hex)
              if (startTime > 0) {
                self.getGameStatus(self.items[i].tronGameId)
                  .then(response => {
                    const now = moment().unix()
                    const pool = window.tronWeb.fromSun(parseInt(response.winningVaultInst) + parseInt(response.winningVaultFinal))
                    const left = pool - window.tronWeb.fromSun(response.totalWithdrawn)
                    let canClear = left > 0 && result.ended && !response.fundCleared && now > parseInt(result.withdrawDeadline)
                    // canClear = left > 0
                    self.items[i] = Object.assign({}, self.items[i], {
                      pool,
                      left,
                      canClear
                    })
                    self.$set(self.items, i, self.items[i])
                  })
              }
            })
            .catch(err => {
              console.error('getGame err is %o', err)
            })
        }
        setTimeout(function () {
          self.loading()
        }, 60000)
        // console.log('items is %o', self.items)
      })
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      hasInjectedTronWeb: state => state.tronWeb.isInjected,
      hasWeb3InjectedBrowser: state => state.user.hasWeb3InjectedBrowser,
      currentRoute: state => state.currentRoute,
      currentView: state => state.currentView,
      user: state => state.user,
      isDAppReady: state => state.isDAppReady,
      isValidUserBut: state => state.isValidUserBut,
      originalIsValidUserBut: state => state.originalIsValidUserBut,
      gravatarURL: state => state.gravatarURL,
      avatarCanvas: state => state.avatarCanvas,
      defaultRoute: state => state.defaultRoute
    })
  },
  watch: {
    hasInjectedTronWeb: {
      handler: function (tronWebConnectionValue) {
        console.log('hasInjectedTronWeb: ', tronWebConnectionValue)
        if (tronWebConnectionValue) {
          fomoSport.setContract(window.tronWeb)
          this.loading()
        }
      },
      deep: true,
      immediate: true
    },
    items: {
      handler: function (val, oldVal) {
        // console.log('newVal: %o', val)
        // this.items = val
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
