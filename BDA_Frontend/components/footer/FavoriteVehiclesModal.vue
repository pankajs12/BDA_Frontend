<template>
    <v-bottom-sheet @input="handleSheetEvent" transition="slide-y-transition" scrollable
                    v-model="showSavedVehicles">
      <v-card height="600px">
       <v-card-title class="subheader">{{$t('labels.saved_vehicles')}}</v-card-title>
        <v-card-text style="height:600px;">
          <v-row>
            <v-col cols="12" md="3" v-for="(v, i) in savedVehicles" :key="i">
              <vehicle-hit :vehicle-data="v"></vehicle-hit>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
</template>

<script>
  export default {
    name:'FavoriteVehiclesModal',
    components: {
      VehicleHit: ()=> import('@/components/vehicle-hits/VehicleHit.vue')
    },
    computed: {
        showSavedVehicles() {
          return this.$store.get('navigation/show_saved_vehicles')
      },
       savedVehicles() {
        return this.$store.get('savedVehicles/vehicles')
      },
    },
    beforeDestroy() {
          this.$store.set('navigation/show_saved_vehicles' , false)
    },
    methods: {
         handleSheetEvent() {
          this.$store.set('navigation/show_saved_vehicles', false)

      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
