<template>
  <!-- App.vue -->

  <v-app>
    <v-navigation-drawer
      app
      :value="showSideNav"
      :clipped="clipped"
      disable-route-watcher
      disable-resize-watcher
    >
      <!-- -->
    </v-navigation-drawer>

    <v-app-bar extended app height="90" clipped-left color="bdablue">
      <template #extension>
        <v-container>
          <bread-crumbs></bread-crumbs>
        </v-container>
      </template>
      <v-app-bar-nav-icon @click.stop="updateDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <nuxt-link to="/">
          <main-website-logo></main-website-logo>
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items id="main_nav_items">
        <v-btn text to="/">{{ $t('navigation.home') }}</v-btn>
        <v-btn text to="/busqueda">{{ $t('navigation.search') }}</v-btn>
        <v-btn text to="/concesionarios">{{ $t('navigation.dealers') }}</v-btn> 
      </v-toolbar-items>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="pa-0">
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
    </v-content>

    <v-footer>
      <v-card min-height="200" tile flat style="width:100%">
        <v-card-text>
          Hello jello
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { get } from 'vuex-pathify'
import MainWebsiteLogo from '@/components/MainWebsiteLogo.vue'
export default {
  data () {
    return {
      clipped: true
    }
  },
  components: {
    MainWebsiteLogo,
    BreadCrumbs: () => import('@/components/breadcrumbs/BreadCrumbs.vue')
  },
  computed: {
    showSideNav: get('navigation/show_side_nav')
  },
  mounted () {},

  methods: {
    updateDrawer () {
      const navDisplay = !this.showSideNav
      this.$store.set('navigation/show_side_nav', navDisplay)
    }
  }
}
</script>
<style>
.v-toolbar__extension {
  background: #027be3;
}
.v-toolbar__content {
  background: white;
}
body,
* {
  font-family: futura-pt, sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: none;
  font-display: swap;
}
</style>
