<template>
  <img alt="Vue logo" src="./assets/image.png" style="height:350px">
  <ScriptOutline msg="Welcome to Your Vue.js App"/>
  <ScriptOutput></ScriptOutput>
</template>

<script>
import ScriptOutline from './components/ScriptOutline.vue'
import ScriptOutput from './components/ScriptOutput.vue'

export default {
  name: 'App',
  components: {
    ScriptOutline,
    ScriptOutput
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
  max-width: 800px;
}
</style>
