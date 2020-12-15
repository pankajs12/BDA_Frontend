<template>
  <v-card flat>
    <v-card-text>
        <v-skeleton-loader  v-show="!iframe.loaded"

      class="mx-auto"
      type="card"
      style="width:100%;"
    >

    </v-skeleton-loader>
       <iframe
            style="border: 0"
            :src="iframe.src"
            width="100%"
            height="200px"
            frameborder="0"
            allowfullscreen="allowfullscreen"
            ref="frame"
            @load="load"
            v-show="iframe.loaded"
          ></iframe>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name:'GoogleMap',
    props: {
         googlePlacesID: {
      type: String,
      default: "ChIJ7VgtIjGn2YgRoQARNMm0Sr8"
    }
    },

    data() {
      return {
           iframe: {
        //eslint-disable-next-line
        src: `https://www.google.com/maps/embed/v1/place?q=place_id:${
          this.googlePlacesID
        }&key=AIzaSyB_HqXDeNsH0HN-SZIT2OPyESv3Cpvmav8&language=es`,
        loaded: false
      }
      }
    },
    methods: {
       load: function() {
      this.iframe.loaded = true;
    },
    resetIframe() {
      this.iframe.loaded = false;
    }
    },
  }
</script>

<style lang="scss" scoped>

</style>
