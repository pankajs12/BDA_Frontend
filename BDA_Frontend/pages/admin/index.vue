 <template>
 <div>
      <nuxt />
      <v-row v-if="roles==1">
        <DealerDashboardTabs />
      </v-row>
      <v-row v-else-if="roles==2">
        <UserManagerDashboardTabs/>
      </v-row>
      <v-row v-else>
        <UsersDashboardTabs/>
      </v-row>
      <div class="content-wrapper" v-if="roles==1" style="margin-left: 240px;
    margin-top: 80px;">
        <div class="container">
        <div class="row">
          <div class="col-md-3">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="text-center">
                            Dealers</h4>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead">
                            <strong>{{totalDealers}}</strong></p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="panel panel-danger">
                    <div class="panel-heading">
                        <h4 class="text-center">
                            Monthly</h4>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead">
                            <strong>${{monthly}}</strong></p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <h4 class="text-center">
                            Quarterly</h4>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead">
                            <strong>${{quarterly}}</strong></p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="panel panel-success">
                    <div class="panel-heading">
                        <h4 class="text-center">
                            Yearly</h4>
                    </div>
                    <div class="panel-body text-center">
                        <p class="lead">
                            <strong>${{yearly}}</strong></p>
                    </div>
                </div>
            </div>        
        </div>
    </div>
        
        <div class="col-lg-8 col-md-8 col-sm-6 col-12 mb-2 mt-4">
          <h3 style="text-align: center; color: burlywood;">New Recent Dealer's</h3>
      <v-data-table
            :headers="headers"
            :items="itemss"
            :items-per-page="5"
            class="elevation-1"
          >
          <template v-slot:item="props">
              <tr>
                  <td>{{ props.item.dealer_name }}</td>
                  <td>{{ props.item.email}}</td>
                  <!-- <td>{{ props.item.address }}</td>
                  <td>{{ props.item.description }}</td>
                  <td>{{ props.item.english_website_url }}</td> -->
                  <td>{{ props.item.phone }}</td>
                  <td>{{ props.item.dealer_type }}</td>
              </tr>
          </template>
          </v-data-table>
        </div>
      </div>
      <!-- user manager dashbaord -->
      <div class="content-wrapper" v-else-if="roles==2" style="margin-left: 240px;
    margin-top: 50px;">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                  <div class="inforide">
                    <div class="row">
                      <div class="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                      </div>
                      <h4>Welcome <span style="color:green;">{{username}}</span></h4>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
<!-- dealer profile part -->
      <div class="content-wrapper" v-else style="margin-left: 240px;
    margin-top: 50px;">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-4 col-md-4 col-sm-6 col-12 mb-2 mt-4">
                  <div class="inforide">
                    <div class="row">
                      <div class="col-lg-3 col-md-4 col-sm-4 col-4 rideone">
                      </div>
                      <h4>Welcome <span style="color:red;">{{username}}</span></h4>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
 </div>
</template>

<script>
import axios from 'axios';
export default {
  layout: 'adminpage',
        components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            UsersDashboardTabs: () => import('@/components/dashboard/UsersDashboardTabs'),
            UserManagerDashboardTabs: () => import('@/components/dashboard/UserManagerDashboardTabs'),
        },
    data(){
        return{
            monthly:"",
            quarterly:"",
            yearly:"",
            totalDealers: 0,
            username:"",
            roles:"",
            itemss: [ ],
            headers: [
                          {
                            text: 'Dealer Name',
                            align: 'start',
                            sortable: false,
                            value: 'dealername',
                          },
                          { text: 'Email Id', value: 'emailid' },
                          // { text: 'Address', value: 'address' },
                          // { text: 'Subscription Type', value: 'subscriptiontype' },
                          // { text: 'Website', value: 'website' },
                          { text: 'Dealer Phone', value: 'dealerphone' },
                          { text: 'Dealer Type', value: 'dealertype' },
              ],
        }
    },
    
    mounted(){
        var userdata = localStorage.getItem('user')
        this.username = JSON.parse(userdata)[0].dealer_name;
        this.roles = JSON.parse(userdata)[0].roles;
        console.log('get user data',JSON.parse(userdata)[0].roles);
        var isUserLogin = localStorage.hasOwnProperty('user');
        // console.log('dealernames',isUserLogin);
      if(isUserLogin == false){
        window.location.href = './Inicio de sesión del distribuidor';
      }
      
      axios.post(`${process.env.BACKEND_API}/getAllDealersDataForDealersDashboard`,{
        subscription_date: this.getNow()
      })
      .then(res => {
          this.itemss = res.data;
          this.totalDealers = this.itemss.length;
      })
      .catch(e => {
          console.error(e);
      })  

       axios.get(`${process.env.BACKEND_API}/getAllPaymentPrice`)
            .then(res => {
            this.monthly = res.data[0].monthly_price;
            this.quarterly =  res.data[0].quarterly_price;
            this.yearly = res.data[0].yearly_price;
            })
            .catch(e => {
                console.error(e);
            }) 

    },
    methods:{
      getNow() {
            const today = new Date();
            today.setMonth(today.getMonth());
            const date = today.toLocaleDateString()
            var dateTime = date;
            return dateTime;
        }
    }
}
</script>

<style>
/* .v-data-table__wrapper{
  background-color: gainsboro;
} */

</style>