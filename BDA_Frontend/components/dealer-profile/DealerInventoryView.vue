<template>
<v-layout :style="containerStyle">
  <v-row>
                    <v-col cols="12" sm="6" md="6" lg="4" xl="3"
                           v-for="item in inventoryData" :key="item._id">
                           <!-- {{item.vehicle.autoDataCodeList}} -->
                      <v-lazy>
                        <v-item style="max-width:100%">
                          <vehicle-hit :vehicle-data="item"></vehicle-hit>
                        </v-item>
                      </v-lazy>
                    </v-col>
                  </v-row>
</v-layout>
  <!-- <v-layout :style="containerStyle">
<v-container v-if="searchClient" style="padding:50px">
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
</v-container>
  </v-layout> -->
</template>

<script>
import { AisInstantSearch , AisConfigure, AisInfiniteHits } from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'
const axios = require('axios')
  export default {
    name:'DealerInventoryView',
    props: ['dealerId'],
    components: {
      AisInstantSearch,
      AisConfigure,
      AisInfiniteHits,
      VehicleHit: ()=> import('@/components/vehicle-hits/VehicleHit')
    },
    fetch({store, params, $axios}) {
      const dealerName = params.dealer
      var dealerId = params.dealer;
    },
    data() {
      return {
        favorite: [],
        searchClient: false,
         loadingMore: false,
         inventoryData:""
      }
    },
    mounted() {
      axios.post(`${process.env.BACKEND_API}/getHomenetInventoryByDealerId`, {
            dealerId: this.dealerId,
            })
            .then(res => {
              console.log("data+++++++++++",res.data);
              this.inventoryData = res.data;
            })
            .catch(error => {
              console.log(error);
            })

      this.searchClient = algoliasearch(
    '44COJULZY3',
    'dadeb0d0b44758ca3ae8a69ac98f85a1'
  )
      if(!this.isMobile){
        this.$store.set('navigation/show_side_nav' , true)
      }

    },
    beforeDestroy() {
              this.$store.set('navigation/show_side_nav' , false)
    },
    beforeRouteLeave (to, from, next) {
              this.$store.set('navigation/show_side_nav' ,false)
              next()
    },
    computed: {
        containerStyle() {
            return {
                paddingTop: this.$vuetify.breakpoint.mdAndUp ? '160px' : '100px'
            }
         },
         isMobile() {
           return this.$vuetify.breakpoint.smAndDown
         }
    },
  }
</script>

<style lang="scss" scoped>
nav.px-5.pb-10.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light {
    padding-top: 135px !important;
}
</style>
