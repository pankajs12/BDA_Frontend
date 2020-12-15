<template>
  <v-app style="background-color:#f7f7f7">
<div v-if="searchClient">
    <ais-instant-search :indexName="searchIndex" :searchClient="searchClient">
    <algolia-faceted-sidebar/>
     <MainAppBarWithAlgolia/>
    <v-content>

      <v-container :class="{'pa-0 ma-0 fullwidth-container': isHome ? true : 'py-0' }" :fluid="$vuetify.breakpoint.lgAndDown">
    <nuxt />
      </v-container>
    </v-content>
    </ais-instant-search>
    <MainFooter/>
    </div>
  </v-app>
</template>
<script>
import algoliasearch from 'algoliasearch/lite'
import { AisInstantSearchSsr , AisInstantSearch } from 'vue-instantsearch'
export default {
    name: 'DefaultLayout',
      provide() {
      return {
        // It was provided by the `rootMixin` but it's not possible to have access
        // to it anymore. That's why we have to provide it manually. The plugin
        // is in charge of exposing `$instantsearch` on the App instance.
        // eslint-disable-next-line camelcase
        $_ais: this.$instantsearch
      }
    },
  // middleware: 'algolia',

  components: {
    AisInstantSearch,
    AlgoliaFacetedSidebar: () => import('@/components/algolia-search/AlgoliaFacetedSidebar'),
    MainAppBarWithAlgolia: () => import('@/components/headers/MainAppBarWithAlgolia.vue'),
    MainFooter: () => import('@/components/footer/MainFooter.vue'),
  },
  data() {
    return {
      searchClient: undefined,
    }
  },
  mounted() {
    if(this.$vuetify.breakpoint.smAndDown){
      this.$store.set('navigation/show_side_nav' , false)
    }
    this.searchClient =  algoliasearch('44COJULZY3','dadeb0d0b44758ca3ae8a69ac98f85a1')
  },
  computed: {
    searchIndex () {
      return this.$store.get('algoliaState/current_index')
    },
    isHome () {
      return this.$route.fullPath === '/' ? true : false
    }
  },

}


</script>

<style>
.theme--light.v-application {
  background-color: #f7f7f7 !important;
}

.v-toolbar__extension {
  background: #027be3;
}
.v-toolbar__content {
  background: white;
}
.v-application .primary--text {
  color: #027be3 !important;
}

body,
*,
.v-application .title,
.v-application .body-2,
.v-application .subtitle-1 {
  font-family: futura-pt, sans-serif !important;
  font-weight: 500;
  font-style: normal;
  text-transform: none;
  font-display: swap;
}

#main_nav_items .v-btn span {
  font-weight: bold !important;
  letter-spacing: 0px;
  text-transform: uppercase;
  font-size: 0.9em;
}
#main_nav_items .v-btn--active span::before {
  background: white !important;
  content: '';
  width: 100%;
  margin-top: 10px;
  border-bottom: 2px solid #027be3;
  position: absolute;
  top: 15px;
}
#main_nav_items .v-btn::before {
  background-color: transparent;
}
a {
  text-decoration: none;
}
.fullwidth-container {
  max-width:100%;
}
</style>
