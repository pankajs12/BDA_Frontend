<template>
 <v-card flat>
      <v-expansion-panels
      accordion
      flat
    >
   <v-expansion-panel>
     <v-expansion-panel-header>{{$t('labels.description')}}</v-expansion-panel-header>
     <v-expansion-panel-content>
         <div v-html="description"></div>
     </v-expansion-panel-content>
     </v-expansion-panel>
     <v-expansion-panel>
     <v-expansion-panel-header>
       {{$t('labels.options')}}
       </v-expansion-panel-header>
       <v-expansion-panel-content>
         <v-row style="max-height:300px;overflow:auto">
             <v-col class="options_item pb-0 pt-0" cols="12" md="12" lg="12" v-for="(option, i)  in options" :key="option + '-' + i">
                {{option}}
              </v-col>
         </v-row>
       </v-expansion-panel-content>
     </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>{{$t('labels.safety_equipment')}}</v-expansion-panel-header>
      <v-expansion-panel-content>
       <v-list-item class="pb-0" v-for="(item, i) in safety" :key="i">
             {{item}}
           </v-list-item>
      </v-expansion-panel-content>

      </v-expansion-panel>
      </v-expansion-panels>
 </v-card>
</template>

<script>
  export default {
    name:'VehicleDetailTabs',

    props: {
      safetyEquipment: {
          type: String,
          default: ''
      },
        interiorEquipment: {
          type: String,
          default: ''
      },
      description: {
        type:String,
        default: ''
      },
      options: {
        type:Array,
        default: ()=> {
          return []
        }
      }
    },
    data() {
      return {
        safety: '',
        tabContents: [
          {
            key: 'description',
            name: this.$t('labels.description'),
          }
        ]
      }
    },
    mounted() {
      this.cleanSafety();
    },
    methods: {
      cleanSafety() {
        const safetyContent = this.safetyEquipment.replace(/[~]/g, '');
        const safetyArr = safetyContent.split('Safety@');
        const filtered = safetyArr.filter(i=> i !== '');
        this.safety = filtered;
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
