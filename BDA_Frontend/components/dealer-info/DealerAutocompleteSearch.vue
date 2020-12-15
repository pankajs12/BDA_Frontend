<template>
  <v-autocomplete
        outlined
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        item-text="Description"
        item-value="API"
        label="Dealership"
        auto-select-first
        hide-no-data
        placeholder="Please enter your dealership name"
        prepend-inner-icon="mdi-domain"
        return-object
      ></v-autocomplete>
</template>

<script>
import { sync } from 'vuex-pathify'
  export default {
    name:'DealerAutocompleteSearch',
    data: () => ({
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      model: null,
      search: null,
    }),

    computed: {
      fields () {
        if (!this.model) return []

        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Description = entry.description
          return Object.assign({}, entry, { Description })

        })
      },
      dealership_name: sync('dealerRegistration/dealership_name'),
    },

    watch: {
      model (val){
        this.dealership_name = val.description.split(',')[0];
      },
      search (val) {
        const self = this;
        this.isLoading = true
      this.$axios.get(`/search/${val}`).then(res=> {
        self.entries = res.data.predictions;
        self.isLoading = false
      })
         self.isLoading = false
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
