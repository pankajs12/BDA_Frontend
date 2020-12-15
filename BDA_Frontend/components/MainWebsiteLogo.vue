<template>
<v-img :src="logo"></v-img>
</template>

<script>
  export default {
    name:'MainWebsiteLogo',
    props: {
      logo: {
        type:String,
        default: 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
