<template>
  <v-select hide-details v-model="selectedDistanceLocal" style="border-radius:0px;"
            :items="distanceSelections" :label="$t('labels.distance')" solo>
  </v-select>
</template>

<script>
import {get} from 'vuex-pathify';
  export default {
    name: 'distance-radius-dropdown',
    computed: {
    },
    data() {
      return {
        selectedDistanceLocal: null,
           distanceSelections: [
          {
            text: '25 miles',
            value: 25
          },
             {
            text: '50 miles',
            value: 50
          },
             {
            text: '75 miles',
            value: 75
          },
             {
            text: '100 miles',
            value: 100
          },
                 {
            text: '150 miles',
            value: 150
          },
                 {
            text: '200 miles',
            value: 200
          }
          ,       {
            text: '250 miles',
            value: 250
          },
                 {
            text: '300 miles',
            value: 300
          },
                   {
            text: '400 miles',
            value: 400
          },
                   {
            text: '500 miles',
            value: 500
          },
                  {
            text: '600 miles',
            value: 600
          },
                   {
            text: 'all',
            value: 'all'
          }
        ],
      }
    },
    mounted() {
      this.selectedDistanceLocal = this.$store.get('userProfile/selected_search_distance')
    },
    watch: {
      selectedDistanceLocal: function(val) {
        this.$store.set('userProfile/selected_search_distance', val)
      }
    },

  }

</script>

<style lang="scss" scoped>

</style>
