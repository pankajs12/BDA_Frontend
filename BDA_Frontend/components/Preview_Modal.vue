<template>
<div>
    <modal 
      name="example-adaptive"
      transition="nice-modal-fade"
      :min-width="1300"
      :min-height="630"
      :delay="100"
      :clickToClose="false"
      :adaptive="true">
    <div class="example-modal-content">
      <h4 style="text-align:center; margin-top: 10px;">Preview</h4>
          <div class="row">
                <div class="col-md-3 col-example" style="font-style: italic;">Company Name :  {{this.$store.get('dealerRegistration/dealer_name')}} </div>
                <div class="col-md-3 col-example" style="font-style: italic;">Phone :  {{this.$store.get('dealerRegistration/phone')}}</div>
                <div class="col-md-2 col-example" style="font-style: italic;">Email :  {{this.$store.get('dealerRegistration/email')}} </div>
                <div class="col-md-2 col-example" style="font-style: italic;">Address :  {{this.$store.get('dealerRegistration/address')}} </div>
                <div class="col-md-2 col-example" style="font-style: italic;">City :  {{this.$store.get('dealerRegistration/city')}}</div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">State :  {{this.$store.get('dealerRegistration/state')}} </div>
            <div class="col-md-3 col-example" style="font-style: italic;">Zip Code :  {{this.$store.get('dealerRegistration/zip_code')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">Monday_sales_hours :  {{this.$store.get('dealerRegistration/monday_sales_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">tuesday_sales_hours :  {{this.$store.get('dealerRegistration/tuesday_sales_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">wednesday_sales_hours :  {{this.$store.get('dealerRegistration/wednesday_sales_hours')}}</div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">thursday_sales_hours :  {{this.$store.get('dealerRegistration/thursday_sales_hours')}}</div>
            <div class="col-md-3 col-example" style="font-style: italic;">friday_sales_hours :  {{this.$store.get('dealerRegistration/friday_sales_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">saturday_sales_hours :  {{this.$store.get('dealerRegistration/saturday_sales_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">sunday_sales_hours :  {{this.$store.get('dealerRegistration/sunday_sales_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">monday_service_hours :  {{this.$store.get('dealerRegistration/monday_service_hours')}}</div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">wednesday_service_hours :  {{this.$store.get('dealerRegistration/wednesday_service_hours')}}</div>
            <div class="col-md-3 col-example" style="font-style: italic;">thursday_service_hours :  {{this.$store.get('dealerRegistration/thursday_service_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">friday_service_hours :  {{this.$store.get('dealerRegistration/friday_service_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">saturday_service_hours :  {{this.$store.get('dealerRegistration/saturday_service_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">sunday_service_hours :  {{this.$store.get('dealerRegistration/sunday_service_hours')}} </div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">monday_parts_hours :  {{this.$store.get('dealerRegistration/monday_parts_hours')}} </div>
            <div class="col-md-3 col-example" style="font-style: italic;">tuesday_parts_hours :  {{this.$store.get('dealerRegistration/tuesday_parts_hours')}} </div>
            <div class="col-md-2 col-example" style="font-style: italic;">wednesday_parts_hours :  {{this.$store.get('dealerRegistration/wednesday_parts_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">thursday_parts_hours :  {{this.$store.get('dealerRegistration/thursday_parts_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">friday_parts_hours :  {{this.$store.get('dealerRegistration/friday_parts_hours')}}</div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">saturday_parts_hours :  {{this.$store.get('dealerRegistration/saturday_parts_hours')}}</div>
            <div class="col-md-3 col-example" style="font-style: italic;">sunday_parts_hours :  {{this.$store.get('dealerRegistration/sunday_parts_hours')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">sales_phone :  {{this.$store.get('dealerRegistration/sales_phone')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">dealer_type :  {{this.$store.get('dealerRegistration/dealer_type')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">content_translation :  {{this.$store.get('dealerRegistration/content_translation')}}</div>
          </div>
          <br>
          <div class="row">
            <div class="col-md-3 col-example" style="font-style: italic;">dealer_id :  {{this.$store.get('dealerRegistration/dealer_id')}}</div>
            <div class="col-md-3 col-example" style="font-style: italic;">rooftopId :  {{this.$store.get('dealerRegistration/rooftopId')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">english_website_url :  {{this.$store.get('dealerRegistration/english_website_url')}}</div>
            <div class="col-md-2 col-example" style="font-style: italic;">longitude :  {{this.$store.get('dealerRegistration/longitude')}}</div>
            <div class="col-md-2 col-example"><img :src="imageUrl" height="60" /></div>
            
          </div>
    </div>
    <v-btn color="primary" style="margin-left:500px; margin-right: 10px;" @click="$modal.hide('example-adaptive')">Back</v-btn>
    <v-btn color="primary" @click="showPayment()">Proceed For Payment</v-btn>
  </modal>
  <PaymentModal/>
  </div>
</template>
<script>
import axios from 'axios'
import PaymentModal from '@/components/Payment_Modal.vue'
export default {
  name: 'Preview_Modal',
  components: {
    PaymentModal
  },
  data(){
    return{
      imageUrl : this.$store.get('dealerRegistration/imageFile.baseEncImage'),
    }
  },
  methods:{
    showPayment(){
      this.$modal.hide('example-adaptive');
      this.$modal.show('payment_modal');
    },
    
  }
}
</script>
<style scoped>
.example-modal-content{
  padding-left: 25px;
}

</style>