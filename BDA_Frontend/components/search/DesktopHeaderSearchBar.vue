<template>
  <v-row align="center" no-gutters :style="{marginRight: getMargin('row') , height: '65px'}">
    <v-col cols="7" v-if="aisReady">
    <ais-search-box>
      <div slot-scope="{
                                currentRefinement,
                                isSearchStalled,
                                refine
                              }">
        <v-text-field
        background-color="transparent"
        class="sidebordered"
          prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
        flat
        solo
         placeholder="search"
          v-model="currentRefinement"
          @input="updateSearchRefinements(refine,currentRefinement)">
        </v-text-field>
      </div>
    </ais-search-box>
    </v-col>
    <v-col cols="3">
    <v-text-field hide-details flat id="zipcodeInput"
      class="sidebordered"
      background-color="transparent"
      v-model="$attrs.radiusZipcode" :label="$t('labels.zipcode')" solo>
    </v-text-field>
    </v-col>
    <v-col cols="2">
    <v-select
    background-color="transparent"
     hide-details flat v-model="$attrs.selectedDistance"  :items="distanceSelections" :label="$t('labels.distance')" solo>
    </v-select>
    </v-col>
  </v-row>
</template>
<script>
import {AisSearchBox } from 'vue-instantsearch'
  export default {
    name: 'DesktopHeaderSearchBar',
    components: {
      AisSearchBox
    },
    computed: {
      distanceSelections () {
        return this.$store.get('navigation/distanceSelections')
      }
    },
    mounted() {
        this.aisReady = true;
    },
    data() {
      return {
        aisReady: false,
      }
    },
    methods: {
        updateSearchRefinements(refine, value) {
        refine(value)
      },
      getMargin(element){
        switch (element) {
          case 'row':
            if(this.$vuetify.breakpoint.mdAndUp){
              return '0px'
            }

            break;

          default:
            break;
        }
      }
    },
  }

</script>

<style lang="scss" scoped>
.row {
    border: 1px solid rgb(224, 224, 224);
    border-radius: 60px !important;
        margin-right: 0;
    height: 70px;
    box-shadow: none;
    padding: 3px 4px;
    background: rgb(247, 247, 247);
    margin-left: 0px;
    border: 0px solid rgba(220, 220, 220, 0.1);
    box-shadow: inset 1px 1px 1px #dedede78;
}
.v-text-field__prefix {
    color: rgb(167, 167, 167);
}
.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background:transparent;
}

.v-text-field__prefix {
    color: rgb(167, 167, 167);
}

input {
    color: rgb(136, 136, 136) !important;
}
.theme--light.v-text-field {
    border-color: rgba(220, 220, 220, 0.42) !important;
}
input#zipcodeInput {
    color: rgb(90, 90, 90) !important;
    font-size: 0.9em;
}
.v-text-field.v-text-field--enclosed.v-text-field--single-line .v-text-field__prefix, .v-text-field.v-text-field--enclosed.v-text-field--single-line .v-text-field__suffix {
    color: rgb(90, 90, 90) !important;
}
.v-select__selection.v-select__selection--comma {
    color: rgb(90, 90, 90) !important;
}
</style>
<style>
.sidebordered {
    border-right: 1px solid rgb(224, 224, 224);
    border-radius: 0px !important;
}
</style>
