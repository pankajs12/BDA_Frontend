<template>
  <div>
    <nuxt />
    <DealerDashboardTabs />
    <h3 style="text-align:center; margin-top: 100px; margin-left: 240px;">Payment Management</h3>
    <div class="container" v-if="roles==1" style="margin-left: 320px; margin-top: 30px;">
    <div class="row">
        <div class="col-md-3">
            <div class="panel panel-danger">
                <div class="panel-heading">
                    <h4 class="text-center">
                        MONTHLY</h4>
                </div>
                <div class="panel-body text-center">
                    <p class="lead">
                        <strong>${{monthly}}</strong></p>
                        <v-form>
                                <v-text-field
                                  name="monthly"
                                  type="number"
                                  v-model="monthly"
                                ></v-text-field>
                        </v-form>
                </div>
                <div class="panel-footer">
                    <a class="btn btn-lg btn-block btn-default" @click="submitPrice">Submit</a>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <h4 class="text-center">
                        QUARTERLY</h4>
                </div>
                <div class="panel-body text-center">
                    <p class="lead">
                        <strong>${{quarterly}}</strong></p>
                        <v-form>
                              <v-text-field
                                  name="quarterly"
                                  type="number"
                                  v-model="quarterly"
                                ></v-text-field>
                        </v-form>
                </div>
                <div class="panel-footer">
                    <a class="btn btn-lg btn-block btn-default" @click="submitPrice">Submit</a>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h4 class="text-center">
                        YEARLY</h4>
                </div>
                <div class="panel-body text-center">
                    <p class="lead">
                        <strong>${{yearly}}</strong></p>
                        <v-form>
                                <v-text-field
                                  name="yearly"
                                  type="number"
                                  v-model="yearly"
                                ></v-text-field>
                          </v-form>
                </div>
                <div class="panel-footer">
                    <a class="btn btn-lg btn-block btn-default" @click="submitPrice">Submit</a>
                </div>
            </div>
        </div>        
    </div>
</div>      
  </div>
</template>

<script>
import axios from 'axios'
import { ValidationProvider, ValidationObserver} from 'vee-validate';
  export default {
    layout: 'adminpage',
    name: 'paymentmanagement',
    components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            ValidationProvider,
            ValidationObserver,
        },
        data(){
          return{
            roles:"",
            monthly:"",
            quarterly:"",
            yearly:"",
          }
        },
        mounted(){
        var userdata = localStorage.getItem('user')
        this.username = JSON.parse(userdata)[0].dealername;
        this.roles = JSON.parse(userdata)[0].roles;
             var isUserLogin = localStorage.hasOwnProperty('user');
            console.log('dealernames',isUserLogin);
            if(isUserLogin == false){
                window.location.href = '../Inicio de sesión del distribuidor';
            }

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
        methods: {
          submitPrice(){
             console.log('monthly clicked');
             
             axios.post(`${process.env.BACKEND_API}/paymentPriceUpdate`, {
            id: '5f9c4f2d32b4703678fd25a3',
            monthly_price: this.monthly,
            quarterly_price: this.quarterly,
            yearly_price: this.yearly,
            })
            .then(res => {
                console.log('result', res.data.value);
                const status = res.status;
                if (status == 200) {
                    this.$toast.success('Price Updated Successfully');
                    setTimeout( () => window.location.href = 'paymentmanagement', 2000);
                }
            })
            .catch(e => {
                console.error(e);
                this.$toast.error("Invalid data");
                setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 2000);
            }) 
          },
        }
  }
</script>

<style lang="scss" scoped>
.lead { font-size: 33px;margin-bottom:0px; }
</style>
