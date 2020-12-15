<template>
<div>
  <v-app-bar id="tbExtended" extended app
             :height="appBarHeight" clipped-left
             :extension-height="extensionHeight" color="bdablue">
    <template #extension>
      <v-container fluid class="py-0">
        <v-row align="center" justify="center"  :style="{height: $route.fullPath !== '/' ? '30px' : ''}">
          <v-btn v-if="$route.fullPath.includes('busqueda') || $route.fullPath.includes('inventario') &&  $route.fullPath.includes('concesionarios')" large dark text
                 @click.stop="showSideNav = !showSideNav">
            <v-icon dark>mdi-filter-variant</v-icon>
            Filter
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn large color="white" dark text
                 @click="showSavedVehicles = !showSavedVehicles">
            <v-icon left color="white">mdi-star</v-icon>
            ver favoritos
            ({{savedVehicles.length > 0 ? savedVehicles.length :  '0'}})
          </v-btn>
          <!-- <MobileHeaderSearchBar v-if="$vuetify.breakpoint.smAndDown" /> -->
        </v-row>
        <v-row  v-if="!isHomePage" class="breadcrumb-container mt-5">
          <v-container fluid>
            <bread-crumbs></bread-crumbs>
          </v-container>
        </v-row>
      </v-container>
    </template>
       <!-- <nuxt-link to="/" nuxt v-if="mobileView">
       <v-img  max-width="100" :src="logo"></v-img>
       </nuxt-link> -->
       <nuxt-link to="/" nuxt v-if="mobileView">
           <v-img max-width="80" :src="logo"/>
           </nuxt-link>
                 <nuxt-link to="/" nuxt v-else>
        <v-img :max-width="mobileView ? 100 : 120" :src="logo"></v-img>
      </nuxt-link>
    <v-toolbar-title :style="toolbarStyles" class="ml-0 pl-4">
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="$vuetify.breakpoint.mdAndUp && $route.fullPath.includes('busqueda')">
      <DesktopHeaderSearchBar />
    </div>
    <v-spacer></v-spacer>
                       <v-app-bar-nav-icon v-if="mobileView" @click.stop="navdrawer = !navdrawer" />
    <v-toolbar-items id="main_nav_items" v-if="!mobileView">
      <v-btn exact text to="/" nuxt>{{ $t('navigation.home') }}</v-btn>
      <v-btn exact text :to="{ name:'busqueda___es' }" nuxt>
        {{ $t('navigation.search') }}</v-btn>
      <v-btn exact text to="/concesionarios" nuxt>{{ $t('navigation.dealers') }}
      </v-btn>
      <v-btn exact text to="/registro de distribuidor" nuxt v-show="!showLink">registro de distribuidor
      </v-btn>
      <v-btn exact text to="/Inicio de sesión del distribuidor" nuxt v-show="!showLink">Inicio de sesión del distribuidor
      </v-btn>
      
      <v-btn exact text to="/admin" nuxt v-show="showLink"><span style="color: darkorange;">{{username}}</span>
      </v-btn>
      
    </v-toolbar-items>
  </v-app-bar>
      <v-navigation-drawer right app v-model="navdrawer" :clipped="$vuetify.breakpoint.mdAndUp" disable-resize-watcher style="z-index:9999">
  <v-list dense>
    <v-list-item to="/" nuxt>
  {{ $t('navigation.home') }}
    </v-list-item>
    <v-list-item :to="{ name:'busqueda___es' }" nuxt>
       {{ $t('navigation.search') }}
    </v-list-item>
    <v-list-item  to="/concesionarios" nuxt>
    {{ $t('navigation.dealers') }}
    </v-list-item> 
    <v-list-item  to="/registro de distribuidor" nuxt>
registro de distribuidor
    </v-list-item> 
     <v-list-item to="/Inicio de sesión del distribuidor" nuxt>Inicio de sesión del distribuidor
      </v-list-item>

  </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import {
    sync
  } from 'vuex-pathify'
  import axios from 'axios';
  export default {
    name: 'MainAppBarWithAlgolia',
    components: {
      MainWebsiteLogo: () => import('@/components/MainWebsiteLogo.vue'),
      BreadCrumbs: () => import('@/components/breadcrumbs/BreadCrumbs'),
      MobileHeaderSearchBar: () => import(
        '@/components/search/MobileHeaderSearchBar'),
      DesktopHeaderSearchBar: () => import(
        '@/components/search/DesktopHeaderSearchBar'),
    },
    data() {
      return {
        dataReady: false,
        navdrawer:false,
        showLink: "",
        username: "",
        logo: 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png',
        mobileLogo: 'https://res.cloudinary.com/buscador-de-auto/image/upload/v1583347646/brand-assets/bda_small_icon.png',
        toolbarStyles: {
          width: this.$vuetify.breakpoint.mdAndUp ? '180px' : '',
          overflow: 'visable',
        }
      }
    },
   
    beforeMount() {
      var self = this;
      var isUserLogin = localStorage.hasOwnProperty('user');
       var userdata = localStorage.getItem('user');
      console.log('dealernames----------------------',userdata);
      if(isUserLogin == true){
        self.showLink = true;
        self.username = JSON.parse(userdata)[0].dealer_name;
      }else{
        self.showLink = false;
      }
     

    },
    
    computed: {
      isHomePage() {
        return this.$route.fullPath === '/' ? true : false
      },
      mobileView () {
        return this.$vuetify.breakpoint.smAndDown ? true : false
      },
      extensionHeight() {
        if (this.$vuetify.breakpoint.mdAndUp && this.$route.fullPath === "/") {
          return 40;
        } else if (this.mobileView && this.$route
          .fullPath === "/") {
          return 40;
        }  else if (this.mobileView && !this.$route
          .fullPath === "/")  {
              return 50;
          } else {
          return 95;
        }
      },
      appBarHeight() {
        if (this.$vuetify.breakpoint.mdAndUp && this.$route.fullPath === "/") {
          return 80;
        } else if (this.mobileView && this.$route
          .fullPath === "/") {
          return 65;
        } else if (this.mobielView && !this.$route
          .fullPath === "/")  {
              return 50;
          }else if (this.mobileView){
            return 50;
          }
        else {
          return 95;
        }
      },

      showSavedVehicles: {
        get() {
          return this.$store.get('navigation/show_saved_vehicles')
        },
        set() {
          this.$store.set('navigation/show_saved_vehicles', true)
        }
      },
      showSideNav: {
        get() {
          return this.$store.get('navigation/show_side_nav')
        },
        set(value) {
          this.$store.set('navigation/show_side_nav', value)
        }

      },
      savedVehicles() {
        return this.$store.get('savedVehicles/vehicles')
      },
    },


  }

</script>

<style lang="scss" scoped>

</style>
