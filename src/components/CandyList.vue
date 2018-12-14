
<template>
  <div id="list">
    <b-btn v-b-modal.modal1 variant="primary">添加糖果</b-btn>

    <!-- Modal Component -->
    <b-modal id="modal1" hide-footer title="添加糖果">
      <b-container fluid>
        <b-row class="my-1" v-for="(type, index) in types" :key="index">
          <b-col sm="3">
            <label :for="`type-${type.key}`">{{ type.title }}:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="type.val" :id="`candy-${type.key}`" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row>

        </b-row>
      </b-container>
        <b-button block @click="save">保存</b-button>
    </b-modal>
    <b-table responsive striped hover :dark="dark" :fields="fields" :items="items">
      <template slot="pool" slot-scope="data">
        <div v-if="data.item.pool">{{data.item.pool}}</div>
      </template>
      <template slot="left" slot-scope="data">
        <div>
          {{data.item.total - data.item.hasReceived}}
        </div>
      </template>
      <template slot="status" slot-scope="data">
        <div>
          {{data.item.isDeleted ? '无效': '有效'}}
        </div>
      </template>
      <template slot="manager" slot-scope="data">
        <b-button>详情</b-button>
        <b-button>修改</b-button>
        <b-button>取回糖果</b-button>
        <b-button>删除</b-button>
        <div v-if="data.item.tronIsCreated">
          <!-- 已创建{{getGame(data.item.gameId)}} -->
        </div>
        <div v-else>
          <!-- <b-button @click="create(data.item)">创建</b-button> -->
        </div>
      </template>
    </b-table>
  </div>
</template>
<script>
// import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapState } from 'vuex'
import candyBox from '../js/CandyBox'
import store from '../store'
export default {
  name: 'list',
  store,
  data: function () {
    return {
      dark: true,
      types: [
        { key: 'address', title: 'token地址', val: '' },
        { key: 'name', title: '糖果名称', val: '' },
        { key: 'total', title: '糖果总量', val: '' },
        { key: 'once', title: '每次领取', val: '' },
        { key: 'imageUrl', title: '图标URL', val: '' },
        { key: 'bgUrl', title: '背景URL', val: '' },
        { key: 'title', title: '糖果标题', val: '' },
        { key: 'introduction', title: '一句话介绍', val: '' },
        { key: 'link', title: '空投页面链接', val: '' },
        { key: 'order', title: 'order', val: '' }
      ],
      fields: [
        { key: 'address', label: '糖果地址' },
        { key: 'name', label: '糖果名称' },
        { key: 'total', label: '设定总量' },
        { key: 'hasReceived', label: '已领取' },
        { key: 'left', label: '应剩余量' },
        { key: 'balance', label: '账户余额' },
        { key: 'status', label: '状态' },
        { key: 'manager', label: '管理' }
      ],
      items: []
    }
  },
  methods: {
    save () {
      for (let t of this.types) {
        if (t.val === '') {
          alert(`${t.title}不能为空`)
          return
        }
      }
      candyBox.setContract(window.tronWeb)
      let t = this.types
      candyBox.addCandy(
        t[0].val,
        t[1].val,
        t[2].val,
        t[3].val,
        t[4].val,
        t[5].val,
        t[6].val,
        t[7].val,
        t[8].val,
        t[9].val
      )
        .then(response => {
          console.log(response)
        })
    },
    detail (record) {

    },
    async loading () {
      let self = this
      candyBox.setContract(window.tronWeb)
      const total = await candyBox.getTotal()
      console.log('candy total is %d', total)
      let cbs = []
      for (let i = 1; i <= total; i++) {
        let cb = await candyBox.getCandy(i)
        let o = {}
        o.address = candyBox.tronWeb.address.fromHex(cb.candy[0])
        o.name = cb.candy[1]
        o.total = candyBox.tronWeb.fromSun(parseInt(cb.candy[2]._hex))
        o.hasReceived = candyBox.tronWeb.fromSun(parseInt(cb.candy[3]))
        o.once = candyBox.tronWeb.fromSun(parseInt(cb.candy[4]))
        o.isDeleted = cb.detail[5]
        cbs.push(o)
      }
      console.log(cbs)
      this.items = cbs
      for (let i in self.items) {
        candyBox.getBalance(self.items[i].address, candyBox.address)
          .then(balance => {
            const b = parseInt(balance.balance._hex)
            const bb = candyBox.tronWeb.fromSun(b)
            console.log('contrac balance is %s', bb)
            self.items[i] = Object.assign({}, self.items[i], {
              balance: bb
            })
            self.$set(self.items, i, self.items[i])
          })
      }
    }
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
