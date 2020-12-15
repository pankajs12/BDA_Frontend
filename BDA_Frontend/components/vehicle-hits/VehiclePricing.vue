<template>
  <div class="vehicle_pricing_container">
    <v-row v-if="sales_price || msrp_price" align="start">
      <v-col cols="4">
        <v-item-group>
          <v-item v-if="msrp_price && msrp_price !== sales_price">
            <v-list-item-content>
              <v-subheader> {{ $t('labels.msrp_label') }}</v-subheader>
              <v-list-item-title class="srp_price_label small_price">
                ${{ convertToCurrency(msrp_price) }}</v-list-item-title>
            </v-list-item-content>
          </v-item>
        </v-item-group>
      </v-col>
      <v-col cols="4">
        <v-item-group>
        <v-item v-if="
            msrp_price &&
              sales_price &&
              sales_price !== msrp_price &&
              sales_price < msrp_price
          ">
          <v-list-item-content>
            <v-subheader> {{ $t('labels.discount') }}</v-subheader>
            <v-list-item-title class="srp_price_label small_price">
              -${{ getVehicleDiscount(sales_price, msrp_price) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-item>
        </v-item-group>
      </v-col>
      <v-col cols="4">
        <v-item-group>
        <v-item v-if="sales_price">
          <v-list-item-content>
            <v-subheader> {{ $t('labels.price_label') }}</v-subheader>
            <v-list-item-title class="srp_price_label small_price">${{ convertToCurrency(sales_price)  }}</v-list-item-title>
          </v-list-item-content>
        </v-item>
        </v-item-group>
      </v-col>

    </v-row>
  </div>
</template>

<script>
  import utils from '~/assets/js/utils';


  export default {
    name: "VehiclePricing",
    components: {},
    props: {
      sales_price: {
        default: null,
        type: Number
      },
      msrp_price: {
        default: null,
        type: Number
      }
    },
    methods: {
      getVehicleDiscount(salesprice, msrp) {
        const DiscountAmount = utils.calculateDiscount(salesprice, msrp);
        return utils.convertToCurrency(DiscountAmount).replace("-", "");
      },
      convertToCurrency(price) {
        return utils.convertToCurrency(price);
      }
    }
  };

</script>

<style lang="scss" scoped>
  .v-item.v-item-type.row.no-wrap.v-item--dense {
    padding: 0px;
  }

  .v-item__label.srp_price_label.small_price.discount_amount {
    font-size: 1.3rem;
    margin: 0px;
  }

  .v-item__label.v-item__label--overline.text-overline {
    font-size: 1rem;
    letter-spacing: 0;
    text-transform: capitalize;
    text-align: right;
  }

</style>
