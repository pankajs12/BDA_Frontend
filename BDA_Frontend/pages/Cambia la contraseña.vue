<template>
    <v-layout>
        <LoadingIndicator v-if="showLoader" />
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
        <v-col cols="12" sm="6" md="4">
            <h3 style="text-align:center">Change Password</h3>
            <v-card>
                    <div>
                    <v-card-text>
                        <ValidationObserver v-slot="{ handleSubmit }">
                        <v-form
                                @submit.prevent="handleSubmit(submit)"
                                autocomplete="on">
                            <v-row align="start">
                            <v-col cols="12" class="pt-0">
                                <ValidationProvider v-slot="{ errors }" rules="required" disabled>
                                <v-text-field
                                                label="Password"
                                                placeholder="Password"
                                                outlined required
                                                :error-messages="errors[0]"
                                                autocomplete="current-password"
                                                :value="password"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'"
                                                :rules="passwordRules"
                                                @input="_=>password=_"
                                                v-model="password">
                                </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12" class="pt-0">
                                <ValidationProvider v-slot="{ errors }" rules="required" disabled>
                                <v-text-field
                                                label="Confirm Password"
                                                placeholder="Confirm Password"
                                                outlined required
                                                :error-messages="errors[0]"
                                                autocomplete="current-password"
                                                :value="confirm_password"
                                                @click:append="() => (value = !value)"
                                                :type="value ? 'password' : 'text'"
                                                :rules="passwordRules"
                                                @input="_=>confirm_password=_"
                                                v-model="confirm_password">
                                </v-text-field>
                                </ValidationProvider>
                            </v-col>
                            <v-col cols="12">
                                <v-btn :disabled="disabled"  :loading="submitting"
                                    @click="changePassword()" x-large
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
import {sync, set, get } from 'vuex-pathify';
  export default {
    name: 'changePassword',
    components: {
      ValidationProvider,
      ValidationObserver,
      LoadingIndicator
    },
    data() {
        return {
            showLoader: true,
            submitting: false,
            value: true,
            valid: true,
            user_id:"",
            password:"",
            confirm_password:"",
            passwordRules: [
            password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password) || 'La contraseña debe ser de mín. 8 caracteres con al menos una letra mayúscula, un número y un carácter especial',
            confirm_password => confirm_password === this.password || 'Las contraseñas deben coincidir'
            ],
        }
    },
    mounted() {
    setTimeout(() => {
     this.showLoader = false;
    }, 500);
this.user_id = this.$route.query.id;
console.log('url idssssssss',this.user_id);
    },
    computed: {
        disabled() {
        if (this.password && this.confirm_password === this.password && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(this.password)) {
          return false;
        }
        return true;
      },
    },
    methods: {
        changePassword() {
           console.log('method called');
            axios.post(`${process.env.BACKEND_API}/change`, {
            user_id: this.user_id,
            password: this.password,
            confirm_password: this.confirm_password
            })
            .then(res => {
                console.log('result', res.data.value);
                const status = res.status;
                if (status == 200) {
                    this.$toast.success('Password Successfully Changed');
                    setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                    // window.location.href = '/Inicio de sesión del distribuidor';
                }
            })
            .catch(e => {
                console.error(e);
                this.$toast.error("Invalid Password");
                setTimeout( () => window.location.href = 'Inicio de sesión del distribuidor', 5000);
                // window.location.href = '/Inicio de sesión del distribuidor';
            })            
        },
         submit() {
        this.submitting = true
      },

    },
    watch: {
        password(){
            console.log(this.password);
        },
        confirm_password(){
            console.log(this.password == this.confirm_password);
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

