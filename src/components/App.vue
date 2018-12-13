<template>
  <div id="app">
    <router-view
      :is-d-app-ready="isDAppReady"
      :current-view="currentView"
      :is-valid-user-but="isValidUserBut"
      @log-user-in="logUserIn"
      @log-user-out="logUserOut"
    >
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      logUserIn (evt) {
        this.$emit('log-user-in', evt)
      },
      logUserOut (evt) {
        this.$emit('log-user-out', evt)
      }
    },
    props: [ 'isDAppReady', 'currentView', 'isValidUserBut' ]
  }

</script>

<style>

</style>
