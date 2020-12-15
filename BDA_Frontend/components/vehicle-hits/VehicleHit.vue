<template>
<!-- <div>
  {{vehicleData}}
</div> -->
  <v-card v-if="vehicleData" height="503" class="my-card v-ma-sm">
    <!-- {{vehicleData.vehicle.media.images[0].url}} -->
    <v-skeleton-loader
      v-if="!imageIsLoaded"
      class="mx-auto"
      type="image"
      style="width:100%;"
    >
    <!-- <v-img height="250" :src="vehicleData.vehicle.media.images[1].url" :alt="vehicleData.make" /> -->
    </v-skeleton-loader>
    <!-- <v-img  height="250" @load="imageLoaded" :alt="vehicleData.make"
           :src="vehicleData.media" />

    <srp-carousel
      v-if="vehicleData.vehicle.media.images && vehicleData.vehicle.media.images.length > 1 && imageIsLoaded"
      :images="vehicleData.vehicle.media.images[0].url"
    ></srp-carousel> -->
    <!-- <v-img
      v-else
      height="250"
      @load="imageLoaded"
      :alt="vehicleData.make"
      :src="vehicleData.imagelist && vehicleData.imagelist[0] ? vehicleData.imagelist[0] : 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png'"
    /> -->
    <div class="srp_information_container">
      <v-row align="start">
        <v-col cols="12">
          <v-card-text class="pt-0 pb-0">
            <v-row align="start">
              <v-col cols="12" class="py-0" style="height:75px;overflow:hidden;">
                <div class="overline">
                  {{ vehicleData.vehicle.vehicleCondition }} {{ vehicleData.vehicle.year }}
                  {{ vehicleData.vehicle.make }}
                </div>
                <div
                  class="subtitle-1 mb-2"
                  style="height:35px;overflow:hidden;"
                >
                  {{ vehicleData.vehicle.standardizedData.model }} {{ vehicleData.vehicle.standardizedData.trim }}
                  {{ vehicleData.style }}
                </div>
                  
                    <v-divider />

              </v-col>
              <!-- <v-row align="start" class="px-4">
              <v-col cols="5" class="py-0" v-if="vehicleData.selling_price !== 0">
                <div>
                  <div class="overline">{{$t('labels.price_label')}}</div>
                  <div class="subtitle-1 pl-2">
                    ${{ convertToCurrency(vehicleData.selling_price) }}
                  </div>
                </div>
              </v-col>
                     <v-col cols="7" class="py-0" v-else>
                <div>
                  <div class="overline">{{$t('labels.price_label')}}</div>
                  <div class="subtitle-1 pl-0">
                    {{ $t('labels.call_for_price') }}
                  </div>
                </div>
              </v-col>
                <v-divider class="mx-2" inset vertical></v-divider>
                  <v-col class="py-0">
                  <div class="overline">{{$t('labels.miles')}}</div>
                  <div class="subtitle-1 pr-1 pl-2">
                  {{convertToCurrency(vehicleData.miles)}}
                  </div>
              </v-col>
              </v-row> -->
            </v-row>
            <!-- <div class="text-h6 linktodealer">
              <v-divider class="mt-3"></v-divider>
              <v-btn class="pl-0" text exact  :to="`/concesionarios/${dealerpath}`">
                <em>@</em> {{ dealername }}</v-btn
              >
              <br />
              <span class="distance_from_dealer">
                <em v-if="vehicleData._rankingInfo"
                  >{{ $t('labels.distance') }}
                  {{
                    Math.round(
                      vehicleData._rankingInfo.geoDistance * 0.000621371192
                    )
                  }}
                  mi.</em
                >
              </span>
            </div> -->
          </v-card-text>
        </v-col>
        <v-col cols="2" class="pa-0">
          <v-btn
            class="mt-6"
            @click="saveVehicle"
            dark
            small
            absolute
            fab
            top
            right
            :color="!active ? 'rgba(54, 49, 49, 0.67)' : '#ffffff'"
          >
            <v-icon
              dark
              v-if="active"
              background-color="orange lighten-3"
              color="orange lighten-3s"
              >mdi-star</v-icon
            >
            <v-icon dark v-else>mdi-star-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!-- <v-divider /> -->

    <!-- <v-card-actions>
      <v-col cols="12" class="py-0">
        <v-row align="start">
          <v-col class="py-0 px-1" cols="6">
            <v-btn
              @click="openInquiryForm"
              color="bdared"
              style="color:white;width:100%"
            >
              <v-icon left>mdi-message</v-icon>
              {{ $t('labels.inquire') }}
            </v-btn>
          </v-col>
          <v-col cols="6" class="py-0 px-1">
            <v-btn
              exact
              color="transparent"
              :to="`/inventario/${dealerpath}/${vehicleData.vin}`"
              style="color:#051923;width:100%;text-decoration:none;"
              nuxt
            >
              {{ $t('labels.view_details') }}
              <v-icon right>mdi-eye</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card-actions> -->
    <!-- <srp-inquire-popup
      @close-window="showForm = false"
      v-bind="$props"
      :dialog="showForm"
    ></srp-inquire-popup> -->
  </v-card>
</template>

<script>
import VehiclePricing from './VehiclePricing'
import PrimaryButton from '~/components/buttons/PrimaryButton'
import VehicleColors from './VehicleColors'
import AisRefinementList from '../../pages/busqueda'
import utils from '~/assets/js/utils'

export default {
  name: 'VehicleHit',
  components: {
    VehiclePricing,
    VehicleColors,
    PrimaryButton,
    SrpCarousel: () => import('@/components/vehicle-hits/SrpCarousel.vue'),
    SrpInquirePopup: () =>
      import('@/components/form-components/SrpInquirePopup'),

  },
  props: ['vehicle-data'],
  data () {
    return {
      imageIsLoaded: false,
      dealername: null,
      dealerpath: null,
      active: false,
      showForm: false
    }
  },
  mounted () {
    const self = this
    this.dealername = this.vehicleData.dealer_name;
    // this.dealerpath = this.dealername.replace(/[ ]/g, '-').replace('-used', '-new')
    const currentObjectID = this.vehicleData.objectID
    const savedVehicles = this.$store.get('savedVehicles/vehicles')
    savedVehicles.filter(v => {
      if (v.objectID === currentObjectID) {
        self.active = true
      }
    })
  },
  methods: {
    openInquiryForm () {
      this.showForm = true
    },
    imageLoaded () {
      this.imageIsLoaded = true
    },

    convertToCurrency (price) {
    return utils.convertToCurrency(price)
    },
    goToVdpPage() {
      const vehicleData = this.vehicleData;
      const cleanupDealerName = (dealername) => {
        let splitAtUpper = dealername.match(/[A-Z][a-z]+/g);
        splitAtUpper = splitAtUpper.map(i => i = i.toLowerCase()).join('-')
        return splitAtUpper.replace(/[ ']/g, '-').replace("--" , '').replace("-NEW" , '').replace('-USED' , '')
      }

      const path = `/busqueda/${vehicleData.condition}/${vehicleData.make}/${vehicleData.model.replace(/[ ']/g,'-')}/${vehicleData.trim.replace(/[ ']/g, '-')}/${vehicleData.vin}`
      return path;
    },
    saveVehicle () {
      const self = this
      let savedVehicles = this.$store.get('savedVehicles/vehicles')
      const currentObjectID = this.vehicleData.objectID
      if (this.active === false) {
        savedVehicles.push(this.vehicleData)
        this.$store.set('savedVehicles/vehicles', savedVehicles)
        const savedVehiclesUpdated = this.$store.get('savedVehicles/vehicles')
        savedVehiclesUpdated.filter(v => {
          if (v.objectID === currentObjectID) {
            self.active = true
          }
        })
      } else {
        this.active = false
        const savedWithReemovedItem = savedVehicles.filter(v => {
          return v.objectID !== currentObjectID
        })
        this.$store.set('savedVehicles/vehicles', savedWithReemovedItem)
      }
    }
  }
}
</script>

<style lang="css" scoped>
/* span.srp-condition-info {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 1;
  background-color: #ababab;
  font-size: 15px;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.5px;
  color: #fff;
  padding: 5px 15px;
  border-radius: 0.2em;
}
*/
.srp_information_container .subtitle-1 {
  line-height: 1.1em;
}

.srp_information_container .pricing_container {
  background: #f3f3f3;
  align-items: flex-start;
  box-shadow: inset 1px 1px 1px silver;
}

.linktodealer em {
  color: rgb(0, 123, 227);
  font-size: 1.2em;
}

.linktodealer a {
  text-decoration: none;
  color: rgb(242, 146, 1);
  font-size: 1.1em;
}

.distance_from_dealer em {
  font-size: 0.9em !important;
}

.text-h6.linktodealer {
  line-height: 0.8em;
}

.text-h6.linktodealer a {
  font-size: 1em;
  color: black;
}
</style>
