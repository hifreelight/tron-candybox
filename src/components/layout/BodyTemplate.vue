<template>
  <component class="body-template"
    :is="currentView"
  >
  </component>
</template>

<script>
  export default {
    name: 'body-template',
    props: ['currentView']
  }
</script>

<style scoped>

</style>
