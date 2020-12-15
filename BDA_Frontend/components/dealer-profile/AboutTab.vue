<template>
<v-card flat>
  <v-col cols="5" class="pt-0">
<v-card flat tile>
      <h1>{{profile.dealer_name}}</h1>
  <div class="pl-7">
    <!-- <v-img max-width="350" :src="profile.logo_url"></v-img> -->
  </div>
  <v-card-text>
    <address>
      <v-btn  text :href="`tel:${profile.phone}`"><v-icon left>mdi-phone</v-icon>{{ profile.phone }}</v-btn><br/>
      <v-btn text><v-icon left>mdi-google-maps</v-icon>{{ profile.addres }}, {{ profile.city }}, {{ profile.state }} {{ profile.zip_code }}</v-btn>
    </address>
 <!-- <v-rating v-model="rating" color="orange" background-color="rgb(230, 230, 230)"></v-rating> -->
  </v-card-text>
</v-card>
  </v-col>
  <v-col cols="7">
    <!-- <v-img max-height="400" :src="profile.hero_image[0].thumbnails.full.url" :alt="profile.dealer_name"/> -->
  </v-col>
</v-card>
</template>

<script>
  export default {
    props: ['profile'],
    name:'AboutTab'
  }
</script>

<style lang="scss" scoped>

</style>
