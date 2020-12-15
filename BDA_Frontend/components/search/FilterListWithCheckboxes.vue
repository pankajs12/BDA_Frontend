<template>
  <ais-panel>
    <ais-refinement-list
      :limit="5"
      :attribute="attribute"
      show-more
      :sort-by="['name:asc']"
      operator="and"
    >
      <div
        slot-scope="{
          items,
          isShowingMore,
          isFromSearch,
          canToggleShowMore,
          refine,
          createURL,
          toggleShowMore
        }"
      >
        <v-list dense>
          <v-list-item
            v-model="item.isActive"
            dense
            v-for="item in items"
            :key="item.value"
          >
            <v-checkbox
              v-model="item.isRefined"
              hide-details
              @change="refine(item.value)"
              :label="item.label"
            >
              <template v-slot:label>
                <div class="body-2">
                  {{ item.label }} ({{ item.count.toLocaleString() }})
                </div>
              </template>
            </v-checkbox>
          </v-list-item>
        </v-list>
        <button @click="toggleShowMore" :disabled="!canToggleShowMore">
          {{ !isShowingMore ? 'Show more' : 'Show less' }}
        </button>
      </div>
    </ais-refinement-list>
  </ais-panel>
</template>

<script>
import { AisRefinementList, AisPanel } from 'vue-instantsearch'
export default {
  name: 'FilterListWithCheckboxes',
  props: ['attribute'],
  components: {
    AisRefinementList,
    AisPanel
  }
}
</script>

<style lang="scss" scoped></style>
