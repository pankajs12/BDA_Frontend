<template>
 <v-card
    class="mx-auto"
  >
  <v-card-title :style="{ backgroundColor: $vuetify.theme.currentTheme.bdablue, color: 'white', textTransform: 'capitalize' }">
    {{ $t('labels.dealer_information') }}
  </v-card-title>
    <v-list two-line>
      <v-list-item :href="`tel:${sales_phone}`">
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-subtitle class="overline">{{ $t('labels.sales') }}</v-list-item-subtitle>
          <v-list-item-title>{{profile.sales_phone}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- <v-list-item :href="`tel:${service_phone}`">
        <v-list-item-action></v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="overline">{{ $t('labels.service') }}</v-list-item-subtitle>
          <v-list-item-title>{{profile.service_phone}}</v-list-item-title>

        </v-list-item-content>
      </v-list-item>
      <v-list-item :href="`tel:${parts_phone}`">
        <v-list-item-action></v-list-item-action>
        <v-list-item-content>
          <v-list-item-subtitle class="overline">{{ $t('labels.parts') }}</v-list-item-subtitle>
          <v-list-item-title>{{profile.parts_phone}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
      <!-- <v-divider inset></v-divider>
      <v-divider inset></v-divider> -->

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>
            <v-list-item-content>
              <v-row>
                <v-col cols="12">
                      <v-list-item-content>
          <v-list-item-title>{{profile.address}}</v-list-item-title>
          <v-list-item-subtitle>{{profile.city}}, {{profile.state}} {{profile.zip_code}}</v-list-item-subtitle>
        </v-list-item-content>
                </v-col>
                <v-col cols="12">
			<iframe style="border: 0;" :src="googleMapsPath" width="100%" height="200px" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
                </v-col>
              </v-row>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    name: 'DealerInfoSidebar',
    props: ['profile'],
    data() {
      return {
        departments: [
          {
            name: 'sales',
            value: 'sales',
            hours: []
          },
             {
            name: 'service',
            value: 'sales',
            hours: []
          },
             {
            name: 'parts',
            value: 'sales',
            hours: []
          }
        ],
        sales_phone:""
      }
    },
    computed: {
      googleMapsPath () {
        return `https://www.google.com/maps/embed/v1/place?q=place_id:${this.profile.google_places_id}&key=AIzaSyB_HqXDeNsH0HN-SZIT2OPyESv3Cpvmav8&language=es`
      }
    },
    mounted() {
    },

  }
</script>

<style lang="scss" scoped>

</style>
