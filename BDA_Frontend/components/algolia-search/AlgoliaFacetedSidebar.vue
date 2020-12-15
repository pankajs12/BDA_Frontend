<template>
<div>
      <v-navigation-drawer  app v-model="navdrawer"  disable-resize-watcher>
    </v-navigation-drawer>
      <v-navigation-drawer app class="px-5 pb-10"
                          hide-overlay
                           :width="$vuetify.breakpoint.xl ? 420 : 320"
                            :clipped="true" :value="showSideNav"
                            :style="{top:`${top}px`, zIndex: isMobile ? 9999 : '', paddingTop:navPaddingTop}">
        <ais-range-input attribute="selling_price" v-if="dataReady">
          <div slot-scope="{ currentRefinement, range, refine }" class="py-3">
            <v-slider v-model="slider" :min="range.min" :max="range.max"
                      :value="toValue(slider, {min: range.min, max:slider})"
                      @click="refine({ min: slider - 10000, max: slider })">
              <div slot="prepend">
                {{currentRefinement.min !== null ? '$' +  convertToCurrency(currentRefinement.min) : '$' +  999 }}
              </div>
              <div slot="append">
                {{currentRefinement.max !== null ? '$' + convertToCurrency(currentRefinement.max) : '$' + convertToCurrency(range.max)}}
              </div>
            </v-slider>
          </div>
        </ais-range-input>
     <v-expansion-panels  accordion class="flat" multiple
                            v-model="searchFilters">
          <v-expansion-panel v-for="filter in searchFilters"
                             :key="filter.attribute" :ref="filter.attribute">
            <v-expansion-panel-header class="text-capitalize">{{ filter.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <filter-list-with-checkboxes :attribute="filter.attribute" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-navigation-drawer>
      </div>
</template>

<script>
import { AisRangeInput } from 'vue-instantsearch'
  import utils from '~/assets/js/utils'
  export default {
    name:'AlgoliaFacetedSidebar',
    props: {
      top: {
        type: Number,
        default: 200
      }
    },
    components: {
      AisRangeInput,
      FilterListWithCheckboxes: () => import('@/components/search/FilterListWithCheckboxes.vue'),

    },
    data() {
      return {
          slider: 999,
          dataReady: false,
          navdrawer: false,
            searchFilters: [
              {
            attribute: 'condition',
            clipped: true,
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
      }
    },
    beforeMount() {
      this.dataReady = true;
    },
    computed: {
      navPaddingTop () {
        if(this.$route.fullPath.includes('concesionarios')) {
          return '170px'
        }else {
          return false
        }
      },
      showSideNav () {
        return this.$store.get('navigation/show_side_nav')
      },
      isMobile () {
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    mounted() {
      this.top = this.$vuetify.breakpoint.mdAndUp ? 200 : 0;
      setTimeout(() => {
        this.$refs.condition[0].isActive = true
        this.$refs.make[0].isActive = true
        this.$refs.model[0].isActive = true
        this.$refs.trim[0].isActive = true
      }, 300)
    },
    methods: {
       convertToCurrency(price) {
        return utils.convertToCurrency(price)
      },
       toValue(value, range) {
        return [value.min !== null ? value.min : range.min,
          value.max !== null ? value.max : range.max,
        ];
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
