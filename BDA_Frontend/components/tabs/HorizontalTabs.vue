<template>
  <q-card square :style="{ height, backgroundColor }">
    <q-tabs
      v-model="tab"
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="left"
      ripple
    >
      <q-tab
        style="height:48px;background:white"
        v-for="tab_item in tabs"
        :key="tab_item.name"
        :name="tab_item.name"
        :label="tab_item.title"
      />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        v-for="tab_item in tabs"
        :name="tab_item.name"
        :key="tab_item.name"
      >
        <div class="row full-width bg-white">
          <component :is="tab_item.component"></component>
        </div>
      </q-tab-panel>
      <!-- <slot :v-bind="tab.component"></slot> -->
    </q-tab-panels>
  </q-card>
</template>

<script>
export default {
  name: "HorizontalTabs",

  props: {
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    height: {
      type: [Number, String],
      default: 300
    },
    tabs: {
      type: Array,
      default: function() {
        return [
          {
            title: this.$translations.labels.search_all_vehicles,
            name: "search_inventory"
          },
          {
            title: this.$translations.labels.new_cars,
            name: "new_cars"
          },
          {
            title: this.$translations.labels.used_cars,
            name: "used_cars"
          }
        ];
      }
    }
  },
  components: {},
  data() {
    return {
      // tabs: [
      //   {
      //     title: this.$translations.labels.search_all_vehicles,
      //     name: "search_inventory",
      //     component: VehicleSearch
      //   },
      //   {
      //     title: this.$translations.labels.new_cars,
      //     name: "new_cars",
      //     component: VehicleMakesList
      //   },
      //   {
      //     title: this.$translations.labels.used_cars,
      //     name: "used_cars"
      //   }
      // ],
      tab: null
    };
  },
  mounted() {
    this.tab = this.tabs[0].name;
  }
};
</script>

<style lang="scss" scoped>
.q-tab--inactive {
  opacity: 1;
}
</style>
