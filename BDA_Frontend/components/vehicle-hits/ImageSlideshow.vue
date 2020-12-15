<template>
    <v-row>
      <v-col cols="12" class="pa-0">
<v-card flat>
              <v-expand-transition>
      <div v-if="model != null">
          <v-col cols="12" class="pa-0">
   <v-img :src="largeImages[model]"></v-img>
          </v-col>
      </div>
    </v-expand-transition>
    <v-row v-if="$vuetify.breakpoint.mdAndUp">
      <v-col cols="4" v-for="img in thumbnails" :key="img">
        <v-img :src="img"></v-img>
      </v-col>
    </v-row>
    <v-row v-else>
        <v-slide-group
      v-model="model"
      class=""
      show-arrows
      v-if="images.length > 1"
    >
      <v-slide-item
        v-for="img in thumbnails"
        :key="img"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="80"
          width="150"
          @click="toggle"
        >
          <v-row>
            <v-scale-transition>
              <v-img :src="img"></v-img>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
    </v-row>
</v-card>
      </v-col>
    </v-row>

</template>

<script>
  export default {
    name:'ImageSlideshow',
    props: {
      images: {
        type: Array,
        default: ()=> {
          return ['https://storage.googleapis.com/vehicle_images/2020_GMC_Sierra.jpg']
        }
      }
    },

    data() {
      return {
        loaded: false,
        largeImages: [],
        leadImage: '',
        thumbnails: [],
        model: 0,
        carouselControl:0,
      }
    },

    mounted() {
      this.largeImages = this.images.map(img => img.replace('640x480' , '1600x1200'))
      this.thumbnails = this.images.map(img => img.replace('640x480' , '250x250'));
      this.leadImage = this.images[0].replace('640x480' , '1600x1200')
    },
    watch: {
    model: function (val) {
      if(val === undefined){
        this.model = 0;
      }
    }
    },
    methods: {
      imagesLoaded() {
      this.loaded = true;
      },
      updateSlideshow(i){
        this.carouselControl = i;
      }
    },
  }
</script>

<style lang="scss" scoped>
#thumbsrow {
    overflow: scroll;
    padding: 45px;
}
</style>
