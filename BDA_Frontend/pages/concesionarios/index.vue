<template>
          <v-layout>
                <LoadingIndicator v-if="showLoader" />
                    <v-container v-else fluid class="px-2" style="background:white;">
                      <h1>Concesionarios</h1>
                <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                        lg="4"
                        xl="3"
                        v-for="item in dealers"
                        :key="item.dealer_id"
                      >
                        <v-lazy>
                          <dealer-tabs :dealer-data="item"></dealer-tabs>
                        </v-lazy>
                      </v-col>
                </v-row>
                    </v-container>
                    </v-layout>

</template>

<script>
import axios from 'axios';
  export default {
    name: 'AllDealersIndexPage',
    async asyncData({ $axios }){

      // const Dealers = await $axios.get("/active-dealers")
      // var dealersData = Dealers.data;
      // const index = dealersData.findIndex(x => x.dealer_id === "diamond_honda_of_puente_hills");
      // if (index !== undefined) dealersData.splice(index, 1);
      // console.log("After remove:", dealersData);
      // return {
      //   dealers: Dealers.data,
      // }
      return {
        // dealers: dealersData,
        dealers:""
      }
    },
    components: {
      DealerTabs: () => import('@/components/dealer-info/DealerTabs'),
      LoadingIndicator: () => import('@/components/LoadingIndicator.vue')
    },
    mounted() {
      axios.get(`${process.env.BACKEND_API}/getAllDealersDataDealerManagement`)
            .then(res => {
                console.log('dealers data', res.data);
                this.dealers = res.data;
                const index = this.dealers.findIndex(x => x.roles === 2);
                if (index !== undefined) this.dealers.splice(index, 1);
                const index1 = this.dealers.findIndex(x => x.roles === 1);
                if (index1 !== undefined) this.dealers.splice(index1, 1);
            })
            .catch(e => {
                console.error(e);
            })  
    },
    data() {
      return {
        showLoader: false
      }
    },
    head() {
      return {
        title: 'Concesionarios'
      }
    },

    beforeRouteLeave(to, from, next){
      this.showLoader = true;
      next()
    },
  }
</script>

<style lang="scss" scoped>

</style>
