<template>
<v-row justify="center">
  <v-col cols="12" class="pa-0">
<v-card tile flat class="d-flex align-center" :img="image" :height="calcHeight">
  <v-card-text>
<v-container>
  <v-row>
    <v-col cols="12" md="10" xl="8" class="mx-auto">
    <slot></slot>
    </v-col>
  </v-row>
</v-container>
  </v-card-text>
</v-card>
  </v-col>
</v-row>
</template>

<script>
  export default {
    name:'HomepageHero',
    props: {
      image: {
        type: String,
        default: 'https://res.cloudinary.com/buscador-de-auto/image/upload/v1563922564/brand-assets/home-banner.jpg'
      },
    },
    data() {
      return {
        calcHeight: 500
      }
    },
    methods: {
      updateHeight() {
        this.calcHeight = 1000;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
