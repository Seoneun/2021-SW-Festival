<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <upload-image></upload-image>
  </div>
</template>

<script>
import UploadImage from './components/UploadImage.vue'

export default {
  name: 'App',
  components: {
    UploadImage
  }
}
</script>

<style>
</style>
