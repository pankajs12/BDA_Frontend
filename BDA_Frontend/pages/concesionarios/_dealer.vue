<template>
<v-container fluid id="dealerViewWrapper">
<v-row align="center" id="single_dealer_intro" v-show="$refs.tab_0 && !$refs.tab_1[0].isActive" :style="{paddingTop: isMobile ? '50px' : '100px'}">
  <v-col cols="12" class="pt-0 px-0">
        <v-img max-height="600" position="center center" :src="profile.imageFile" :alt="profile.dealer_name"/>
  </v-col>
</v-row>
<v-row>
  <SingleDealerMainHeader :profile="profile" :show_tabs="true" :rating="rating"/>
  </v-row>
  <v-tabs style="display:none" @change="tabUpdated" v-model="tab" :style="{paddingTop:$refs.tab_0 && this.$refs.tab_1[0].isActive ? '200px' : ''}">
      <v-tab
        :ref="`tab_${idx}`"
        v-for="(item, idx) in items"
        :key="item.tab"
        :to="item.route ? { name: item.route } : undefined"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
      <v-row v-if="$refs.tab_0 && $refs.tab_0[0].isActive">
        <DealerIntro keep-alive :profile="profile"></DealerIntro>
  </v-row>
    <v-row v-if="$refs.tab_1 && $refs.tab_1[0].isActive">
      <v-card flat tile>
<DealerInventoryView :dealer-id="dealerId"/>
  </v-card>
    </v-row>

</v-container>
</template>

<script>
import axios from "axios";
  export default {
    name:'DealerProfilePage',
    fetch({store, params, $axios}) {
      const dealerName = params.dealer
      var dealerId = params.dealer.replace(/[-]/g , '_');
    //     return $axios.get(`/getAllDealersHomenetInventoryByDealerId/${dealerId}`)
    // .then((res) => {
    //   store.set('currentDealerProfile/profile', res.data)
    // })
    axios.post(`${process.env.BACKEND_API}/getDealersDetailByDealerId`, {
            dealerId: dealerId,
            })
            .then(res => {
              // console.log("datasssssss=====================",res.data[0]);
              store.set('currentDealerProfile/profile', res.data[0])
            })
            .catch(error => {
              console.log(error);
            })
    },
    components: {
      DealersInventoryReviewsTabs: ()=> import('@/components/tabs/DealersInventoryReviewsTabs.vue'),
      DealerProfileHeroSection: ()=> import('@/components/dealer-profile/DealerProfileHeroSection.vue'),
      SingleDealerMainHeader: ()=> import('@/components/dealer-profile/SingleDealerMainHeader'),
      AboutTab: ()=> import('@/components/dealer-profile/AboutTab'),
      DealerIntro: ()=> import('@/components/dealer-profile/DealerIntro'),
      DealerServicesInfo: ()=> import('@/components/dealer-profile/DealerServicesInfo'),
      DealerInventoryView:()=> import('@/components/dealer-profile/DealerInventoryView')
    },
    data() {
      return {
         rating: 4,
         showHeader: false,
           tab: 0,
        items: [
         {  tab:0 , name: this.$t('labels.about_us'), component: 'DealerIntro', route: 'concesionarios-dealer___es'},
        {   tab:1 , name: this.$t('labels.inventory'), content: 'Tab 2 Content' , route: 'concesionarios-dealer-inventario___es' },
        // {   tab:2 , name: this.$t('labels.services'), route: 'concesionarios-dealer-servicios___es' },
          // { tab:3 , name: this.$t('labels.reviews'), content: 'Tab 4 Content' },
        ],

      }
    },
    head() {
      return {
        title: `${this.$store.get('currentDealerProfile/profile.dealer_name')} en ${this.$store.get('currentDealerProfile/profile.city')}`
      }
    },
    mounted() {
      // this.dealerId = this.$route.query.dealerId;
      

     this.$store.set('navigation/dealerInventoryActive', false)
       this.$store.set('navigation/show_side_nav' , false)
      this.$nextTick(() => {
          var vm = this
    window.addEventListener('scroll', function(e){
      var scrollPos = window.scrollY
      var winHeight = window.innerHeight
      var docHeight = document.documentElement.scrollHeight
      var perc = 100 * scrollPos / (docHeight - winHeight)
      if(scrollPos > 300){
        vm.showHeader = true;
      }else {
        vm.showHeader = false;
      }
    })
      })
    },
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint.smAndDown
      },
      dealerId () {
        return this.$route.params.dealer.replace(/[-]/g , '_');
      },
      dealerInventoryActive() {
        return this.$refs.tab_1 && this.$refs.tab_1[0].isActive ? true : false
      },
        profile () {
        return this.$store.get('currentDealerProfile/profile')
      },
      desktopView () {
        return this.$vuetify.breakpoint.mdAndUp ? true : false;
      }
    },
    beforeDestroy() {
      this.$store.set('navigation/show_side_nav', false)
      this.$store.get('navigation/dealerInventoryActive', false)
    },
    methods: {
  tabUpdated () {
  if(this.$refs.tab_1 && this.$refs.tab_1[0].isActive){
      this.$store.set('navigation/show_side_nav' , true)
  }else {
      this.$store.set('navigation/show_side_nav' , false)
  }
    // this.$store.set('navigation/show_side_nav' , false)
  }
    },

  }
</script>

<style lang="scss" scoped>

</style>
