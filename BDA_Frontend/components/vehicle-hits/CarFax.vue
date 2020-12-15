<template>
  <v-img max-width="120" :src="logo" @click="goToPage" />
</template>

<script>
export default {
  name: "car-fax",
  props: {
    url: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default:
        "https://storage.googleapis.com/brand-assets/carfax-logo-150px.png"
    }
  },
  methods: {
    goToPage: function() {
           window.open(this.url, "_blank");

    }
  }
};
</script>

<style lang="scss" scoped></style>
