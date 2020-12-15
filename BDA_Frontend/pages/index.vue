<template>
  <v-layout>
    <LoadingIndicator v-if="showLoader" />
    <v-container v-else fluid class="pa-0 ma-0" style="background:white;">
      <homepage-hero>
         <div id="hero-overlay"></div>
        <search-with-tabs></search-with-tabs>
      </homepage-hero>
      <v-row>
        <shop-by-types></shop-by-types>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name:'MainIndexHome',
  components: {
    HomepageHero: () => import('@/components/home-components/HomepageHero.vue'),
    SearchWithTabs: () => import('@/components/search/SearchWithTabs.vue'),
    ShopByTypes: () => import('@/components/home-components/ShopByType.vue'),
    LoadingIndicator: () => import('@/components/LoadingIndicator.vue')
  },
  data() {
    return {
      showLoader: true,
    }
  },
       head() {
       return {
           title: 'Bienvenido a Buscador de Auto',
       }
  },
  beforeMount() {

  },
  beforeRouteLeave (to, from, next) {
    this.showLoader = true
    next()
  },
  mounted() {
    setTimeout(() => {
     this.showLoader = false;
    }, 500);

  }
}
</script>

<style scoped>
div#hero-overlay {
    position: absolute;
    width: 100%;
    height: 500px;
    background:rgba(2, 123, 227, 0.09);
    left: 0;
    top: 0px;
}
</style>
<style>
/* div#__layout {
    overflow-x: hidden;
} */
</style>

