<template>
  <div>
    <v-navigation-drawer app v-model="showTheSideNav" :clipped="true" disable-resize-watcher>
      <!-- <div ref="srp_filters">
        <ais-current-refinement-facets />
      </div> -->
    </v-navigation-drawer>
    <v-app-bar
      id="tbExtended"
      extended
      app
      :height="$vuetify.breakpoint.mdAndUp ? 100 : 70" clipped-left
       :extension-height="$vuetify.breakpoint.mdAndUp ? 100 : 100"
      color="bdablue"
    >
      <template #extension>
        <v-container fluid>
          <v-row align="center" no-gutters>
            <v-btn
            class="pt-10"
              text
              v-show="$route.name === 'busqueda'"
              @click.stop="showTheSideNav = !showTheSideNav"
              light
              color="white"
            >
              <v-icon dark>mdi-filter-variant</v-icon>
              Filter
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu
              id="searchMenu"
              transition="slide-x-transition"
              flat
              offset-x
              :close-on-content-click="false"
              nudge-top="5"
              nudge-width="0"
            >
              <template v-slot:activator="{ on }">
                <v-btn fab small color="transparent" v-on="on">
                  <v-icon color="white">mdi-magnify</v-icon>
                </v-btn>
              </template>
              <v-list class="py-0 px-0" tile style="background:#027be3;" flat>
                <v-list-item>
                  <v-col
                    :cols="$vuetify.breakpoint.mdAndUp ? 12 : 12"
                    id="searchBarContainer"
                    class="py-2"
                  >
                    <v-row align="center" no-gutters>
                      <v-col
                        :cols="$vuetify.breakpoint.mdAndUp ? 4 : 12"
                        :class="$vuetify.breakpoint.mdAndUp ? 'mb-0' : 'mb-2'"
                      >
                        <!-- <ais-search-box>
                          <div
                            slot-scope="{
                              currentRefinement,
                              isSearchStalled,
                              refine
                            }"
                          >
                            <v-text-field
                              hide-details
                              :style="{
                                borderRadius: $vuetify.breakpoint.mdAndUp
                                  ? '5px 0px 0px 5px'
                                  : '0px'
                              }"
                              solo
                              placeholder="search"
                              v-model="currentRefinement"
                              @input="
                                updateSearchRefinements(
                                  refine,
                                  currentRefinement
                                )
                              "
                            ></v-text-field>
                          </div>
                        </ais-search-box> -->
                      </v-col>
                      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                        <v-text-field
                          hide-details
                          style="border-radius: 0px 0px 0px 0px;"
                          v-model="zipcode"
                          :label="$t('labels.zipcode')"
                          solo
                        ></v-text-field>
                      </v-col>
                      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                        <distance-radius-dropdown></distance-radius-dropdown>
                        <!-- <v-select

                        hide-details
                        v-model="selectedDistance"
                        style="border-radius:0px;"
          :items="distanceSelections"
          :label="$t('labels.distance')"
          solo
        >
        </v-select> -->
                      </v-col>
                      <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                        <v-btn
                          color="primary"
                          block
                          primary
                          height="48"
                          :style="{
                            borderRadius: $vuetify.breakpoint.mdAndUp
                              ? '0 8px 8px 0px'
                              : '0px'
                          }"
                          tile
                          ><v-icon color="white">mdi-magnify</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn
              icon
              color="white"
              fab
              class="mx-2"
              width="56"
              height="56"
              @click="toggleSavedVehicles()"
              ><v-icon color="white">mdi-star</v-icon></v-btn
            >
          </v-row>
          <v-row class="breadcrumb-container">
            <v-container fluid>
              <bread-crumbs></bread-crumbs>
            </v-container>
          </v-row>
        </v-container>
      </template>

      <v-toolbar-title style="width: 180px" class="ml-0 pl-4">
        <nuxt-link to="/" nuxt exact>
          <main-website-logo></main-website-logo>
        </nuxt-link>
      </v-toolbar-title>
       <v-spacer></v-spacer>
      <div v-show="$vuetify.breakpoint.mdAndUp">
              <DesktopHeaderSearchBar v-bind="$data"/>
              </div>
      <v-spacer></v-spacer>
      <v-btn icon v-show="$vuetify.breakpoint.mdAndDown">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-items id="main_nav_items" v-show="$vuetify.breakpoint.mdAndUp">
        <v-btn text to="/" nuxt>{{ $t('navigation.home') }}</v-btn>
        <v-btn text to="/busqueda" nuxt>{{ $t('navigation.search') }}</v-btn>
        <v-btn text to="/concesionarios" nuxt>{{
          $t('navigation.dealers')
        }}</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { AisSearchBox } from 'vue-instantsearch'

export default {
  name: 'main-app-bar',
  data () {
    return {
      clipped: true,
      showSideNav: false,
      zipcode: undefined,
      showSaved: false
    }
  },
  components: {
    AisSearchBox,
    MainWebsiteLogo: () => import('@/components/MainWebsiteLogo'),
    DistanceRadiusDropdown: () =>
      import('@/components/form-components/DistanceRadiusDropdown'),
    AisCurrentRefinementFacets: () =>
      import('@/components/algolia-search/AisCurrentRefinementFacets'),
    BreadCrumbs: () => import('@/components/breadcrumbs/BreadCrumbs'),
    DesktopHeaderSearchBar: () => import('@/components/search/DesktopHeaderSearchBar'),
  },
  mounted () {
    this.zipcode = this.$store.get('userProfile/zipcode')
    this.$store.set('navigation/show_side_nav', false)
  },
  watch: {
    zipcode: function (val) {
      if (val.length > 3) {
        this.$store.set('userProfile/zipcode', val)
      }
    }
  },

  computed: {
    showSavedVehicles () {
      return this.$store.get('navigation/show_saved_vehicles')
    },
    showTheSideNav: {
      get () {
        return this.$store.get('navigation/show_side_nav')
      },
      set (val) {
        this.$store.set('navigation/show_side_nav', val)
      }
    }
  },
  methods: {
    updateDrawer () {
      this.$store.set('navigation/show_side_nav', this.showSideNav)
    },
    updateSearchRefinements (refine, value) {
      this.resultsLoaded = false
      refine(value)
      setTimeout(() => {
        this.resultsLoaded = true
      }, 500)
    },
    toggleSavedVehicles () {
      const isVisable = this.$store.get('navigation/show_saved_vehicles')
      this.$store.set('navigation/show_saved_vehicles', !isVisable)
    }
  }
}
</script>
<style>
ul#mainBreadCrumbs {
    overflow: hidden;
    max-height: 20px;
    width: 2000px;
}
</style>
<style lang="scss" scoped></style>
