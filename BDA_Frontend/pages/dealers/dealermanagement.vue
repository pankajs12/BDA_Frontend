<template>
<div id="app">
  <nuxt />
  <LoadingIndicator v-if="showLoader" />
  <DealerDashboardTabs />
  <div class="col-lg-12 col-md-12 col-sm-12 col-12 mb-2 mt-4">
  <v-app id="inspire" style="margin-left: 240px;
    margin-top: 50px;">
    <h3 style="text-align:center; margin-top:50px;">Dealer Management</h3>
    <v-card>
    <v-card-title>
      <!-- Dealer List -->
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
            <!-- <td>{{ props.item.english_website_url }}</td> -->
            <td>{{ props.item.phone }}</td>
            <!-- <td>{{ props.item.dealer_type }}</td>
            <td>{{ props.item.subscription_date }}</td>
            <td>{{ props.item.subscription_expiration_date }}</td> -->
            <!-- <td>$ {{ props.item.price }}</td> -->
            <td v-if="props.item.activate_suspend_status === 0"><v-btn @click="suspend(props.item._id)" disabled>Suspended</v-btn></td>
            <td v-else><v-btn @click="suspend(props.item._id)">Suspend</v-btn></td>
            <td v-if="props.item.activate_suspend_status === 1"><v-btn @click="activate(props.item._id)" disabled>Activated</v-btn></td>
            <td v-else><v-btn @click="activate(props.item._id)">Activate</v-btn></td>
            <td v-if="props.item.approve_status === 1"><v-btn block color="#019cf7" @click="approve(props.item._id)" disabled>Approved</v-btn></td>
            <td v-else><v-btn block color="#019cf7" @click="approve(props.item._id)">Approve</v-btn></td>
            <td v-if="props.item.approve_status === 0"><v-btn block color="#b31c05" @click="reject(props.item._id)" disabled>Rejected</v-btn></td>
            <td v-else><v-btn block color="#b31c05" @click="reject(props.item._id)">Reject</v-btn></td>
            <td><nuxt-link :to="'/dealers/dealers_edit/?id=' + props.item._id">Edit</nuxt-link></td>
        </tr>
    </template>
    </v-data-table>
  </v-card>
    
  </v-app>
  </div>
</div>

</template>

<script>
import axios from 'axios';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
  export default {
    layout: 'adminpage',
    name: 'dealermanagement',
    components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            LoadingIndicator
        },
        data(){
          return{
            showLoader:true,
            search:' ',
            items: [ ],
            headers: [
                          { text: 'Dealer Name', align: 'start', sortable: false, value: 'dealer_name' },
                          { text: 'Email Id', value: 'emailid' },
                          { text: 'Address', value: 'address' },
                          { text: 'Subscription Type', value: 'subscriptiontype' },
                          // { text: 'Website', value: 'website' },
                          { text: 'Dealer Phone', value: 'dealerphone' },
                          // { text: 'Dealer Type', value: 'dealertype' },
                          // { text: 'Subscription Date', value: 'subscription_date' },
                          // { text: 'Subscription Expiration Date', value: 'subscription_expiration_date' },
                          // { text: 'Payment', value: 'payment' },
                          { text: 'Suspend', value: 'suspend' },
                          { text: 'Activate', value: 'activate' },
                          { text: 'Approve', value: 'approve' },
                          { text: 'Reject', value: 'reject' },
                          { text: 'Edit', value: 'edit' },
              ],
          }
        },
        mounted(){
             var isUserLogin = localStorage.hasOwnProperty('user');
            console.log('dealernames',isUserLogin);
            if(isUserLogin == false){
                window.location.href = '../Inicio de sesión del distribuidor';
            }
          axios.get(`${process.env.BACKEND_API}/getAllDealersDataDealerManagement`)
            .then(res => {
                console.log('dealers data', res.data);
                setTimeout(() => {
                  this.showLoader = false;
                  }, 500);
                this.items = res.data;
                const index = this.items.findIndex(x => x.roles === 1);
                if (index !== undefined) this.items.splice(index, 1);
            })
            .catch(e => {
                console.error(e);
            })  
        },

        methods: {
          approve(id){
            console.log('approve',id);
            axios.post(`${process.env.BACKEND_API}/approve`, { id: id })
            .then(res => {
                const status = res.status;
                if (status == 200) {
                    this.$toast.success('Dealer approved successfully');
                    setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
                }
            })
            .catch(e => {
                console.error(e);
                const errorCode = parseInt(e.response.status);
                if(errorCode == 304){
                  this.$toast.error('This dealer is already approved');
                  setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
                }
            })
          },
          reject(id){
            console.log('reject',id);
            axios.post(`${process.env.BACKEND_API}/reject`, { id: id })
            .then(res => {
              const status = res.status;
              if(status == 200){
                this.$toast.success('Dealer rejected successfully');
                setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
              }
            }).catch(e => {
              console.error(e);
              const errorCode = parseInt(e.response.status);
                if(errorCode == 304){
                  this.$toast.error('This dealer is already rejected');
                  setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
                }
            })
          },
          suspend(id){
            console.log('suspend',id);
            axios.post(`${process.env.BACKEND_API}/suspend`, { id: id })
            .then(res => {
              const status = res.status;
              if(status == 200){
                this.$toast.success('Dealer suspended successfully');
                setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
              }
            }).catch(e => {
              console.error(e);
               const errorCode = parseInt(e.response.status);
                if(errorCode == 304){
                  this.$toast.error('This dealer is already suspended');
                  setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
                }
            })
          },
          activate(id){
            console.log('activate',id);
            axios.post(`${process.env.BACKEND_API}/activate`, { id: id })
            .then(res => {
              const status = res.status;
              if(status == 200){
                this.$toast.success('Dealer activated successfully');
                setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
              }
            }).catch(e => {
              console.error(e);
                  this.$toast.error(e);
                  setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
            })
          }
        }
  }
</script>

<style lang="scss" scoped>

</style>
