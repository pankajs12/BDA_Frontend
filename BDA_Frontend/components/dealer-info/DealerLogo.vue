<template>
  <div style="min-height:0px">
<v-img :src="logo" :alt="dealer_name" contain style="max-height:75px;max-width:100%"></v-img>
  </div>
</template>

<script>
  export default {
    name:'DealerLogo',

    props:{
      dealer_name: {
        type: String,
        default: ''
      },
      logo: {
        type:String,
        default: 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png'
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
