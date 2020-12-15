<template>
 <v-card flat>
   <v-row align="center">
        <v-col cols="12">
          <v-row align="center">
            <v-col cols="6">
                 <v-card-title class="pa-0" style="text-transform:capitalize">
                    <v-row align="start">
                      <v-col cols="12" class="pt-0 pb-0">
                    <h2 style="font-size:1em">
                    {{dealerName.replace(/[_]/g, ' ')}}
                    </h2>
                      </v-col>
                      <v-col cols="12" class="py-0">
                    <div style="font-size:1em;line-height:1em" class="overline">
                      <h3>
                          {{addressLine1}}<br/>
                          {{city}}, {{state}} {{zipCode}}
                          </h3>
                    </div>
                      </v-col>
                    </v-row>
                </v-card-title>
            </v-col>
            <v-col cols="6">
                  <nuxt-link  style="text-transform:capitalize;word-break:break-word" :to="{
                      name: 'concesionarios-dealer___es',
                      params: { dealer: dealerName.replace(/[_]/g, '-')}
                    }">
                  <dealer-logo :dealer_name="dealerName.replace(/[_]/g, ' ')" :logo="logo"/>
                  </nuxt-link>
            </v-col>
      </v-row>
     </v-col>
   </v-row>
 </v-card>
</template>

<script>
  export default {
    layout: 'search',
    name:'DealerAddress',
    props: {
      dealerName: {
        type: String,
        default: ""
      },
      recordId : {
          type:String,
          default: ''
      },
      addressLine1 : {
        type: String,
        default: "555 nw 10th Street"
      },
      city:  {
        type: String,
        default: 'Miami'
      },
      state: {
        type:String,
        default: 'Florida'
      },
      zipCode: {
        type:Number,
        default: 33022
      },
      logo: {
        type:String,
        default: ''
      }

    },
    components: {
            DealerLogo: ()=> import('@/components/dealer-info/DealerLogo.vue')
    }



  }
</script>

<style lang="scss" scoped>
h2 {
    color: rgb(102, 102, 102);
    line-height: 21px !important;
    height: 56px;
    display: block;
    word-break: break-word;
    text-transform: capitalize;
}
</style>
