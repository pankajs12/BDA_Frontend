<template>
  <v-row align="center" :style="headerStyles" class="pa-0">
    <v-col cols="12" class="py-0">
      <v-row align="center" :style="{height: isMobile ? '60px' : ''}">
    <v-col cols="6" md="4" :class="{'pa-2': isMobile }">
      <nuxt-link :to="`/concesionarios/${$route.params.dealer}`">
   <v-img :max-width="isMobile ? 150 : 300" max-height="100" :src="profile.logo_url"></v-img>
      </nuxt-link>
    </v-col>
    <v-spacer></v-spacer>
       <v-btn v-if="isMobile" text :href="`tel:${profile.phone}`"><v-icon left>mdi-phone</v-icon>{{ profile.phone }}</v-btn>

   <div>
    <address v-if="!isMobile">
      <v-btn  text :href="`tel:${profile.phone}`"><v-icon left>mdi-phone</v-icon>{{ profile.phone }}</v-btn><br/>
      <v-btn text><v-icon left>mdi-google-maps</v-icon>{{ profile.address }}, {{ profile.city }}, {{ profile.state }} {{ profile.zip_code }}</v-btn>
    </address>
 <!-- <v-rating :value="rating" color="orange" background-color="rgb(230, 230, 230)"></v-rating> -->
 </div>
      </v-row>
    </v-col>
    <v-col cols="12" class="pa-0" v-if="show_tabs">
  <v-tabs show-arrows prev-icon="mdi-chevron-left" next-icon="mdi-chevron-right" v-model="tab" active-class="activatedTab" background-color="#f7f7f7" hide-slider>
      <v-tab
        exact
        :ref="`tab_${idx}`"
        v-for="(item, idx) in items"
        :key="item.tab"
        :to="item.route ? { name: item.route } : undefined"
      >
        {{ item.name }}
      </v-tab>
    </v-tabs>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'SingleDealerMainHeader',
    props: ['profile', 'rating', 'show_tabs'],
    data() {
      return {
           headerStyles : {
          backgroundColor: "white",
          position: 'fixed',
          width: '100%',
          zIndex: 100,
          margin:0,
          left: 0,
          top: this.$vuetify.breakpoint.mdAndUp ?  '190px' : '100px',
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 0px 0px",
        },
             tab: 0,
        items: [
         {  tab:0 , name: this.$t('labels.about_us'), component: 'DealerIntro', route: 'concesionarios-dealer___es'},
        {   tab:1 , name: this.$t('labels.inventory'), content: 'Tab 2 Content' , route: 'concesionarios-dealer-inventario___es' },
        // {   tab:2 , name: this.$t('labels.services'), route: 'concesionarios-dealer-servicios___es' },
        ],
      }
    },
    computed: {
      isMobile () {
        return this.$vuetify.breakpoint.smAndDown;
      }
    },
    mounted() {
      if(this.$vuetify.breakpoint.smAndDown){
        this.$store.set('navigation/show_side_nav' , false)
      }
    },
  }
</script>

<style lang="scss" scoped>
a.activatedTab.v-tab--active.v-tab.activatedTab {
    background: rgb(1, 123, 227);
    color: rgb(255, 255, 255);
}
</style>
