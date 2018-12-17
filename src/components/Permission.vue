
<template>
  <div id="permission">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="设置糖果管理员地址:"
                    label-for="exampleInput1"
                    description="">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.candyAddress"
                      required
                      placeholder="Enter address">
        </b-form-input>
      </b-form-group>

      <b-button type="button" @click="setCandy()" variant="primary">提交</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup2"
                    label="转移Owner地址:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.ownerAddress"
                      required
                      placeholder="Enter address">
        </b-form-input>
      </b-form-group>

      <b-button type="button" @click="setOwner()" variant="primary">提交</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
      <b-button type="button" @click="getOwner()"  variant="primary">接受owner</b-button>
    </b-form>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="exampleInputGroup3"
                    label="加入/移除黑名单:"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput3"
                      type="text"
                      v-model="form.blacklistAddress"
                      required
                      placeholder="Enter address">
        </b-form-input>
      </b-form-group>

      <b-button type="button" @click="addBlacklist()" variant="primary">拉黑</b-button>
      <b-button type="button" @click="delBlacklist()"  variant="primary">移除</b-button>
      <b-button type="reset" variant="danger">重置</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import candyBox from '../js/CandyBox'
import store from '../store'

export default {
  name: 'permission',
  store,
  data: function () {
    return {
      form: {
        candyAddress: '',
        ownerAddress: '',
        blacklistAddress: ''
      },
      show: true
    }
  },
  methods: {
    setCandy () {
      if (!this.form.candyAddress) {
        alert('address invalid')
        return
      }
      candyBox.setCandyManager(this.form.candyAddress)
        .then(response => {
          console.log(response)
          if (response && response.length === 0) {
            alert('成功')
          } else {
            alert('失败')
          }
        })
        .catch(err => {
          console.error(err)
          alert('失败')
        })
    },
    setOwner () {
      if (!this.form.ownerAddress) {
        alert('address invalid')
        return
      }
      candyBox.transferOwnership(this.form.ownerAddress)
        .then(response => {
          console.log(response)
          if (response && response.length === 0) {
            alert('成功')
          } else {
            alert('失败')
          }
        })
        .catch(err => {
          console.error(err)
          alert('失败')
        })
    },
    getOwner () {
      candyBox.acceptOwnership()
        .then(response => {
          console.log(response)
          if (response && response.length === 0) {
            alert('成功')
          } else {
            alert('失败')
          }
        })
        .catch(err => {
          console.error(err)
          alert('失败')
        })
    },
    addBlacklist () {
      candyBox.addBlacklist(this.form.blacklistAddress)
        .then(response => {
          console.log(response)
          if (response && response.length === 0) {
            alert('成功')
          } else {
            alert('失败')
          }
        })
        .catch(err => {
          console.error(err)
          alert('失败')
        })
    },
    delBlacklist () {
      candyBox.delBlacklist(this.form.blacklistAddress)
        .then(response => {
          console.log(response)
          if (response && response.length === 0) {
            alert('成功')
          } else {
            alert('失败')
          }
        })
        .catch(err => {
          console.error(err)
          alert('失败')
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
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
        console.log('hasInjectedTronWeb: ', tronWebConnectionValue)
        if (tronWebConnectionValue) {
          candyBox.setContract(window.tronWeb)
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
