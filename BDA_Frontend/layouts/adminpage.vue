<template>
  <v-app style="background-color:#f7f7f7">
<div>
    <!-- <ais-instant-search :indexName="searchIndex" :searchClient="searchClient">
    <algolia-faceted-sidebar/> -->
     <MainAppBarWithAlgolia/>
    <v-content>
    <nuxt />
    </v-content>
    </div>
  </v-app>
</template>
<script>
export default {
    name: 'adminpage',
  components: {
    // MainAppBarWithAlgolia: () => import('@/components/headers/MainAppBarWithAlgolia.vue'),
  },
  data() {
    return {
    }
  },

}


</script>

<style>

</style>
