<template>
  <q-card square>
    <div>
      <q-carousel
        swipeable
        animated
        v-model="slide"
        height="600px"
        thumbnails
        infinite
      >
        <q-carousel-slide
          :name="1"
          img-src="https://vehicle-images.buscadordeauto.com/imperial-valley-chevrolet-buick-gmc-cadillac/2020_chevrolet_traverse_premier_1GNERKKW1LJ127998-0.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
        />
      </q-carousel>
    </div>
  </q-card>
</template>

<script>
export default {
  name: "vehicle-image-slider",
  data() {
    return {
      slide: 1
    };
  }
};
</script>

<style lang="scss" scoped></style>
