<template>
  <v-card  style="overflow:hidden" :to="{
       name: 'concesionarios-dealer___es',
       params: { dealer: dealerData.dealer_id.replace(/[_]/g, '-')}
     }">
    <v-card-title>
      <v-col cols="12">
      <address>
      <dealer-address
      :recordId="dealerData._id"
        :dealerName="dealerData.dealer_id"
        :addressLine1="dealerData.address"
        :city="dealerData.city"
        :state="dealerData.state"
        :zipCode="parseInt(dealerData.zip_code)"
        :logo="dealerData.logo_url"
      />
      </address>
      </v-col>
    </v-card-title>
    <!-- <v-card-actions>
              <v-btn  text :href="`tel:${dealerData.sales_phone}`"><v-icon left>mdi-phone</v-icon>{{ dealerData.sales_phone }}</v-btn>
    </v-card-actions> -->

    <!-- <v-tabs grow slider-color="#027be3">
      <v-tab>{{ $t('labels.contact') }}</v-tab>
      <v-tab>{{ $t('labels.directions') }}</v-tab>
    <v-tab>{{$t('labels.inventory')}}</v-tab>
      <v-tab-item>
        <v-card flat style="max-height:250px;overflow:scroll">
          <v-card-text><business-hours /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text
            ><google-map :googlePlacesID="dealerData.map_id"
          /></v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>Inventory</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs> -->
  </v-card>
</template>

<script>
export default {
  name: 'DealerTabs',
  props: ['dealer-data'],

  components: {
    BusinessHours: () => import('@/components/dealer-info/BusinessHours.vue'),
    DealerAddress: () => import('@/components/dealer-info/DealerAddress.vue'),
    GoogleMap: () => import('@/components/dealer-info/GoogleMap')
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.v-slide-group__content.v-tabs-bar__content .v-tab {
  font-weight: 700;
  color: black;
}

</style>
