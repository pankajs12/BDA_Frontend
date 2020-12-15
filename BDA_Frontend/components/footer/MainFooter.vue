<template>
<v-footer>
  <v-row align="center" v-if="pageMounted">
  <FavoriteVehiclesModal/>
  <v-spacer></v-spacer>
  <p class="mb-0 pa-2">&copy; 2020 <a href="https://bdaspanish.com">bdaspanish.com</a> </p>
<!-- <v-btn to="/dealers/signup" color="primary" text>Dealer Signup</v-btn> -->
  </v-row>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name:'MainFooter',
    components: {
      FavoriteVehiclesModal: ()=> import('@/components/footer/FavoriteVehiclesModal')
    },
    data() {
      return {
        pageMounted: false
      }
    },
    mounted() {
      this.$nextTick(()=>{
        setTimeout(() => {
        this.pageMounted = true
        }, 1000);

      })
    },


  }
</script>

<style lang="scss" scoped>

</style>
