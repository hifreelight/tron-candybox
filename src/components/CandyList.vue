
<template>
  <div id="list">
    <b-btn v-b-modal.addCandy variant="primary">添加糖果</b-btn>

    <!-- Modal Component addCandy-->
    <b-modal id="addCandy" ref="addCandy" hide-footer title="添加糖果">
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

    <!-- Modal Component editCandy-->
    <b-modal id="editCandy" ref="editCandy" hide-footer title="修改糖果">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label >ID</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.id" type="text" v-bind:readonly="true"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >糖果地址</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.address"  type="text" v-bind:readonly="true"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >糖果名称</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.name"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('name')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >糖果总量</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.total"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('total')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >每次领取</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.once"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('once')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >图标URL</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.imageUrl"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('imageUrl')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >背景URL</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.bgUrl"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('bgUrl')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >标题</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.title"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('title')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >一句话介绍</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.introduction"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('introduction')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >空投页面链接</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.link"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
          <b-col sm="3"><b-button block @click="update('link')">更新</b-button></b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >order</label>
          </b-col>
          <b-col sm="6">
            <b-form-input v-model="temp.order"  type="text" v-bind:readonly="true"></b-form-input>
          </b-col>
          <b-col sm="3"></b-col>
        </b-row>
      </b-container>
        <!-- <b-button block @click="update">更新</b-button> -->
    </b-modal>

    <!-- Modal Component editPubCandy-->
    <b-modal id="editPubCandy" ref="editPubCandy" hide-footer title="修改发布糖果">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label >ID</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="temp.id" type="text" v-bind:readonly="true"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >order</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="temp.order"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >是否删除</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="temp.isDeleted"  type="text" v-bind:readonly="false"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
        <b-button block @click="updatePub">更新</b-button>
    </b-modal>

    <!-- Modal Component receiveCandy-->
    <b-modal id="receiveCandy" ref="receiveCandy" hide-footer title="取回糖果">
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="3">
            <label >数量</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="receive.amount" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="3">
            <label >取回到地址</label>
          </b-col>
          <b-col sm="9">
            <b-form-input v-model="receive.toAddress"  type="text"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
        <b-button block @click="receiveCandy()">取回</b-button>
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
        <!-- <b-button>详情</b-button> -->
        <b-button @click="editCandy(data.item)">修改</b-button>
        <b-button @click="editPubCandy(data.item)">修改发布糖果</b-button>
        <b-button @click="receiveShow(data.item)">取回糖果</b-button>

        <b-button v-if="data.item.isDeleted < 1" @click="delCandy(data.item)">删除</b-button>
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
import BigNumber from 'bignumber.js'

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
      items: [],
      detail: {},
      temp: {},
      receive: {
        amount: 0,
        address: '',
        toAddress: '',
        left: 0
      }
    }
  },
  methods: {
    hideAddModal () {
      this.$refs.addCandy.hide()
    },
    hideEditModal () {
      this.$refs.editCandy.hide()
    },
    hideEditPubModal () {
      this.$refs.editPubCandy.hide()
    },
    receiveShow (record) {
      this.receive.address = record.address
      this.receive.toAddress = ''
      this.receive.amount = 0
      this.receive.left = record.balance
      this.$refs.receiveCandy.show()
    },
    receiveCandy () {
      const self = this
      console.log(this.receive)
      console.log(this.receive.amount)
      if (this.receive.amount <= 0 || this.receive.amount > this.receive.left) {
        alert('amount invalid')
        return
      }
      if (!this.receive.toAddress) {
        alert('address invalid')
        return
      }
      candyBox.transferCandy(this.receive.address, this.receive.toAddress, new BigNumber(this.receive.amount).times(1e6).toNumber())
        .then(response => {
          this.$refs.receiveCandy.hide()
          self.loading()
        })
    },
    save () {
      const self = this
      for (let t of this.types) {
        if (t.val === '') {
          alert(`${t.title}不能为空`)
          return
        }
      }
      // candyBox.setContract(window.tronWeb)
      let t = this.types
      candyBox.addCandy(
        t[0].val,
        t[1].val,
        new BigNumber(t[2].val).times(1e6).toNumber(),
        new BigNumber(t[3].val).times(1e6).toNumber(),
        t[4].val,
        t[5].val,
        t[6].val,
        t[7].val,
        t[8].val,
        t[9].val
      )
        .then(response => {
          console.log(response)
          self.hideAddModal()
          self.loading()
        })
    },
    update (attr) {
      const self = this
      let d = this.temp
      switch (attr) {
        case 'name':
          candyBox.editName(d.id, d.name)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'total':
          candyBox.editTotal(d.id, new BigNumber(d.total).times(1e6).toNumber())
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'once':
          candyBox.editOnce(d.id, new BigNumber(d.once).times(1e6).toNumber())
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'imageUrl':
          candyBox.editImageUrl(d.id, d.imageUrl)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'bgUrl':
          candyBox.editBgUrl(d.id, d.bgUrl)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'title':
          candyBox.editTitle(d.id, d.title)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'introduction':
          candyBox.editIntroduction(d.id, d.introduction)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
        case 'link':
          candyBox.editLink(d.id, d.link)
            .then(response => {
              console.log(response)
              self.hideEditModal()
              self.loading()
            })
          break
      }
    },
    updateAll () {
      console.log(this.temp)
      let d = this.temp
      candyBox.editCandy(
        d.id,
        d.address,
        d.name,
        new BigNumber(d.total).times(1e6).toNumber(),
        new BigNumber(d.once).times(1e6).toNumber(),
        d.imageUrl,
        d.bgUrl,
        d.title,
        d.introduction,
        d.link,
        d.order
      )
        .then(response => {
          console.log(response)
          self.hideEditModal()
          self.loading()
        })
    },
    updatePub () {
      const self = this
      console.log(this.temp)
      let d = this.temp
      candyBox.editPubCandy(
        d.id,
        d.order,
        d.isDeleted
      )
        .then(response => {
          console.log(response)
          self.hideEditPubModal()
          self.loading()
        })
    },
    showDetail (record) {
      this.detail = record
    },
    editCandy (record) {
      this.temp = record
      this.$refs.editCandy.show()
    },
    editPubCandy (record) {
      this.temp = record
      this.$refs.editPubCandy.show()
    },
    delCandy (record) {
      const self = this
      console.log(record.id)
      candyBox.delCandy(record.id)
        .then(response => {
          self.loading()
        })
    },
    async loading () {
      // let cb = await candyBox.getCandy(1)
      // console.log(cb)
      // candyBox.getTotal(function (total) {
      //   console.log('candy total is %d', total)
      // })
      let self = this
      const total = await candyBox.getTotal()
      console.log('candy total is %d', total)
      let cbs = []
      for (let i = 1; i <= total; i++) {
        let cb = await candyBox.getCandy(i)
        let o = {}
        o.id = i
        o.address = candyBox.tronWeb.address.fromHex(cb.candy[0])
        o.name = cb.candy[1]
        o.total = candyBox.tronWeb.fromSun(parseInt(cb.candy[2]._hex))
        o.hasReceived = candyBox.tronWeb.fromSun(parseInt(cb.candy[3]))
        o.once = candyBox.tronWeb.fromSun(parseInt(cb.candy[4]))
        o.isDeleted = cb.detail[5]
        o.imageUrl = cb.detail[0]
        o.bgUrl = cb.detail[1]
        o.title = cb.detail[2]
        o.introduction = cb.detail[3]
        o.link = cb.detail[4]
        o.order = cb.detail[6]
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
        const self = this
        console.log('hasInjectedTronWeb: ', tronWebConnectionValue)
        if (tronWebConnectionValue) {
          candyBox.setContract(window.tronWeb)
          self.loading()
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
