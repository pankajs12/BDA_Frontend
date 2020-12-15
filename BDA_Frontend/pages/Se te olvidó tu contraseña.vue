<template>
    <v-layout>
        <LoadingIndicator v-if="showLoader" />
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
            <h3 style="text-align:center">Forgot Password</h3>
            <v-card>
                    <div>
                    <v-card-text>
                        <ValidationObserver v-slot="{ handleSubmit }">
                        <v-form
                                @submit.prevent="handleSubmit(submit)"
                                autocomplete="on">
                            <v-row align="start">
                            <v-col cols="12" class="pt-0">
                                <ValidationProvider rules="required|email"
                                                    v-slot="{ errors }" disabled>
                                <v-text-field prepend-inner-icon="mdi-email"
                                                label="Dealer Email Address"
                                                placeholder="me@mydealership.com"
                                                outlined required
                                                :error-messages="errors[0]"
                                                v-model="email">
                                </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-btn :disabled="disabled" :loading="submitting"
                                    @click="forgotPassword()" x-large
                                    block color="#019cf7" dark>
                                    Submit
                                    <v-icon>mdi-chevron-right-circle-outline</v-icon>
                                </v-btn>
                            </v-col>
                            </v-row>
                        </v-form>
                        </ValidationObserver>
                    </v-card-text>
                    </div>
                </v-card>
        </v-col>
        </v-row>
    </v-container>
    </v-layout>
</template>

<script>
import axios from 'axios'
import { ValidationProvider, ValidationObserver} from 'vee-validate';
import LoadingIndicator from '@/components/LoadingIndicator.vue';
  export default {
    name: 'forgotPassword',
    components: {
      ValidationProvider,
      ValidationObserver,
      LoadingIndicator
    },
    data() {
        return {
            showLoader: true,
            submitting: false,
             email: '',
        }
    },
    mounted() {
    setTimeout(() => {
     this.showLoader = false;
    }, 1000);
    var isUserLogin = localStorage.hasOwnProperty('user');
      console.log('dealernames',isUserLogin);
      if(isUserLogin == true){
        window.location.href = './admin';
      }
    },
    computed: {
        disabled() {
        if (this.email) {
          return false;
        }
        return true;
      }
    },
    methods: {
        forgotPassword() {
          this.showLoader = true;
            axios.post(`${process.env.BACKEND_API}/forgot`, {
            email: this.email,
            })
            .then(res => {
                console.log('result', res);
                const status = res.status;
                if (status == 200) {
                    this.$toast.success('Password change link has been send to your email id');
                    this.showLoader = false;
                    setTimeout( () => window.location.href = '/', 5000);
                    // window.location.href = '/';
                }                
            })
            .catch(e => {
                console.error(e);
                this.$toast.error("Invalid Emailid");
                this.showLoader = false;
                // window.location.href = '/Se te olvidó tu contraseña';
                setTimeout( () => window.location.href = 'Se te olvidó tu contraseña', 5000);
            })            
        },
         submit() {
        this.submitting = true
      },

    },
    watch: {
        email(){
            console.log(this.email);
        },
        password(){
            console.log(this.password);
        }
    }
 
  }
</script>

<style lang="scss" scoped>
.registertitle{
   text-align: center;
    padding: 10px;
    border: 1px solid;
    border-color: #d6d6d8;
}
  .v-stepper.theme--light {
    box-shadow: none;
    border: 0px;
  }

  .v-stepper__header {
    box-shadow: none;
  }

  .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color:#019cf7 !important;
  }

</style>

