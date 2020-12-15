
<template>
  <v-container fluid id="searchTabContent">
    <v-row align="center" :no-gutters="!isMobile">
      <v-col cols="12" md="6">
        <v-text-field
          solo
          background-color="#f7f7f7"
          :label="$t('labels.search')"
          prepend-inner-icon="mdi-magnify"
          v-on:keyup.enter="search"
          v-model="searchQuery"
          hide-details
          height="56"
          flat
          :placeholder="$t('labels.search_placeholder')"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="2">
        <v-select
          solo
          flat
          background-color="#f7f7f7"
          height="56"
          hide-details
          v-model="selectedDistance"
          :items="distanceSelections"
          :label="$t('labels.distance')"
        >
        </v-select>
      </v-col>
      <v-col cols="6" md="2">
        <v-text-field
          solo
          flat
          background-color="#f7f7f7"
          v-on:keyup.enter="search"
          :placeholder="$t('labels.zipcode')"
          height="56"
          hide-details
          v-model="radiusZipcode"
          :label="$t('labels.zipcode')"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-btn
          @click="search"
          color="secondary"
          block
          primary
          height="56"
          :class="{ 'mt-3' : isMobile  }"
        >
          {{ $t('labels.search') }}
          <v-icon right color="white">mdi-magnify</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'search-tab-content',
  data () {
    return {
      selectedDistance: 'distancia',
      radiusZipcode: null,
      searchQuery: null,
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
        },
        {
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
          text: 'distancia',
          value: 'all'
        }
      ]
    }
  },
  computed: {
    isMobile () {
      return this.$vuetify.breakpoint.mdAndUp ? false : true;
    }
  },
  methods: {
    search () {
      const encodedSearch = this.searchQuery
        ? this.searchQuery.replace(/[ ]/g, '%20')
        : ''
      this.$router.push({
        path: `/busqueda?s=${encodedSearch}`
      })
    }
  }
}
</script>
<style>
#searchTabContent .v-input__slot {
  border-radius:0px !important;
}

</style>
