<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
import $ from 'jquery'

window.jQuery = window.$ = $

require('semantic-ui-css/semantic.min.js')
require('semantic-ui-css/semantic.min.css')

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>