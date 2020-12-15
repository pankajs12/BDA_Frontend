<template>
  <v-card flat style="background:none">
    <v-card-title>
      <v-row align="start">
        <v-col cols="12" class="pb-0">
   <span class="title d-block" :style="{ fontSize: subTitleFontSize }">
        {{ vehicle_condition }} {{ vehicle_year }} {{ vehicle_make }}
      </span>
        </v-col>
        <v-col cols="12" class="pt-0">
       <span class="headline" :style="{ fontSize: titleFontSize }">
        {{ vehicle_model }} {{ vehicle_trim }}
      </span>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "VehicleTitle",
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
