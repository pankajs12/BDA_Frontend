<template>
  <v-card flat  tile style="background:none">
    <v-card-title>
      <v-row align="start">
        <v-col cols="12" class="pb-0">
   <span class="title d-block" :style="{ fontSize: subTitleFontSize }">
        {{ vehicle_condition }} {{ vehicle_year }} {{ vehicle_model }} {{vehicle_trim}}
      </span>
        </v-col>
        <v-col cols="12" class="pt-0">
       <span class="headline" :style="{ fontSize: titleFontSize }">
      {{ vehicle_make }}
      </span>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "VehicleTitleVdp",
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

<style lang="scss" scoped>
span.title.d-block {
    font-weight: 700;
    font-size: 1.4em;
    line-height: 31px;
    color: rgb(5, 51, 97);
    word-break: break-word;
}
.v-application .headline {
    font-size: 1em !important;
    font-weight: 500;
    color: rgb(109, 116, 122)
}
</style>
