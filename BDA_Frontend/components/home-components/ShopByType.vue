<template>
<v-container>
<v-row v-once>
  <v-col cols="10" xl="8" class="mx-auto">
    <v-row>
  <v-col cols="6" md="3" sm="4" v-for="(item, i) in items" :key="i">
    <v-lazy>
<v-card flat tile to="/busqueda" nuxt>
  <v-img contain :src="item.image_url"></v-img>
<v-card-title>
<span class="subtitle-1">{{item.type_description}}</span>
</v-card-title>
</v-card>
    </v-lazy>
  </v-col>
    </v-row>
  </v-col>
</v-row>
</v-container>

</template>

<script>
  export default {
    name:'shop-by-type',
    data() {
      return {
        items: [ { type_description: 'sports', 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/sports.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.wagons'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/wagons.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.sport_utility_vehicles'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/suvs.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.trucks'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/trucks.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.coupes'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/coupes.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.sedans'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/sedans.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.minivans'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/minivans.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.luxury'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/luxury.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.hybrids'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/hybrids.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.convertibles'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/convertibles.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.crossovers'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/crossovers.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' }, 
  { type_description: this.$t('vehicle_types.hatchbacks'), 
    image_url: 'https://res.cloudinary.com/buscador-de-auto/image/upload/c_scale,q_100,w_250/v1563398802/stock_images/stock_images_small/hatchback.jpg', 
    link_to_category: 'http://bdaclassifieds.test/' } ] 
      }
    },
    methods: {
      routelink(make) {

        //    this.$router.push({
        //   path: `/busqueda?marcas=${make}&condition=new`
        // })

      }
    },
  }
</script>

<style lang="scss" scoped>
.v-application .subtitle-1 {
    color: rgba(0, 0, 0, 0.87);
}
</style>
