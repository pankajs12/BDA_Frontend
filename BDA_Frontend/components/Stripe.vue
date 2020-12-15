<template>    
 <div class="d-flex flex-column align-items-center">
   <!-- <LoadingIndicator v-if="showLoader" /> -->
  <v-container class="fill-height" fluid>
 <v-col cols="12" sm="12" md="4">
        <div class="columns">
          <ul class="price">
            <li class="header">Monthly</li>
            <li class="grey">$ {{monthly_price}}</li>
            <li class="grey">
            <v-btn @click="monthly" style="background-color: #4CAF50;
                border: none;
                color: white;
                padding: 10px 25px;
                text-align: center;
                text-decoration: none;
                font-size: 13px;
                transition: all .2s ease-in-out; 
                hover: background-color:red;">Select</v-btn>
            </li>
          </ul>
        </div>
    </v-col>
    <v-col cols="12" sm="12" md="4">
            <div class="columns">
              <ul class="price">
                <li class="header">Quarterly</li>
                <li class="grey">$ {{quarterly_price}}</li>
                <li class="grey">
            <v-btn class="button" @click="quarterly"  style="background-color: #4CAF50;
                border: none;
                color: white;
                padding: 10px 25px;
                text-align: center;
                text-decoration: none;
                font-size: 13px;
                transition: all .2s ease-in-out; 
                hover: background-color:red;">Select</v-btn>
                </li>
              </ul>
            </div>
    </v-col>
    <v-col cols="12" sm="12" md="4">
            <div class="columns">
              <ul class="price">
                <li class="header">Yearly</li>
                <li class="grey">$ {{yearly_price}}</li>
                <li class="grey">
                  <v-btn class="button" @click="yearly"  style="background-color: #4CAF50;
                  border: none;
                  color: white;
                  padding: 10px 25px;
                  text-align: center;
                  text-decoration: none;
                  font-size: 13px;
                  transition: all .2s ease-in-out; 
                  hover: background-color:red;">Select</v-btn>
                  </li>
              </ul>
            </div>
    </v-col>
    </v-container>
    <form id="payment-form" class="w-75 px-5 d-flex flex-column align-items-center" >
      <div id="card-errors" style="color: red; margin: 10px 0px 0px 200px;"></div>
      <div id="card-errors" style="color: red; margin: 10px 0px 0px 200px;">{{displayErrors}}</div>
        <div ref="card" class="form-control m-2">
          <!-- A Stripe Element will be inserted here. -->
        </div>
        <v-btn :disabled="lockSubmit" class="btn btn-primary shadow-sm" style="margin-top:20px"  block color="#019cf7" dark v-on:click.prevent="submitPayment">PAY {{payAmount}}</v-btn>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
export default Vue.extend({
    name:"Stripe",
    components: {
      LoadingIndicator
    },
  data() {
    return {
          spk:"pk_test_51GHGgRKwZCJ9Iq9U80Po43t5uUg0hwi9aC9KSohCWZpenZow5584vj0AOsP3eg21lqUe1veeImrF3xwrAAVDYZ7n00zUUlZue2",
          stripe:undefined,
          card:undefined,
          payAmount: "",
          lockSubmit:true,
          description: "",
          // showLoader: false,
          displayErrors:"",
          displayError:"",
          subscription_expiration_date:"",
          monthly_price:"",
          quarterly_price: "",
          yearly_price: "",
    }
  }, 
  mounted() {
    var self=this;
    self.stripe= Stripe(self.spk);
    self.card = self.stripe.elements().create('card');
    self.card.mount(self.$refs.card);

    axios.get(`${process.env.BACKEND_API}/getAllPaymentPrice`)
            .then(res => {
            this.monthly_price = res.data[0].monthly_price;
            this.quarterly_price =  res.data[0].quarterly_price;
            this.yearly_price = res.data[0].yearly_price;
            })
            .catch(e => {
                console.error(e);
            }) 
  },
 
  watch:{
    card: function(){
      this.card.on('change', ({error}) => {
      this.displayError = document.getElementById('card-errors');
      if (error) {
        this.displayError.textContent = error.message;
      }
      else {
        this.displayError.textContent = '';
        this.lockSubmit=false
      }
    }); 
    }
  },
  methods: {
        submitPayment(){
          if(this.payAmount !== "" && this.displayError.textContent == ""){
                      if(confirm('Confirm Payment')){
                        this.lockSubmit=true;
                            // this.showLoader = true;
                            this.purchase();
                        }else{
                          this.$router.push('/');
                        }
          }else if(this.displayError.textContent !== ""){
            this.displayErrors = "";
          }
          else{
            this.displayErrors = 'Please select a plan';
          }

        },
          purchase() {
          var self = this;
          self.stripe.createToken(self.card).then(function(result) {
            if (result.error) {
              // alert(result.error.message)
              // self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
              // self.showLoader = false;
              return false;
            }
            else{ 
              self.processTransaction(result.token.id)
              self.submitDataInDatabase();
              console.log('token id',result)
            }
          })
          .catch((err) => {
            alert("error: "+err.message)
            self.lockSubmit=false
          });
        },
        processTransaction(transactionToken){
          var self=this;
          var dt= {
              amount:self.payAmount, //stripe uses an int [with shifted decimal place] so we must convert our payment amount
              currency:"USD",
              description: self.description,
              source:transactionToken,
              email: this.$store.get('dealerRegistration/email')
          }
          // var route="http://buscadorauto.chetu.com:5500/payment"
          var route=`${process.env.BACKEND_API}/payment`;
          axios.post(route,dt, {
              headers: {
              }
          }).then(response => {
              if(response.status==200){
                console.log('transaction successful');
                // this.showLoader = false;
                  // self.submitDataInDatabase();
                  self.lockSubmit=false
              }
              else{
                  throw new Error("failed")
              }
          }).catch((err) => {
              // alert("error: "+err.message)
              self.lockSubmit=false
          });
        },

        monthly(){
          var self = this;
          self.displayErrors = "";
          self.description = 'Monthly';
          const today = new Date();
          today.setMonth(today.getMonth() + 1);
          const date = today.toLocaleDateString()
          // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          self.subscription_expiration_date = date;
          console.log('expiry date for monthly',self.subscription_expiration_date);
          self.payAmount = 199;
          self.$store.set('dealerRegistration/payAmount', '')
          self.$store.set('dealerRegistration/description', '')
        },
        quarterly(){
          var self = this;
          self.displayErrors = "";
          self.description = 'Quarterly';
          const today = new Date();
          today.setMonth(today.getMonth() + 3);
          const date = today.toLocaleDateString()
          // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          self.subscription_expiration_date = date;
          console.log('expiry date for quarterly',self.subscription_expiration_date);
          self.payAmount = 299;
          self.$store.set('dealerRegistration/payAmount', '')
          self.$store.set('dealerRegistration/description', '')
        },
        yearly(){
          var self = this;
          self.displayErrors = "";
          self.description = 'Yearly';
          const today = new Date();
          today.setMonth(today.getMonth() + 12);
          const date = today.toLocaleDateString()
          // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          self.subscription_expiration_date = date;
          console.log('expiry date for yearly',self.subscription_expiration_date);
          self.payAmount = 399;
          self.$store.set('dealerRegistration/payAmount', '')
          self.$store.set('dealerRegistration/description', '')
        },

        submitDataInDatabase(){
        var dealersData = {
          dealer_name: this.$store.get('dealerRegistration/dealer_name'),
          email: this.$store.get('dealerRegistration/email'),
          password: this.$store.get('dealerRegistration/password'),
          confirm_password: this.$store.get('dealerRegistration/confirm_password'),
          phone: this.$store.get('dealerRegistration/phone'),
          address: this.$store.get('dealerRegistration/address'),
          state: this.$store.get('dealerRegistration/state'),
          city: this.$store.get('dealerRegistration/city'),
          zip_code: this.$store.get('dealerRegistration/zip_code'),
          monday_sales_hours: this.$store.get('dealerRegistration/monday_sales_hours'),
          tuesday_sales_hours: this.$store.get('dealerRegistration/tuesday_sales_hours'),
          wednesday_sales_hours: this.$store.get('dealerRegistration/wednesday_sales_hours'),
          thursday_sales_hours: this.$store.get('dealerRegistration/thursday_sales_hours'),
          friday_sales_hours: this.$store.get('dealerRegistration/friday_sales_hours'),
          saturday_sales_hours: this.$store.get('dealerRegistration/saturday_sales_hours'),
          sunday_sales_hours: this.$store.get('dealerRegistration/sunday_sales_hours'),
          monday_service_hours: this.$store.get('dealerRegistration/monday_service_hours'),
          // this.$store.set('dealerRegistration/tuesday_service_hours', ''),
          wednesday_service_hours: this.$store.get('dealerRegistration/wednesday_service_hours'),
          thursday_service_hours: this.$store.get('dealerRegistration/thursday_service_hours'),
          friday_service_hours: this.$store.get('dealerRegistration/friday_service_hours'),
          saturday_service_hours: this.$store.get('dealerRegistration/saturday_service_hours'),
          sunday_service_hours: this.$store.get('dealerRegistration/sunday_service_hours'),
          monday_parts_hours: this.$store.get('dealerRegistration/monday_parts_hours'),
          tuesday_parts_hours: this.$store.get('dealerRegistration/tuesday_parts_hours'),
          wednesday_parts_hours: this.$store.get('dealerRegistration/wednesday_parts_hours'),
          thursday_parts_hours: this.$store.get('dealerRegistration/thursday_parts_hours'),
          friday_parts_hours: this.$store.get('dealerRegistration/friday_parts_hours'),
          saturday_parts_hours: this.$store.get('dealerRegistration/saturday_parts_hours'),
          sunday_parts_hours: this.$store.get('dealerRegistration/sunday_parts_hours'),
          content_translation: this.$store.get('dealerRegistration/content_translation'),
          dealer_id: this.$store.get('dealerRegistration/dealer_id'),
          rooftopId: this.$store.get('dealerRegistration/rooftopId'),
          longitude: this.$store.get('dealerRegistration/longitude'),
          hero_image: this.$store.get('dealerRegistration/hero_image'),
          english_website_url: this.$store.get('dealerRegistration/english_website_url'),
          sales_phone: this.$store.get('dealerRegistration/sales_phone'),
          dealer_type: this.$store.get('dealerRegistration/dealer_type'),
          // imageFile: this.$store.get('dealerRegistration/imageFile'),
          imageFile : this.$store.get('dealerRegistration/imageFile'),
          payAmount: this.payAmount,
          description: this.description,
          verification_status: 0,
          approve_status: 0,
          activate_suspend_status: 1,
          roles: 0,
          subscription_date: this.getNow(),
          subscription_expiration_date: this.subscription_expiration_date,
          }
          console.log('form data---------------------------=========', dealersData)
          axios.post(`${process.env.BACKEND_API}/insertDealerInformation`, {
          data: dealersData
        })
          .then(res => {
            console.log('insert result', res);
            const status = res.status;
            if (status == 200) {
              this.$router.push('gracias');
            }else{
              console.log('error');
            }
          })
          .catch(e => {
            console.error(e);
          })
      },
      getNow() {
            const today = new Date();
            today.setMonth(today.getMonth());
            const date = today.toLocaleDateString()
            // const date = today.getFullYear()+'-'+(monthNames[today.getMonth()])+'-'+today.getDate();
            // const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // const dateTime = date;
            return date;
        }
  }
})
</script> 
<style scoped>
.columns {
    margin-bottom:20px;
    cursor:pointer;
}
.columns:hover .header { background-color:red;border-top-left-radius: 20px;
border-top-right-radius: 20px;}
.columns:hover .button{ background-color:red;}
.columns:hover .grey {font-size:20px; color:#4CAF50; }
.columns:hover .price { color:red;border-top-left-radius: 20px;border-top-right-radius: 20px;}

.price {
    list-style-type: none;
    border: 1px solid #eee;
    margin: 0;
    padding: 0;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    overflow: hidden;
}

.price:hover {
    box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
}

.price .header {
    background-color: #111;
    color: white;
    font-size: 15px;
    transition: all .2s ease-in-out;
}

.price li {
    border-bottom: 1px solid #eee;
    padding:12px;
    text-align: center;

}
.price .grey {
    background-color: #eee;
    font-size: 12px;
    transition: all .2s ease-in-out;
}

.v-application .grey {
    background-color: #fbf8f8 !important;
    border-color: #9e9e9e !important;
}
@media only screen and (max-width: 600px) {
    .columns {
        width: 100%;
    }
}
</style>