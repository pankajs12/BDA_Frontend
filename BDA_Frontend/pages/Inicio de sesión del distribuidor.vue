<template>
<v-layout>
    <LoadingIndicator v-if="showLoader" />
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4" md="4">
        <h3 style="text-align:center; margin-bottom:15px;">Dealer Login</h3>
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
                            <v-col cols="12" class="pt-0">
                                <ValidationProvider rules="required" v-slot="{ errors }" disabled>
                                <v-text-field
                                                label="Password"
                                                placeholder="Password"
                                                outlined required
                                                :error-messages="errors[0]"
                                                autocomplete="current-password"
                                                :value="password"
                                                @click:append="() => (value = !value)"
                                                type="password"
                                                @input="_=>password=_"
                                                v-model="password">
                                </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            
                            <v-col cols="12">
                                <v-btn :disabled="disabled" :loading="submitting"
                                    @click="loginDealer()" x-large
                                    block color="#019cf7" dark>
                                    Login
                                </v-btn>
                            </v-col>
                            <v-col cols="6" class="pt-0 register-class">
                            <v-btn exact text to="/registro de distribuidor" nuxt><h4>Register</h4></v-btn>
                            </v-col>
                            <v-col cols="6" class="pt-0 register-class">
                            <v-btn exact text to="/Se te olvidó tu contraseña" nuxt><h4>Forgot Password?</h4></v-btn>
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
      components: {
        ValidationProvider,
        ValidationObserver,
      LoadingIndicator
    },
    data() {
        return {
            submitting: false,
             email: '',
            password: '',
            showLoader: true,
        }
    },
    mounted() {
    setTimeout(() => {
     this.showLoader = false;
    }, 500);

    var isUserLogin = localStorage.hasOwnProperty('user');
      if(isUserLogin == true){
        window.location.href='/admin'
      }

    },
    computed: {
        disabled() {
        if (this.email && this.password) {
          return false;
        }
        return true;
      }
    },
    methods: {
        /**
             * Login Dealer using login API
             */
        loginDealer() {
            // this.showLoader = true;
            axios.post(`${process.env.BACKEND_API}/login`, {
            email: this.email,
            password: this.password
            })
            .then(res => {
                console.log('result', res);
                const status = res.status;
                if (status == 200) {
                console.log('password matched');
                localStorage.setItem('user',JSON.stringify(res.data));
                this.$toast.success('Successfully authenticated');
                // this.showLoader = false;
                setTimeout( () => window.location.href = '/admin', 5000);
                }else{
                  this.$toast.error('invalid password');
                }
            })
            .catch(e => {
                console.error(e);
                const errorCode = parseInt(e.response.status);
                console.log('errors++++++++++++++++',errorCode);
                if(errorCode === 404){
                    this.$toast.error('Please Enter Correct Email') ;
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
                else if(errorCode === 400){
                    this.$toast.error('Please Enter Correct Password');
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
                else if(errorCode === 405){
                    this.$toast.error('Your account has not been approved please contact to admin');
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
                else  if(errorCode === 403){
                    this.$toast.error('You email verification has not been completed');
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
                else{
                    this.$toast.error('Your account has been suspended') ;
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                }
                console.log('errors login', parseInt(e.response.status));
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

<style>
/* .v-content{
    background: url('https://res.cloudinary.com/buscador-de-auto/image/upload/v1563922564/brand-assets/home-banner.jpg');
    
} */
.register-class{
    font-weight: lighter;
    color: lightseagreen;
    font-variant: small-caps;
    font-size: small;
}
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
