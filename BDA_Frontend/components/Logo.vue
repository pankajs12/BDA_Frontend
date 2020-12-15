<template>
  <div>
    <img :src="logo" style="max-width:100px" alt="Buscador De Auto logo"/>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    data() {
      return {
        logo: 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png'
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
