<template>
<v-col cols="12" class="pa-4 py-0">
  <nuxt-child/>
  <v-row style="background:white">
    <v-col cols="12" md="8" class="px-2 py-0">
      <image-slideshow :images="vehicle_data.imagelist"></image-slideshow>
    </v-col>
    <v-col cols="12" md="4" class="px-4 pt-0" style="min-height:100vh;" :style="$vuetify.breakpoint.mdAndUp ? largeStyles : ''">
      <v-card flat tile style="overflow:hidden" class="pa-3">
        <v-row align="center">
          <v-col cols="8" md="9" class="pa-0">
            <h1>
              <vehicle-title-vdp :vehicle_condition="vehicle_data.type"
                                 :vehicle_year="vehicle_data.year"
                                 :vehicle_make="vehicle_data.make"
                                 :vehicle_model="vehicle_data.model"
                                 :vehicle_trim="vehicle_data.trim" />
            </h1>
          </v-col>
          <v-col cols="4" md="3" class="py-0">
            <car-fax :url="vehicle_data.carfaxhistoryreporturl"></car-fax>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-row align="center" class="px-3">
              <v-col cols="6" class="pt-0">
                <span class="overline d-block">{{$t('labels.price_label')}}</span>
                  <em class="selling_price" v-if="vehicle_data.sellingprice"> ${{convertToCurrency(vehicle_data.sellingprice)}}* </em>
                    <em class="selling_price" v-else style="font-size:1em"> {{$t('labels.call_for_price')}}</em>
              </v-col>
                 <v-col cols="6" class="pt-0">
                <span class="overline d-block">{{$t('labels.miles')}}</span>
                  <em class="selling_price" v-if="vehicle_data.miles.toString().length >= 4">{{ Math.round(vehicle_data.miles/1000) }}K </em>
                  <em class="selling_price" v-else>{{ Math.round(vehicle_data.miles) }} MI</em>
              </v-col>
              <v-col cols="12">
              <v-row align="end"  class="px-4 pl-6">
                         <v-col cols="5"  class="px-0">
      <span class="sub_label caption">{{$t('labels.stock_number')}}: #{{vehicle_data.stock}}</span>
              </v-col>
              <v-col cols="7">
              <span class="sub_label caption">vin: {{vehicle_data.vin}}</span>
              </v-col>
              </v-row>
              </v-col>
            </v-row>
          </v-col>
            <v-col id="locationInformation" cols="12">
           <vehicle-specs-card :details="vehicle_data"></vehicle-specs-card>
            </v-col>
          <v-col cols="12">
                     <vehicle-details-tabs
            :safety-equipment="vehicle_data.safetyequipment"
            :interior-equipment="vehicle_data.interiorequipment"
            :description="vehicle_data.description"
            :options="options"
          >
          </vehicle-details-tabs>
          </v-col>

          <v-col cols="12">
            <v-btn block x-large full-width color="bdared" dark>
                {{$t('labels.forms.submit')}}
            </v-btn>
          </v-col>

        </v-row>

      </v-card>

    </v-col>
    <!-- <v-col cols="12" md="4">
        <v-col cols="12">
          <v-card flat>
            <v-card-title>
              <v-row align="center">
                <v-col cols="8">
                  <h1>
                    <vehicle-title
                      :vehicle_condition="vehicle_data.type"
                      :vehicle_year="vehicle_data.year"
                      :vehicle_make="vehicle_data.make"
                      :vehicle_model="vehicle_data.model"
                      :vehicle_trim="vehicle_data.trim"
                    />
                  </h1>
                </v-col>
                <v-col cols="4">
                  <car-fax :url="vehicle_data.carfaxhistoryreporturl"></car-fax>
                </v-col>
              </v-row>
              <v-col cols="12">
                <v-divider></v-divider>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr v-if="vehicle_data.msrp && vehicle_data.msrp !== ''">
                      <td>{{ $t('labels.msrp_label') }}</td>
                      <td>${{ convertToCurrency(vehicle_data.msrp) }}</td>
                    </tr>
                    <tr v-if="vehicle_data.msrp && vehicle_data.msrp !== ''">
                      <td>{{ $t('labels.discount') }}</td>
                      <td>
                        -${{
                          getVehicleDiscount(
                            vehicle_data.sellingprice,
                            vehicle_data.msrp
                          )
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td>{{ $t('labels.price_label') }}</td>
                      <td>
                        ${{ convertToCurrency(vehicle_data.sellingprice) }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <v-card class="mt-4" flat>
            <v-col cols="12">
              <vehicle-specs-card :details="vehicle_data"></vehicle-specs-card>
            </v-col>
                <v-col cols="12">
          <vehicle-details-tabs
            :safety-equipment="vehicle_data.safetyequipment"
            :interior-equipment="vehicle_data.interiorequipment"
            :description="vehicle_data.description"
            :options="options"
          >
          </vehicle-details-tabs>
        </v-col>
          </v-card>
        </v-col>
        <v-col cols="12">
        <dealer-tabs></dealer-tabs>
        </v-col>

    </v-col> -->
  </v-row>
</v-col>
</template>

<script>
  import utils from '~/assets/js/utils'

  const axios = require('axios')
  export default {
    name: 'VehicleView',
    scrollToTop: true,
    components: {
      DealerTabs: () => import('@/components/dealer-info/DealerTabs.vue'),
      VehicleTitleVdp: () => import(
        '@/components/vehicle-hits/VehicleTitleVdp.vue'),
      CarFax: () => import('@/components/vehicle-hits/CarFax.vue'),
      ImageSlideshow: () =>
        import('@/components/vehicle-hits/ImageSlideshow.vue'),
      VehicleDetailsTabs: () =>
        import('@/components/vehicle-hits/VehicleDetailsTabs.vue'),
      VehicleSpecsCard: () =>
        import('@/components/vehicle-hits/VehicleSpecsCard.vue')
    },

    async asyncData({
      params, route, app
    }) {


      const vin = route.params.vin;

      const {
        data
      } = await axios.get(
        `${process.env.INVENTORY_API_URL}/vin?vin=${vin}`
      )
      return {
        vehicle_data: data,
        options: data.options !== '' ? data.options.split(',').sort() : []
      }
    },
    data() {
      return {
        breakPoint: null,
          largeStyles: {
            position: 'fixed',
            right: 0,
            zIndex: 1000
  }
      }
    },
    computed: {
      showTheSideNav () {
        return this.$store.get('navigation/show_side_nav')
      }
    },
    mounted () {
      this.breakPoint = this.$vuetify.breakpoint.mdAndUp;
      this.$store.set('navigation/show_side_nav', false)
    },

    methods: {
      addHashToLocation() {
        history.replaceState({},null,this.$route.path)
},
      convertToCurrency(price) {
        const priceAsNumber = parseInt(price)
        return utils.convertToCurrency(priceAsNumber)
      },

      getVehicleDiscount(salesprice, msrp) {
        const DiscountAmount = utils.calculateDiscount(salesprice, msrp)
        return utils.convertToCurrency(DiscountAmount).replace('-', '')
      }
    }
  }

</script>

<style lang="scss" scoped>
em.selling_price {
    font-size: 25px;
    font-family: Lato,Verdana,Arial,sans-serif;
    line-height: 31px;
    color: rgb(5, 51, 97);
}
.v-application .headline {
  font-family: futura-pt, sans-serif !important;
}
div#locationInformation {
    border-top: 1px solid rgb(222, 223, 224);
    background-color:rgb(243, 243, 243);
}

</style>
