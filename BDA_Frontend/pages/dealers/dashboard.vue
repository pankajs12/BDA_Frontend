<template>
<v-row>
  <DealerDashboardTabs />
  <v-col cols="12">
    <nuxt-child/>
  </v-col>
</v-row>
</template>

<script>

  export default {
    middleware: 'auth',
    name:'DealerDashboard',
    layout: 'dealersDashboard',
    computed: {
    user() {
      return this.$auth.user
    }
  },
    components: {
      DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs')
    },
    mounted() {

    },

  }
</script>

<style lang="scss" scoped>

</style>
