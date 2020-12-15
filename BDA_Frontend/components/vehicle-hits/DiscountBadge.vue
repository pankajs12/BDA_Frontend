<template>
  <q-badge :color="backgroundColor" right floating>
    {{ label }}
    <br />
    ${{ discountAmount }}
  </q-badge>
</template>

<script>
export default {
  name: "DiscountBadge",
  props: {
    sales_price: {
      type: Number,
      default: null
    },
    msrp_price: {
      type: Number,
      default: null
    },
    label: {
      default: function() {
        return this.$translations.labels.discount;
      },

      type: String
    },
    backgroundColor: {
      default: "green",
      type: String
    }
  },
  data() {
    return {
      discountAmount: null
    };
  },
  mounted() {
    const discountCalculation = this.$calculateDiscount(
      Number(this.sales_price),
      Number(this.msrp_price)
    );
    this.discountAmount = this.$convertToCurrency(discountCalculation).replace(
      "-",
      ""
    );
  }
};
</script>

<style lang="scss" scoped>
.q-badge {
  z-index: 300;
  border-radius: 50% !important;
  height: 50px;
  border-top-right-radius: 0px !important;
  border-radius: 20% 0% 0% 20% !important;
  width: 70px;
  text-align: right;
  line-height: 1.2em;
}
</style>
