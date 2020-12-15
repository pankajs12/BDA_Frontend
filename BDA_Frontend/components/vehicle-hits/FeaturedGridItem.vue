<template>
  <q-card flat>
    <q-img contain :src="image" ratio="1"></q-img>
    <q-card-actions>
      <q-btn flat>{{ title }}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "FeaturedGridItem",
  props: {
    title: {
      type: String,
      default: "Sports"
    },
    link: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_400/v1563398802/stock_images/stock_images_small/sports.jpg"
    }
  }
};
</script>

<style lang="scss" scoped></style>
