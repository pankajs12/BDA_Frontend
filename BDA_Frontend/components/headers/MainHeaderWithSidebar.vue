<template>
  <div>
    <q-header elevated class="bg-white text-grey-1 q-pa-md" height-hint="100">
      <q-toolbar text-black class="GNL__toolbar q-pa-3">
        <header-logo />
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <nav-items @toggleNav="toggleNav" />
        </div>
      </q-toolbar>
    </q-header>
    <main-sidebar :leftDrawerOpen="leftDrawerOpen" />
  </div>
</template>

<script>
import HeaderLogo from "../header/HeaderLogo";
import NavItems from "../header/NavItems";
import MainSidebar from "../header/MainSidebar";
export default {
  name: "MainHeaderWithSidebar",
  components: {
    HeaderLogo,
    NavItems,
    MainSidebar
  },
  props: {
    leftDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: "",
      showAdvanced: false,
      showDateOptions: false,
      exactPhrase: "",
      hasWords: "",
      excludeWords: "",
      byWebsite: "",
      byDate: "Any time"
    };
  },
  methods: {
    onClear() {
      this.exactPhrase = "";
      this.hasWords = "";
      this.excludeWords = "";
      this.byWebsite = "";
      this.byDate = "Any time";
    },

    changeDate(option) {
      this.byDate = option;
      this.showDateOptions = false;
    },
    toggleNav: function() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
};
</script>

<style lang="scss" scoped></style>
