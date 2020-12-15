  <template>
    <v-row>
  <v-col v-for="(spec, val) in specs" :key="spec.name" cols="6" class="py-0">
    <v-row align="start" justify="start">
      <v-col cols="2" style="height:50px">
    <v-icon>{{spec.icon}}</v-icon>
      </v-col>
      <v-col cols="10">
<span class="overline d-block"> {{val}}</span>
<span class="overline">{{spec.name}}</span>
      </v-col>
    </v-row>
  </v-col>
  </v-row>

</template>

<script>
export default {
  name: "vehicle-specs-card",
  props: ["details"],
  data() {
    return {
      specs: null
    }
  },
  mounted() {
    this.specs = {
            [this.$t('labels.drivetype')] : {
              name: this.details.drivetrain,
              icon: 'mdi-highway'
            },
            [this.$t('labels.engine')] :{
              name:  this.details.engdescription,
              icon: 'mdi-engine'
            },
            [this.$t('labels.transmission')] : {
              name: this.details.transdescription,
              icon: 'mdi-car-shift-pattern'
            },
            [this.$t('labels.fueltype')] : {
              name:  this.details.fueltype,
              icon: 'mdi-gas-station'
            },
            [this.$t('labels.mpg')] : {
              name: 'City:' + this.details.epacity || 'NA' + ' / ' + this.details.epahighway || 'NA',
              icon: 'mdi-road'
            },
            [this.$t('labels.exterior')] :{
              name: this.details.extcolorgeneric,
               icon: 'mdi-format-color-fill'
            } ,
            [this.$t('labels.interior')] : {
              name: this.details.intcolor,
              icon: 'mdi-format-color-fill'
            }
    }
  },
};
</script>

<style lang="scss" scoped>
 .overline {
  font-family:futura-pt, sans-serif !important
 }
</style>

