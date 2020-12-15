<template>
  <v-menu id="searchMenu" transition="slide-x-transition" flat
                      offset-x :close-on-content-click="false" nudge-top="5"
                      nudge-width="0">
                <template v-slot:activator="{ on }">
                  <v-btn fab small color="transparent" v-on="on">
                    <v-icon color="white">mdi-magnify</v-icon>
                  </v-btn>
                </template>
                <v-list class="py-0 px-0" tile style="background:#027be3;" flat>
                  <v-list-item>
                    <v-col :cols="$vuetify.breakpoint.mdAndUp ? 12 : 12"
                           id="searchBarContainer" class="py-2">
                      <v-row align="center" no-gutters>
                        <!-- <v-col :cols="$vuetify.breakpoint.mdAndUp ? 4 : 12"
                               :class="$vuetify.breakpoint.mdAndUp ? 'mb-0' : 'mb-2'">
                          <ais-search-box v-if="dataReady">
                            <div slot-scope="{
                                currentRefinement,
                                isSearchStalled,
                                refine
                              }">
                              <v-text-field hide-details :style="{
                                  borderRadius: $vuetify.breakpoint.mdAndUp
                                    ? '5px 0px 0px 5px'
                                    : '0px'
                                }" solo placeholder="search"
                                            v-model="currentRefinement"
                                            @input="updateSearchRefinements(refine,currentRefinement)">
                              </v-text-field>
                            </div>
                          </ais-search-box>
                        </v-col> -->
                        <!-- <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                          <v-text-field hide-details
                                        style="border-radius: 0px 0px 0px 0px;"
                                        v-model="$attrs.radiusZipcode"
                                        :label="$t('labels.zipcode')" solo>
                          </v-text-field>
                        </v-col> -->
                        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                          <v-select hide-details v-model="selectedDistance"
                                    style="border-radius:0px;"
                                    :items="distanceSelections"
                                    :label="$t('labels.distance')" solo>
                          </v-select>
                        </v-col>
                        <v-col :cols="$vuetify.breakpoint.mdAndUp ? 2 : 4">
                          <v-btn color="primary" block primary height="48"
                                 :style="{
                              borderRadius: $vuetify.breakpoint.mdAndUp
                                ? '0 8px 8px 0px'
                                : '0px'
                            }" tile>
                            <v-icon color="white">mdi-magnify</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-list-item>
                </v-list>
              </v-menu>
</template>

<script>
import {AisSearchBox } from 'vue-instantsearch'
  export default {
    name: 'MobileHeaderSearchBar',
    components: {
      AisSearchBox
    },
    data() {
      return {
      dataReady: false
      }
    },
    computed: {
      selectedDistance: {
        get() {
          return this.$store.get('algoliaState/selectedDistance')
        },
        set(value) {
          this.$store.set('algoliaState/selectedDistance' , value)
        }


      },
      distanceSelections () {
        return this.$store.get('algoliaState/distanceSelections')
      }

    },
    mounted() {
      setTimeout(() => {
      this.dataReady = true;
      }, 3000);

    },
    methods: {
         updateSearchRefinements(refine, value) {
        this.$attrs.resultsLoaded = false
        refine(value)
        setTimeout(() => {
          this.$attrs.resultsLoaded = true
        }, 500)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
