<template>
<v-card flat tile :class="{'pa-10' : !isMobile } ">
  <v-card-text>
    <v-row>
      <v-col cols="12" md="8">
          <v-card-title>
    <h1>{{profile.dealer_name}}</h1>
  </v-card-title>
    <p v-text="profile.about_us_text"/>
      </v-col>
      <v-col cols="12" md="4">
         <DealerInfoSidebar :profile="profile"/>
      </v-col>
    </v-row>
  </v-card-text>
</v-card>

</template>

<script>
  export default {
    name:'DealerIntro',
    props: ['profile'],
    components: {
      DealerInfoSidebar: () => import('@/components/dealer-info/DealerInfoSideBar.vue'),
    },
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint.smAndDown
      }
    },

  }
</script>

<style lang="scss" scoped>

</style>
