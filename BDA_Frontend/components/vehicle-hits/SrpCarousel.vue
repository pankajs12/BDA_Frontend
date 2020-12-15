<template>
  <v-carousel hide-delimiters height="250" show-arrows-on-hover>
    <v-carousel-item
      v-for="(image,i) in images"
      :key="i"
      :src="image"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name:'srp-carousel',
    props: {
      images: {
        type: Array,
        default: ()=> {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
