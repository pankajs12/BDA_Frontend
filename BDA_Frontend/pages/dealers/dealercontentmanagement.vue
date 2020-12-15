<template>
  <div>
    <nuxt />
    <LoadingIndicator v-if="showLoader" />
    <DealerDashboardTabs />
    <div class="content-wrapper" style="margin-left: 240px;
    margin-top: 100px;">
    <h3 style="text-align:center;">Content Management</h3>
   <v-card>
    <v-card-title>
      Homenet data
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="inventoryData"
      :search="search"
    >
    <template v-slot:item="props">
        <tr>
            <td>{{ props.item.vehicle.vehicleId.dealerId }}</td>
            <td>{{ props.item.vehicle.vehicleId.vin }}</td>
            <td>{{ props.item.vehicle.vehicleCondition }}</td>
            <td>{{ props.item.vehicle.year }}</td>
            <td><nuxt-link :to="'/inventario/vehicle_details/?id=' + props.item.vehicle.vehicleId.vin">View Details</nuxt-link></td>
        </tr>
    </template>
    </v-data-table>
  </v-card>

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
  export default {
    layout: 'adminpage',
    name: 'DealerProfile',
    components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            LoadingIndicator
        },
        data(){
          return{
                showLoader: true,
                search:' ',
                inventoryData: [ ],
                headers: [
                              { text: 'Dealer Id', align: 'start', sortable: false, value: 'dealer_id' },
                              { text: 'Vehicle Id', value: 'vehicleid' },
                              { text: 'vehicleCondition', value: 'vehiclecondition' },
                              { text: 'Year', value: 'year' }
                  ],
          }
        },
    
        mounted(){
             var isUserLogin = localStorage.hasOwnProperty('user');
            console.log('dealernames',isUserLogin);
            if(isUserLogin == false){
                window.location.href = '../Inicio de sesión del distribuidor';
            }
            
            axios.get(`${process.env.BACKEND_API}/getAllDealersHomenetInventory`)
            .then(res => {
                console.log('dealers homenet inventory', res.data);
                setTimeout(() => {
                  this.showLoader = false;
                  });
                this.inventoryData = res.data;
            })
            .catch(e => {
                console.error(e);
            })
        }
  }
</script>

<style lang="scss" scoped>

</style>
