<template>
  <div class="heard" id="header">
		<div class="heard_img">
			<img src="/static/img/2@2x.png">
			BETTOWN
		</div>
		<div class="lan" v-on:click="choose($event)">
			<div class="contant">{{contant}}</div>
			<div class="down"><img src="/static/img/down.png"></div>
			<ul v-if="down" id="down">
				<li @click="lan($event)">English</li>
				<li @click="lan($event)">China</li>
				<li @click="lan($event)">Korean</li>
			</ul>
		</div>
		<div class="nav">
			<ul>
				<li><a href="">Sports</a></li>
				<li><a href="">Games</a></li>
				<li><a href="">White Paper</a></li>
				<li><a href="">Contact US</a></li>
				<li><a href="">FAQ</a></li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
  export default {
    name: 'header-template',
    data: function () {
      return {
        user: this.$store.state.user,
        down: false,
        contant: 'English',
        isActive: false
      }
    },
    methods: {
      lan (event) {
        this.contant = event.currentTarget.innerText
        console.log(this.contant)
      },
      choose (e) {
        this.down = !this.down
        e.stopPropagation()
      }
    }
  }
  // import '../../../static/css/clear-web.css'
  // import '../../../static/components/header.css'
</script>

<style scoped>
  /* @import '../../../static/css/clear-web.css';
  @import '../../../static/components/header.css' */
</style>
