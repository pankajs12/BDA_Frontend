<template>
  <div>
    <ais-current-refinements>
      <template slot="item" slot-scope="{ item, refine, createURL }">
        <v-chip-group>
          <v-chip
            close
            label
            @click:close="refine(refinement)"
            :href="createURL(refinement)"
            v-for="refinement in item.refinements"
            :value="refinement.label"
            :key="
              [
                refinement.attribute,
                refinement.type,
                refinement.value,
                refinement.operator
              ].join(':')
            "
          >
            <a
              :href="createURL(refinement)"
              @click.prevent="refine(refinement)"
            >
              {{ refinement.label }}
            </a>
          </v-chip>
        </v-chip-group>
      </template>
    </ais-current-refinements>
    <v-divider></v-divider>
    <v-expansion-panels accordion class="flat" multiple v-model="searchFilters">
      <v-expansion-panel
        v-for="filter in searchFilters"
        :key="filter.attribute"
        :ref="filter.attribute"
      >
        <v-expansion-panel-header class="text-capitalize">{{
          filter.title
        }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <filter-list-with-checkboxes :attribute="filter.attribute" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { AisCurrentRefinements } from 'vue-instantsearch'
import FilterListWithCheckboxes from '~/components/search/FilterListWithCheckboxes.vue'
export default {
  name: 'AisCurrentRefinementFacets',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      searchFilters: [
        {
          attribute: 'condition',
          title: this.$t('labels.condition'),
          isActive: true
        },
        {
          attribute: 'make',
          title: this.$t('labels.make'),
          isActive: true
        },
        {
          attribute: 'model',
          title: this.$t('labels.model'),
          isActive: true
        },
        {
          attribute: 'trim',
          title: this.$t('labels.trim'),
          isActive: true
        },
        {
          attribute: 'year',
          title: this.$t('labels.year')
        },
        {
          attribute: 'body',
          title: this.$t('labels.body')
        },
        {
          attribute: 'style',
          title: this.$t('labels.style')
        }
      ]
    }
  },
  components: {
    AisCurrentRefinements,
    FilterListWithCheckboxes
  }
}
</script>

<style lang="scss" scoped></style>
