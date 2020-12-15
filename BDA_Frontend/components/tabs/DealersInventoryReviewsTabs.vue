<template>
<v-tabs class="mt-10" :style="{ paddingTop: dealerInventoryActive === true ? '100px' : '' }">
  <v-tab v-for="(tab, idx) in tabs" :key="idx"  v-on:click.prevent="tabActivated(tab, $event)">
    {{tab.name}}
  </v-tab>
  <v-tab-item v-for="(tab, idx) in tabs" :key="idx">
      <v-card v-if="tab.key === 'about_dealer'" flat tile>
           <v-row align="start">
            <v-col cols="12" sm="6" md="8">
                      <v-card-title class="mt-4 mb-4">
          <h1>{{ dealerName }}</h1>
        </v-card-title>
        <v-card-text>
    <p v-html="aboutInfo"></p>
        </v-card-text>

            </v-col>
            <v-col cols="12" sm="6" md="4" class="mt-4">
              <dealer-info-sidebar/>
            </v-col>
          </v-row>
      </v-card>
          <v-card v-if="tab.key === 'inventory'" flat>
                            <!-- <AlgoliaFacetedSidebar top="350"/> -->
        <v-card-text>
              <v-col cols="12">
                <ais-configure :filters="`dealer_id:${dealerId}`"/>
               <ais-infinite-hits :show-previous="false" style="width:100%;">
              <v-row slot-scope="{ items, refinePrevious, refineNext }">
                <v-item-group width="" v-model="favorite" multiple
                              style="width:100%;">
                  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="4" xl="3"
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
              </v-col>
        </v-card-text>
      </v-card>
            <v-card v-if="tab.key === 'reviews'" flat>
        <v-card-text>
            <v-row>
              <v-col v-for="(review, idx) in reviews.reviews" :key="idx" cols="12" md="4">
                {{ review }}
              </v-col>
            </v-row>
        </v-card-text>
      </v-card>

  </v-tab-item>
</v-tabs>
</template>

<script>
import {AisInfiniteHits, AisConfigure } from 'vue-instantsearch'
  export default {
    name:'dealer-inventory-and-reviews-tabs',
    props: ['reviews', 'aboutInfo', 'dealerName', 'dealerId'],
    data() {
      return {
      favorite: [],
      loadingMore: false,
        tabs: [
           {
            key: 'about_dealer',
            name: this.$t('labels.about_us'),
            component: 'VehicleHit'
          },
          {
            key: 'inventory',
            name: this.$t('labels.inventory'),
            component: 'VehicleHit'
          },
          {
            key: 'services',
            name: this.$t('labels.services'),
            component: 'VehicleHit'
          },
              {
            key: 'reviews',
            name: this.$t('labels.reviews'),
            component:'VehicleHit'
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
          }
        ],
      }
    },
    components: {
      AisInfiniteHits,
      AisConfigure,
      VehicleHit: () => import('@/components/vehicle-hits/VehicleHit.vue'),
      DealerInfoSidebar: () => import('@/components/dealer-info/DealerInfoSideBar.vue'),
      FilterListWithCheckboxes: () => import('@/components/search/FilterListWithCheckboxes.vue'),
      AlgoliaFacetedSidebar: () => import('@/components/algolia-search/AlgoliaFacetedSidebar.vue'),
    },
    computed: {
      dealerInventoryActive() {
        return this.$store.get('navigation/dealerInventoryActive')
      }
    },
    methods: {
      filterResultsByDealer() {
      },
      tabActivated(tab, e){
        e.preventDefault()
        let introSection = document.getElementById('single_dealer_intro')
        if( tab.key === 'inventory' ) {
          introSection.style.display = "none";
          this.$store.set('navigation/show_side_nav' , true)
          this.$store.set('navigation/dealerInventoryActive' , true)
        }else {
          introSection.style.display = "";
          this.$store.set('navigation/show_side_nav' , false)
          this.$store.set('navigation/dealerInventoryActive' , false)
        }
        window.scrollTo(0, 0)

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
