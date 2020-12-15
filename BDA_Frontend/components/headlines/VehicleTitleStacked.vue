<template>
  <q-card flat style="background:none">
    <q-card-section>
      <div class="text-subtitle2" :style="{ fontSize: subTitleFontSize }">
        {{ vehicle_condition }} {{ vehicle_year }} {{ vehicle_make }}
      </div>

      <div class="text-h6" :style="{ fontSize: titleFontSize }">
        {{ vehicle_model }} {{ vehicle_trim }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "vehicle-title-stacked",
  props: {
    vehicle_condition: {
      type: String,
      default: "nuevo"
    },
    vehicle_year: {
      type: Number,
      default: 2020
    },
    vehicle_make: {
      type: String,
      default: "Chevrolet"
    },
    vehicle_model: {
      type: String,
      default: "Transverse"
    },
    vehicle_trim: {
      type: String,
      default: "Premier XL"
    },
    titleFontSize: {
      type: String,
      default: "1.6rem"
    },
    subTitleFontSize: {
      type: String,
      default: "1.2rem"
    }
  }
};
</script>

<style lang="scss" scoped></style>
