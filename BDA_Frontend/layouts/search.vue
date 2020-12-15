<template>
  <v-app>
    <ais-instant-search-ssr>
    <AlgoliaFacetedSidebar v-if="!$route.params.vin"/>
    <MainAppBarWithAlgolia/>

    <nuxt />
    </ais-instant-search-ssr>
  </v-app>
</template>
<script>
import { AisInstantSearchSsr } from 'vue-instantsearch'
export default {
  name: 'SearchLayout',
      provide() {
      return {
        // It was provided by the `rootMixin` but it's not possible to have access
        // to it anymore. That's why we have to provide it manually. The plugin
        // is in charge of exposing `$instantsearch` on the App instance.
        // eslint-disable-next-line camelcase
        $_ais: this.$instantsearch
      }
    },
  middleware: 'algolia',
  components: {
    AisInstantSearchSsr,
    AlgoliaFacetedSidebar: () => import('@/components/algolia-search/AlgoliaFacetedSidebar'),
    MainAppBarWithAlgolia: () => import('@/components/headers/MainAppBarWithAlgolia.vue'),
  }
}


</script>

<style lang="scss" scoped></style>
