<template>
<v-row align="center" id="single_dealer_intro" :class="{'pt-20 px-0': !isMobile}">
  <v-col cols="5" class="pt-0 px-0">
<v-card flat tile>
  <div class="pl-7">
    <v-img max-width="350" :src="profile.logo_url"></v-img>
  </div>
  <v-card-text>
    <address>
      <v-btn  text :href="`tel:${profile.phone}`"><v-icon left>mdi-phone</v-icon>{{ profile.phone }}</v-btn><br/>
      <v-btn text><v-icon left>mdi-google-maps</v-icon>{{ profile.address }}, {{ profile.city }}, {{ profile.state }} {{ profile.zip_code }}</v-btn>
    </address>
 <!-- <v-rating v-model="rating" color="orange" background-color="rgb(230, 230, 230)"></v-rating> -->
  </v-card-text>
</v-card>
  </v-col>
  <v-col cols="7">
    <v-img max-height="400" :src="profile.hero_image[0].thumbnails.full.url" :alt="profile.dealer_name"/>
  </v-col>
</v-row>
</template>

<script>
  export default {
    props: ['profile' , 'rating'],
    name:'DealerProfileHeroSection'
  }
</script>

<style lang="scss" scoped>

</style>
