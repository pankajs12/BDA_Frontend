<template>
  <div v-if="loading" class="loading-page" style="z-index:99999">
  <div class="text-center">
    <v-overlay :value="overlay" opacity="1" color="white">
      <v-progress-circular color="rgb(2, 123, 227)" indeterminate size="90"></v-progress-circular>
    </v-overlay>
  </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    overlay: true
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
circle.v-progress-circular__overlay {
    color: rgb(255, 0, 0);
}
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
