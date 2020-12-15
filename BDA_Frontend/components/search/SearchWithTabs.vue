<template>

  <v-tabs active-class="activeTab" id="homeSearchTabs"  next-icon="mdi-chevron-right" prev-icon="mdi-chevron-left" show-arrows>
    <v-tab>
      {{ $t('labels.search_all_inventory') }}
    </v-tab>
    <v-tab>
      {{ $t('labels.new_cars') }}
    </v-tab>
    <v-tab>
      {{ $t('labels.used_cars') }}
    </v-tab>
    <v-tab-item>
      <v-card justify-end>
        <v-card-text class="py-3">
          <search-tab-content></search-tab-content>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card height="300" style="overflow-x:scroll">
        <v-card-text class="py-5">
          <makes-list condition="nuevo"></makes-list>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card height="300" style="overflow-x:scroll">
        <v-card-text class="py-5">
          <makes-list condition="usado"></makes-list>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  name: 'search-with-tabs',
  components: {
    SearchTabContent: () => import('@/components/search/SearchTabContent.vue'),
    MakesList: () => import('@/components/search/MakesList')
  }
}
</script>
<style>
div#homeSearchTabs .v-tabs-bar {
    background: none;
}
@media only screen and (max-width: 768px) {
  div#homeSearchTabs .v-tabs-bar {
    background: white !important;
}
}
</style>
<style scoped>
.v-tab.v-tab {
    background: rgb(255, 255, 255);
}
.v-window__container {
    max-height: 382px;
    overflow-x: scroll;
}



</style>
