<template>
  <v-container :fluid="$vuetify.breakpoint.lgAndDown">
    <LoadingIndicator v-if="showLoader" />
    <AisInstantSearchSsr>
      <ais-configure :distinct.camel="true"
                     :aroundLatLngViaIP="around_lat_lng_by_ip_address"
                     :aroundRadius="searchRadius" :getRankingInfo="true">
      </ais-configure>
      <v-content v-if="$route.params.vin">
        <nuxt-child />
      </v-content>
      <v-content v-if="!$route.params.vin">
        <nuxt-child />
        <v-container fluid>
          <v-row>
            <v-col cols="12" id="breadcrumbContainer">
              <ais-hierarchical-menu style="display:none" :attributes="[
                  'categories.lvl0',
                  'categories.lvl1',
                  'categories.lvl2',
                  'categories.lvl3'
                ]" show-more>
              </ais-hierarchical-menu>
              <v-row style="flex-wrap: nowrap;">
                <v-col cols="12" class="flex-grow-0 flex-shrink-0 pb-0">
                  <h1 class="text-capitalize">
                    {{ pageH1 || $t('labels.search_all_inventory') }}
                  </h1>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col class="align-items-center pt-0" cols="12" sm="7">
                  <ais-current-refinements
                                           :excluded-attributes="['selling_price']">
                    <v-chip-group slot-scope="{ items, createURL }"
                                  align="start">
                      <v-col cols="4" class="" v-for="item in items"
                             :key="item.attribute">
                        <v-chip close @click.prevent="item.refine(refinement)"
                                text-color="white" color="bdablue"
                                v-for="refinement in item.refinements" :key="[
            refinement.attribute,
            refinement.type,
            refinement.value,
            refinement.operator
          ].join(':')" style="width:100%">
                          {{ translateAttribute(item.label) }}:
                          {{ refinement.value }}

                        </v-chip>

                      </v-col>
                    </v-chip-group>
                  </ais-current-refinements>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="d-flex justify-end align-items-center" cols="12"
                       sm="5">
                  <ais-sort-by :items="sortFilterOptions">
                    <div slot-scope="{ items, currentRefinement, refine }">
                      <v-select filled solo return-object
                                @change="refine(selectedIndicie.value)"
                                v-model="selectedIndicie"
                                :prepend-inner-icon="selectedIndicie.icon"
                                background-color="white" :items="items"
                                label="search filter">
                      </v-select>
                    </div>
                  </ais-sort-by>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <div v-if="resultsLoaded">
            <ais-infinite-hits :show-previous="false" style="width:100%;">
              <v-row slot-scope="{ items, refinePrevious, refineNext }">
                <v-item-group width="" v-model="favorite" multiple
                              style="width:100%;">
                  <v-row>
                    <v-col cols="12" sm="6" md="4" lg="4" xl="3"
                           v-for="item in items" :key="item.objectID">
                      <v-lazy>
                        <v-item style="max-width:100%">
                          <vehicle-hit :vehicle-data="item"></vehicle-hit>
                        </v-item>
                      </v-lazy>
                    </v-col>
                  </v-row>
                </v-item-group>
                <v-btn color="primary" v-show="!loadingMore" ref="refineButton"
                       @click="refineNext" style="display:none">
                  Show more results
                </v-btn>
                <v-col v-show="loadingMore" cols="12">
                  <v-progress-linear indeterminate color="bdablue">
                  </v-progress-linear>
                </v-col>
              </v-row>
            </ais-infinite-hits>
          </div>
        </v-container>
      </v-content>

      <v-bottom-sheet @input="handleSheetEvent" transition="slide-y-transition"
                      scrollable v-model="showSavedVehicles">
        <v-card height="600px">
          <v-card-title class="subheader">{{$t('labels.saved_vehicles')}}
          </v-card-title>
          <v-card-text style="height:600px;">
            <v-row v-if="resultsLoaded">
              <v-col cols="12" md="3" v-for="(v, i) in savedVehicles" :key="i">
                <vehicle-hit :vehicle-data="v"></vehicle-hit>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </AisInstantSearchSsr>
  </v-container>
</template>

<script>
  const axios = require('axios')
  import {
    get
  } from 'vuex-pathify'
  import MainWebsiteLogo from '~/components/MainWebsiteLogo.vue'
  import VehicleHit from '~/components/vehicle-hits/VehicleHit.vue'
  import FilterListWithCheckboxes from '~/components/search/FilterListWithCheckboxes.vue'
  import {
    set,
    sync
  } from 'vuex-pathify'
  import utils from '~/assets/js/utils'

  import {
    AisRangeInput,
    AisSortBy,
    AisMenuSelect,
    AisConfigure,
    AisHierarchicalMenu,
    AisClearRefinements,
    AisStateResults,
    AisInstantSearchSsr,
    AisRefinementList,
    AisBreadcrumb,
    AisSearchBox,
    AisCurrentRefinements,
    AisHighlight,
    AisInfiniteHits,
    createInstantSearch
  } from 'vue-instantsearch'

  import qs from 'qs'

  export default {
    name: 'SeachPage',
    provide() {
      return {
        // It was provided by the `rootMixin` but it's not possible to have access
        // to it anymore. That's why we have to provide it manually. The plugin
        // is in charge of exposing `$instantsearch` on the App instance.
        // eslint-disable-next-line camelcase
        $_ais: this.$instantsearch
      }
    },
    layout: 'search',
    middleware: 'algolia',
    async asyncData({
      app,
      route,
      router
    }) {
      const vehicleCondition = route.params.condition ? [route.params
        .condition
      ] : []
      const vehicleMake = route.params.make ? [route.params.make] : []
      const vehicleModel = route.params.model ? [route.params.model] : []
      const pageH1 = route.path
        .replace('busqueda', '')
        .split('/')
        .filter(i => i !== '')
        .join(' ')
      const params = qs.parse(route.fullPath.replace(/^.*\?/, ''))
      route.path.split('/')[0]
      const $instantsearch = app.$instantsearch
      await $instantsearch.findResultsState({
        // find out which parameters to use here using ais-state-results
        query: params.query ? params.query : route.query.s ? route.query
          .s : '',
        hitsPerPage: 18,
        getRankingInfo: 'true',
        aroundLatLngViaIP: true,
        facets: ['condition', 'make', 'model', 'trim', 'msrp_price',
          'sales_price', 'body', 'year', 'style', 'dealer_name'
        ],
        hierarchicalFacets: [{
          name: 'categories.lvl0',
          attributes: [
            route.params.condition,
            route.params.make,
            route.params.model,
            route.params.trim
          ],
          separator: ' > ',
          rootPath: null,
          showParentLevel: true
        }],
        disjunctiveFacets: ['make', 'condition', 'model', 'trim', 'body'],
        disjunctiveFacetsRefinements: {
          condition: vehicleCondition,
          make: vehicleMake,
          model: vehicleModel
          // trim: params.trim ? [`${params.trim}`] : [],
        }
      })
      return {
        instantSearchState: $instantsearch.getState(),
        selectedIndicie: {
          "value": "price_low_to_high",
          "label": "Precio: de más bajo a más alto",
          "text": "Precio: de más bajo a más alto",
          "icon": "mdi-trending-down"
        },

        pageH1,
        loading: false,
        transition: 'scale-transition',
      }
    },

    data() {
      return {
        slider: 999,
        showLoader: false,
        selectedSortOption: {},
        favorite: [],
        loadingMore: false,
        resultsLoaded: false,
        transitions: [{
            text: 'None',
            value: undefined
          },
          {
            text: 'Fade Transition',
            value: 'fade-transition'
          },
          {
            text: 'Scale Transition',
            value: 'scale-transition'
          }
        ],
        searchFilters: [{
            attribute: 'condition',
            title: this.$t('labels.condition'),
            isActive: true
          },
          {
            attribute: 'make',
            title: this.$t('labels.make'),
            isActive: true
          },
          {
            attribute: 'model',
            title: this.$t('labels.model')
          },
          {
            attribute: 'trim',
            title: this.$t('labels.trim')
          },
          {
            attribute: 'year',
            title: this.$t('labels.year')
          },
          {
            attribute: 'body',
            title: this.$t('labels.body')
          },
          {
            attribute: 'style',
            title: this.$t('labels.style')
          },
          {
            attribute: 'dealer_name',
            title: this.$t('labels.dealers')
          }
        ],
        activeBtn: 1,
        showSideNav: false,
        around_lat_lng_by_ip_address: true,
        searchRadius: 'all',
        clipped: true,
        distanceSelections: [{
            text: '25 miles',
            value: 25
          },
          {
            text: '50 miles',
            value: 50
          },
          {
            text: '75 miles',
            value: 75
          },
          {
            text: '100 miles',
            value: 100
          },
          {
            text: '150 miles',
            value: 150
          },
          {
            text: '200 miles',
            value: 200
          },
          {
            text: '250 miles',
            value: 250
          },
          {
            text: '300 miles',
            value: 300
          },
          {
            text: '400 miles',
            value: 400
          },
          {
            text: '500 miles',
            value: 500
          },
          {
            text: '600 miles',
            value: 600
          },
          {
            text: 'all',
            value: 'all'
          }
        ],
        radiusZipcode: null,
        location: null,
        latitude: null,
        longitude: null,
        offsetTop: 0,
        selectedDistance: 'all',
        resultsMessage: null
      }
    },

    computed: {
      savedVehicles() {
        return this.$store.get('savedVehicles/vehicles')
      },
      showSavedVehicles() {
        return this.$store.get('navigation/show_saved_vehicles')
      },
      sortFilterOptions() {
        return this.$t('labels.filters')
      },
      Noresults() {
        return this.$store.get('navigation/no_results_found')
      }
    },

    watch: {
      selectedDistance: function (distance) {
        if (distance !== 'all') {
          const miles = Math.floor(distance / 0.00062137)
          this.searchRadius = miles
        } else {
          this.searchRadius = 'all'
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.showLoader = true
      next()
    },

    mounted() {

      this.selectedSortOption = this.$t('labels.filters[0]')

      if (this.$vuetify.breakpoint.lgAndUp) {
        this.$store.set('navigation/show_side_nav', true)
      } else {

      }
      let self = this
      setTimeout(() => {
        if (this.instantsearch && process.browser) {
          this.instantsearch.on('render', state => {
            const lastResults = self.instantsearch.helper.state
            // self.instantsearch.routing.stateMapping.stateToRoute(lastResults)
          })
        }
      }, 1000)



      this.onScroll()
      this.$store.set('navigation/no_results_found', false)
      self.resultsMessage = null
      const LoadedResults = this.instantSearchState.lastResults.hits.length
      if (LoadedResults < 9) {
        this.loadingMore = false
      }
      if (LoadedResults === 0) {
        this.$store.set('navigation/no_results_found', true)
        this.resultsMessage = this.$t('labels.no_results_found')
        document.body.addEventListener(
          'click',
          function () {
            self.$refs.clearRefinementButton.click()
            self.$store.set('navigation/no_results_found', false)
          }, {
            once: true
          }
        )
      }

      axios
        .get(
          'https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572'
        )
        .then(res => {
          self.location = res.data
          self.radiusZipcode = self.location.postal
          window.localStorage.setItem('location', JSON.stringify(self
            .location))
        })
        .then(() => {
          self.latitude = +parseFloat(self.location.latitude).toFixed(6)
          self.longitude = +parseFloat(self.location.longitude).toFixed(6)
          self.resultsLoaded = true
        })
    },
    beforeMount() {
      this.$instantsearch.hydrate(this.instantSearchState)
    },
    beforeDestroy() {
      this.$store.set('navigation/show_side_nav', false)
    },
    methods: {
      handleSheetEvent() {
        this.$store.set('navigation/show_saved_vehicles', false)

      },
      translateAttribute(attr) {
        switch (attr) {
          case 'condition':
            attr = 'condición'
            break;
          case 'make':
            attr = 'marca'
            break;
          case 'model':
           attr = 'modelo'
           break;
          default:
            break;
        }

        return attr;
      },
      convertToCurrency(price) {
        return utils.convertToCurrency(price)
      },
      toValue(value, range) {
        return [value.min !== null ? value.min : range.min,
          value.max !== null ? value.max : range.max,
        ];
      },

      updateSearchRefinements(refine, value) {
        this.resultsLoaded = false
        refine(value)
        setTimeout(() => {
          this.resultsLoaded = true
        }, 500)
      },

      getMiles(i) {
        return i * 0.000621371192
      },
      getMeters(i) {
        return i * 1609.344
      },
      updateDrawer() {
        const navDisplay = !this.showSideNav
        this.$store.set('navigation/show_side_nav', navDisplay)
      },
      onScroll(e) {
        this.loadingMore = true
        window.onscroll = () => {
          let bottomOfWindow =
            document.documentElement.scrollTop + window.innerHeight ===
            document.documentElement.offsetHeight

          if (bottomOfWindow) {
            const elem = this.$refs.refineButton ?
              this.$refs.refineButton.$el :
              undefined
            if (!elem) return
            elem.click()
            setTimeout(() => {
              this.loadingMore = false
            }, 300)
            // Do something, anything!
          } else {
            this.loadingMore = false
          }
        }
      }
    },

    components: {
      AisSortBy,
      AisRangeInput,
      AisSearchBox,
      AisMenuSelect,
      AisHierarchicalMenu,
      AisClearRefinements,
      MainWebsiteLogo,
      AisConfigure,
      AisInstantSearchSsr,
      AisCurrentRefinements,
      AisBreadcrumb,
      AisInfiniteHits,
      AisHighlight,
      VehicleHit: () => import('@/components/vehicle-hits/VehicleHit'),
      BreadCrumbs: () => import('@/components/breadcrumbs/BreadCrumbs'),
      MobileHeaderSearchBar: () => import(
        '@/components/search/MobileHeaderSearchBar'),
      DesktopHeaderSearchBar: () => import(
        '@/components/search/DesktopHeaderSearchBar'),
      AlgoliaFacetedSidebar: () => import(
        '@/components/algolia-search/AlgoliaFacetedSidebar'),
      LoadingIndicator: () => import('@/components/LoadingIndicator.vue'),
      FilterListWithCheckboxes
    },
    head() {
      return {
        title: this.$route.path.split('/').join(' ') || 'inventario',
        description: 'Search pre-owned Sedan listings to find the best Pompano Beach, FL deals. We analyze millions of used cars daily',
        meta: [{
          breadcrumbs: [{
            name: 'search',
            page_title: 'HElllo Hello'
          }]
        }],
        link: [{
          rel: 'stylesheet',
          href: ''
        }]
      }
    }
  }

</script>
<style scoped>
  .v-menu__content.theme--light.v-menu__content--fixed.menuable__content__active {
    box-shadow: none !important;
  }

  #tbExtended .v-toolbar__extension {
    background: #fafafa;
  }

  .v-text-field__details {
    display: none !important;
  }

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)>.v-input__control>.v-input__slot {
    box-shadow: 0px 3px 1px -2px #0003, 0px 2px 2px 0px #00000024,
      0px 1px 5px 0px #0000001f;
    border-radius: 0px !important;
  }

  #distanceSelector .v-input__append-outer {
    margin: 0px;
  }

  #distanceSelector .v-input__append-outer button {
    height: 48px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  @media screen and (max-width: 1200px) {
    #tbExtended .v-toolbar__extension {}
  }

</style>
<style>
  .breadcrumb-container {
    background: rgb(255, 255, 255);
    max-height: 50px;
  }

  .v-toolbar__extension {
    padding: 0px;
  }

  .v-input.theme--light.v-input--selection-controls.v-input--checkbox {
    margin: 0;
  }

  .flat .v-expansion-panel::before {
    box-shadow: none;
  }

  li.ais-CurrentRefinements-item {
    width: auto;
    float: left;
    list-style: none;
  }

  .v-chip__content a {
    text-decoration: none;
  }

  span.closeicon i {
    font-size: 0.9em !important;
  }

  #srp_info_bar {
    position: fixed;
    width: 100%;
    top: 148px;
    box-shadow: none;
    z-index: 100;
  }

  #distanceSelector .v-input__append-outer {
    margin: 0px;
  }

  @media screen and (max-width: 1200px) {

    #tbExtended .v-toolbar__extension,
    #tbExtended .v-toolbar__content {}
  }

</style>
