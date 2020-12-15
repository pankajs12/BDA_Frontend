<template>
<v-container fluid>
  <v-row>
    <v-col cols="8">
<v-card flat tile>
  <v-card-title>
    <h1>{{profile.dealer_name}}</h1>
  </v-card-title>
  <v-card-text>
    <p v-text="profile.about_us_text"/>
  </v-card-text>
</v-card>
    </v-col>
    <v-col cols="4">
 <DealerInfoSidebar/>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
  export default {
    name:'DealerServicesInfo',
    props: ['profile'],
    components: {
      DealerInfoSidebar: () => import('@/components/dealer-info/DealerInfoSideBar.vue'),
    }

  }
</script>

<style lang="scss" scoped>

</style>
