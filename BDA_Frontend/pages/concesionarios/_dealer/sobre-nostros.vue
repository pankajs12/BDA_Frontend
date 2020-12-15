<template>
  <v-card flat tile>
    <v-card-title v-if="profile.dealer_name">
      <h1>{{profile.dealer_name}}</h1>
    </v-card-title>
    <v-card-text>
      <p v-text="profile && profile.about_us_text || ''"></p>
    </v-card-text>
<!-- <v-card-title><h1>{{profile.dealer_name}}</h1></v-card-title> -->
  {{profile}}

  </v-card>
</template>

<script>
  export default {
    name:'AboutDealerPage',
    asyncData({store}) {
      const profile = store.get('currentDealerProfile/profile')
      return {
        profile
      }
    },
    components: {
      AboutTab: () => import('@/components/dealer-profile/AboutTab')
    },
    mounted() {
      this.profile = this.$store.get('currentDealerProfile/profile')
    },
  }
</script>

<style lang="scss" scoped>

</style>
