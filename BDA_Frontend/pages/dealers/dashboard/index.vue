<template>
<v-row>
<h2>Welcome {{dealerName}} </h2>

</v-row>

</template>

<script>
import { get } from 'vuex-pathify'
  export default {
    name:'DealerDashboard',
  computed: {
    dealerName: get('loggedInDealer@dealerData.dealer_name')
  },
  mounted() {
    const dealerData = window.sessionStorage.getItem('dealerData') ? JSON.parse(window.sessionStorage.getItem('dealerData')) : undefined
    if(!this.dealerName){
      this.$store.set('loggedInDealer/dealerData' , dealerData)
    }


  },
  }
</script>

<style lang="scss" scoped>

</style>
