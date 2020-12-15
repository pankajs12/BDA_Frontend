<template>
  <div>
    <nuxt />
    <UserManagerDashboardTabs />
    <div class="content-wrapper" style="margin-left: 240px;
    margin-top: 70px;">
    <h2 style="text-align:center; ">Roles</h2>
    <v-card>
    <v-card-title>
      Users List
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search dealer"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
    <template v-slot:item="props">
        <tr>
            <td>{{ props.item.dealer_name }}</td>
            <td>{{ props.item.email }}</td>
            <td>{{ props.item.address }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.phone }}</td>
            <td>$ {{ props.item.price }}</td>
            <td v-if="props.item.roles === 1"><v-btn @click="changeRole(props.item._id)"  style="color:red;">Admin</v-btn></td>
            <td v-else><v-btn @click="changeRole(props.item._id)" style="color:green;">Dealer</v-btn></td>
        </tr>
    </template>
    </v-data-table>
  </v-card>
    </div>    
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    layout: 'adminpage',
    name: 'roles',
    components: {
            UserManagerDashboardTabs: () => import('@/components/dashboard/UserManagerDashboardTabs')
        },
        data(){
          return{
              search:' ',
            items: [ ],
            headers: [
                          { text: 'Dealer Name', align: 'start', sortable: false, value: 'dealer_name' },
                          { text: 'Email Id', value: 'emailid' },
                          { text: 'Address', value: 'address' },
                          { text: 'Subscription Type', value: 'subscriptiontype' },
                          { text: 'Dealer Phone', value: 'dealerphone' },
                          { text: 'Payment', value: 'payment' },
                          { text: 'Roles', value: 'roles' },
              ],
          }
        },
        mounted(){
            var isUserLogin = localStorage.hasOwnProperty('user');
            if(isUserLogin == false){
                window.location.href = '../Inicio de sesión del distribuidor';
            }

            axios.get(`${process.env.BACKEND_API}/getAllDealersDataDealerManagement`)
            .then(res => {
                console.log('dealers data', res.data);
                this.items = res.data;
                const index = this.items.findIndex(x => x.roles === 2);
                if (index !== undefined) this.items.splice(index, 1);
            })
            .catch(e => {
                console.error(e);
            })  

        },

        methods: {
            changeRole(id){
            console.log('id',id);
            axios.post(`${process.env.BACKEND_API}/changeRole`, { id: id })
            .then(res => {
              const status = res.status;
              if(status == 200){
                this.$toast.success('Roles changed successfully');
                setTimeout( () => window.location.href = '/dealers/roles', 2000);
              }
            }).catch(e => {
              console.error(e);
               const errorCode = parseInt(e.response.status);
                // if(errorCode == 304){
                //   this.$toast.error('This dealer is already suspended');
                //   setTimeout( () => window.location.href = '/dealers/roles', 2000);
                // }
            })
          }
        }
         
  }
</script>

<style lang="scss" scoped>

</style>