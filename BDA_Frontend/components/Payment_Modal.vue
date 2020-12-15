 <template>
<div>
 <modal 
      name="payment_modal"
      transition="nice-modal-fade"
      :min-width="500"
      :min-height="415"
      :delay="100"
      :clickToClose="false"
      :adaptive="true">
  <v-btn style="float:right; margin-right:20px; margin-top:10px;" @click="hide">Close</v-btn>
    <v-container style="margin-top:25px;">
    <v-col cols="12" sm="12" md="12"><Stripe/></v-col>
    </v-container>
  </modal>
  </div>
</template>

<script>
import Stripe from '@/components/Stripe.vue';
export default {
    name: 'Payment_Modal',
    components:{
        Stripe
    },
    data(){
        return {    
                 
        }   
    }, 
    methods: {
      hide(){
        this.$modal.hide('payment_modal');
      }
    }
}
</script>