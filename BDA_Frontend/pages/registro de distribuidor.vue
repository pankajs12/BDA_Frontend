<template>
  <v-layout>
    <LoadingIndicator v-if="showLoader" />
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="9">
        <h3 class="registertitle">Registro De Distribuidor</h3>
           <v-card>
                <div>
                  <v-card-text>
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <v-form ref="inquiryForm"
                              @submit.prevent="handleSubmit(submit)"
                              enctype="multipart/form-data"
                              autocomplete="on">
                        <v-row align="start">
                          <v-col cols="4" class="pt-0">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-account"
                                            label="Dealer Name"
                                            placeholder="Dealer Name"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="dealer_name">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4" class="pt-0">
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
                          <v-col cols="4" class="pt-0">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-phone"
                                            label="Phone"
                                            placeholder="(987) 444-3333"
                                            outlined v-mask="'(###) ###-####'"
                                            :error-messages="errors[0]" required
                                            v-model="phone">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field 
                                            label="Address"
                                            placeholder="Address"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="address">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                        <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon=""
                                            label="City"
                                            placeholder="City"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="city">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-state"
                                            label="State"
                                            placeholder="State"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="state">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                        <v-col cols="4">
                            <ValidationProvider rules="required|min:4"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-zip"
                                            label="Zip Code"
                                            placeholder="Zip Code"
                                            outlined v-mask="'######'"
                                            :error-messages="errors[0]"
                                            :maxlength="max"
                                            required
                                            v-model="zip_code">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Monday Sales Hours"
                                            placeholder="Monday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="monday_sales_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Tuesday Sales Hours"
                                            placeholder="Tuesday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="tuesday_sales_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Wednesday Sales Hours"
                                            placeholder="Wednesday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="wednesday_sales_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Thursday Sales Hours"
                                            placeholder="Thursday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="thursday_sales_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Friday Sales Hours"
                                            placeholder="Friday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="friday_sales_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Saturday Sales Hours"
                                            placeholder="Saturday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="saturday_sales_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-sales-hours"
                                            label="Sunday Sales Hours"
                                            placeholder="Sunday Sales Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="sunday_sales_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Monday Service Hours"
                                            placeholder="Monday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="monday_service_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <!-- <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Tuesday Service Hours"
                                            placeholder="Tuesday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="tuesday_service_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col> -->
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Wednesday Service Hours"
                                            placeholder="Wednesday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="wednesday_service_hours  ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Thursday Service Hours"
                                            placeholder="Thursday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="thursday_service_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Friday Service Hours"
                                            placeholder="Friday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="friday_service_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Saturday Service Hours"
                                            placeholder="Saturday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="saturday_service_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-service-hours"
                                            label="Sunday Service Hours"
                                            placeholder="Sunday Service Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="sunday_service_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Monday Parts Hours"
                                            placeholder="Monday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="monday_parts_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Tuesday Parts Hours"
                                            placeholder="Tuesday Parts  Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="tuesday_parts_hours ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Wednesday Parts Hours"
                                            placeholder="Wednesday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="wednesday_parts_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Thursday Parts Hours"
                                            placeholder="Thursday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="thursday_parts_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Friday Parts Hours"
                                            placeholder="Friday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="friday_parts_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Saturday Parts Hours"
                                            placeholder="Saturday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="saturday_parts_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-parts-hours"
                                            label="Sunday Parts Hours"
                                            placeholder="Sunday Parts Hours"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="sunday_parts_hours">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-phone"
                                            label="Sales Phone"
                                            placeholder="(555) 444-3333"
                                            outlined v-mask="'(###) ###-####'"
                                            :error-messages="errors[0]" required
                                            v-model="sales_phone">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                           <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-inventory"
                                            label="Dealer Type"
                                            placeholder="Dealer Type"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="dealer_type">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-inventory"
                                            label="Content Translation"
                                            placeholder="Content Translation"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="content_translation ">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-inventory"
                                            label="Dealer Id"
                                            placeholder="Dealer Id"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="dealer_id">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-inventory"
                                            label="Rooftop Id"
                                            placeholder="Rooftop Id"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="rooftopId">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-website"
                                            label="Latitude"
                                            placeholder="Latitude"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="latitude">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-website"
                                            label="Longitude"
                                            placeholder="Longitude"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="longitude">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-website"
                                            label="Google Places Id"
                                            placeholder="Google Places Id"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="google_places_id">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-about-us"
                                            label="About Us"
                                            placeholder="About Us"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="about_us_text">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="4">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-website"
                                            label="Website Url"
                                            placeholder="Website Url"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="english_website_url">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                           <v-col cols="6" class="pt-0">
                            <ValidationProvider v-slot="{ errors }" disabled>
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
                          <v-col cols="6" class="pt-0">
                            <ValidationProvider v-slot="{ errors }" disabled>
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
                          
                          <v-col cols="6">
                                                <v-text-field label="Select Image" @click='pickFile' v-model='hero_image' ></v-text-field>
                                                <input
                                                  type="file"
                                                  ref="image"
                                                  name="imageFile"
                                                  style="display: none"
                                                  accept="image/*"
                                                  @change="onFilePicked"
                                                >
                          </v-col>
                          <v-col cols="6">
                            <img :src="imageUrl" height="80" v-if="imageUrl"/>
                          </v-col>
                          <v-col cols="12">
                            <v-btn :disabled="disabled" :loading="submitting"
                                   @click="emailValidation()" x-large
                                   block color="#019cf7" dark>
                                   Continue
                              <v-icon>mdi-chevron-right-circle-outline</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </ValidationObserver>
                  </v-card-text>
                </div>
              </v-card>
              <v-row align="center" justify="center" class="pb-10">
                <v-btn @click="clearForm()" text>Clear Form</v-btn>
              </v-row>
      </v-col>
    </v-row>
 <preview-modal/>
  </v-container>
  </v-layout>
</template>

<script>
  import { ValidationProvider, ValidationObserver, extend  } from 'vee-validate';
  import {sync, set, get } from 'vuex-pathify';
  import PreviewModal from '@/components/Preview_Modal.vue';
 import LoadingIndicator from '@/components/LoadingIndicator.vue';
 import axios from 'axios';
 extend('min', zip_code => {
  return zip_code.length >=4;
});
  export default {
    name: 'dealerSignup',
    components: {
      ValidationProvider,
      ValidationObserver,
      PreviewModal,
      LoadingIndicator
    },
    data() {
      return {
        // hero_image: '',
        imageUrl: '',
        // imageFile: '',
        isEditing: false,
        valid: true,
        submitting: false,
        showLoader: true,
        value: true,
        max: 6,
        min:  1,
        passwordRules: [
        password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password) || 'Password should be of min. 8 characters with at least one capital letter, a number and a special character',
        confirm_password => confirm_password === this.password || 'Passwords must match'
        ],
        
      }
    },    
    computed: {
      disabled() {
        if (this.dealer_name && this.email && this.phone && this.address && this.city && this.state && this.zip_code.length>=4 && this.password && this.confirm_password == this.password &&  this.monday_sales_hours && 
        this.tuesday_sales_hours && this.wednesday_sales_hours && this.thursday_sales_hours && this.friday_sales_hours && this.saturday_sales_hours && this.sunday_sales_hours && this.monday_service_hours && this.wednesday_service_hours && this.thursday_service_hours && this.friday_service_hours && this.saturday_service_hours && this.sunday_service_hours && this.monday_parts_hours && this.tuesday_parts_hours && this.wednesday_parts_hours 
        && this.thursday_parts_hours && this.friday_parts_hours && this.saturday_parts_hours && this.sunday_parts_hours && this.sales_phone &&  this.dealer_type && this.content_translation && this.dealer_id && this.rooftopId && this.latitude && this.google_places_id && this.about_us_text && this.english_website_url && this.longitude) {
          return false;
        }
        return true;
      },
      //       disabled() {
      //   if (this.dealer_name && this.contact_name && this.email && this.phone && this.address && this.city && this.state 
      //   && this.zip_code.length>=4 && this.inventory_provider && this.password && this.confirm_password == this.password) {
      //     return false;
      //   }
      //   return true;
      // },
      dealer_name: sync('dealerRegistration/dealer_name'),
      phone: sync('dealerRegistration/phone'), 
      email: sync('dealerRegistration/email'),
      password: sync('dealerRegistration/password'),
      confirm_password: sync('dealerRegistration/confirm_password'),
      address: sync('dealerRegistration/address'),
      city: sync('dealerRegistration/city'), 
      state: sync('dealerRegistration/state'), 
      zip_code: sync('dealerRegistration/zip_code'), 
      monday_sales_hours: sync('dealerRegistration/monday_sales_hours'), 
      tuesday_sales_hours : sync('dealerRegistration/tuesday_sales_hours'),
      wednesday_sales_hours : sync('dealerRegistration/wednesday_sales_hours'),
      thursday_sales_hours : sync('dealerRegistration/thursday_sales_hours'),
      friday_sales_hours : sync('dealerRegistration/friday_sales_hours'),
      saturday_sales_hours : sync('dealerRegistration/saturday_sales_hours'),
      sunday_sales_hours : sync('dealerRegistration/sunday_sales_hours'),
      monday_service_hours : sync('dealerRegistration/monday_service_hours'),
      // tuesday_service_hours : sync('dealerRegistration/tuesday_service_hours'),
      wednesday_service_hours : sync('dealerRegistration/wednesday_service_hours'),
      thursday_service_hours : sync('dealerRegistration/thursday_service_hours'),
      friday_service_hours : sync('dealerRegistration/friday_service_hours'),
      saturday_service_hours : sync('dealerRegistration/saturday_service_hours'),
      sunday_service_hours : sync('dealerRegistration/sunday_service_hours'),
      monday_parts_hours : sync('dealerRegistration/monday_parts_hours'),
      tuesday_parts_hours : sync('dealerRegistration/tuesday_parts_hours'),
      wednesday_parts_hours : sync('dealerRegistration/wednesday_parts_hours'),
      thursday_parts_hours : sync('dealerRegistration/thursday_parts_hours'),
      friday_parts_hours : sync('dealerRegistration/friday_parts_hours'),
      saturday_parts_hours : sync('dealerRegistration/saturday_parts_hours'),
      sunday_parts_hours : sync('dealerRegistration/sunday_parts_hours'),
      sales_phone : sync('dealerRegistration/sales_phone'),
      dealer_type : sync('dealerRegistration/dealer_type'),
      content_translation : sync('dealerRegistration/content_translation'),
      dealer_id : sync('dealerRegistration/dealer_id'),
      rooftopId : sync('dealerRegistration/rooftopId'),
      english_website_url : sync('dealerRegistration/english_website_url'),
      longitude : sync('dealerRegistration/longitude'),
      google_places_id: sync('dealerRegistration/google_places_id'),
      latitude : sync('dealerRegistration/latitude'),
      about_us_text : sync('dealerRegistration/about_us_text'),
      hero_image : sync('dealerRegistration/hero_image'),
      imageFile: sync('dealerRegistration/imageFile'),
    }, 
    mounted() {
    setTimeout(() => {
     this.showLoader = false;
    }, 500);
    // this.$store.set('dealerRegistration/dealer_name', '')
    // this.$store.set('dealerRegistration/email', '')
    // this.$store.set('dealerRegistration/password', '')
    // this.$store.set('dealerRegistration/confirm_password', '')
    // this.$store.set('dealerRegistration/phone', '')
    // this.$store.set('dealerRegistration/address', '')
    // this.$store.set('dealerRegistration/state', '')
    // this.$store.set('dealerRegistration/city', '')
    // this.$store.set('dealerRegistration/monday_sales_hours', '')
    // this.$store.set('dealerRegistration/tuesday_sales_hours', '')
    // this.$store.set('dealerRegistration/wednesday_sales_hours', '')
    // this.$store.set('dealerRegistration/thursday_sales_hours', '')
    // this.$store.set('dealerRegistration/friday_sales_hours', '')
    // this.$store.set('dealerRegistration/saturday_sales_hours', '')
    // this.$store.set('dealerRegistration/sunday_sales_hours', '')
    // this.$store.set('dealerRegistration/monday_service_hours', '')
    // // this.$store.set('dealerRegistration/tuesday_service_hours', '')
    // this.$store.set('dealerRegistration/wednesday_service_hours', '')
    // this.$store.set('dealerRegistration/thursday_service_hours', '')
    // this.$store.set('dealerRegistration/friday_service_hours', '')
    // this.$store.set('dealerRegistration/saturday_service_hours', '')
    // this.$store.set('dealerRegistration/sunday_service_hours', '')
    // this.$store.set('dealerRegistration/monday_parts_hours', '')
    // this.$store.set('dealerRegistration/tuesday_parts_hours', '')
    // this.$store.set('dealerRegistration/wednesday_parts_hours', '')
    // this.$store.set('dealerRegistration/thursday_parts_hours', '')
    // this.$store.set('dealerRegistration/friday_parts_hours', '')
    // this.$store.set('dealerRegistration/saturday_parts_hours', '')
    // this.$store.set('dealerRegistration/sunday_parts_hours', '')
    // this.$store.set('dealerRegistration/content_translation', '')
    // this.$store.set('dealerRegistration/dealer_id', '')
    // this.$store.set('dealerRegistration/rooftopId', '')
    // this.$store.set('dealerRegistration/longitude', '')
    // this.$store.set('dealerRegistration/google_places_id', "")
    // this.$store.set('dealerRegistration/latitude', '')
    // this.$store.set('dealerRegistration/about_us_text', '')
    // this.$store.set('dealerRegistration/hero_image', '')
    // this.$store.set('dealerRegistration/english_website_url', '')
    // this.$store.set('dealerRegistration/sales_phone', '')
    // this.$store.set('dealerRegistration/dealer_type', '')
  var isUserLogin = localStorage.hasOwnProperty('user');
      console.log('dealernames',isUserLogin);
      if(isUserLogin == true){
        window.location.href = './admin';
      }

  },   
    methods: {  
       pickFile() {
        this.$refs.image.click()
      },
      onFilePicked(e) {
      const files = e.target.files
      if (files[0] !== undefined) {
        this.hero_image = files[0].name
        console.log('image name',this.hero_image);
        if (this.hero_image.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          files[0].baseEncImage = fr.result;
          this.imageFile = files[0] // this is an image file that can be sent to server...
          console.log('image file',this.imageFile);
        })
      } else {
        this.hero_image = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },

      emailValidation(){
        console.log('email',this.email);
        axios.post(`${process.env.BACKEND_API}/emailValidation`, {
          data: this.email
        })
        .then(res => {
            console.log('result', res);
            if(res.data == 'success'){
              this.$modal.show('example-adaptive');
            }else{
              alert(res.data);
            }
          })
          .catch(e => {
            console.error(e);
          })
      },
      closeWindow() {
        this.$emit('close-window', true)
      },
      submit() {
        this.submitting = true
      },
      showPreview(){
        this.$modal.show('example-adaptive');
      },
      clearForm() {
    this.$store.set('dealerRegistration/dealer_name', '')
    this.$store.set('dealerRegistration/email', '')
    this.$store.set('dealerRegistration/password', '')
    this.$store.set('dealerRegistration/confirm_password', '')
    this.$store.set('dealerRegistration/phone', '')
    this.$store.set('dealerRegistration/address', '')
    this.$store.set('dealerRegistration/state', '')
    this.$store.set('dealerRegistration/city', '')
    this.$store.set('dealerRegistration/monday_sales_hours', '')
    this.$store.set('dealerRegistration/tuesday_sales_hours', '')
    this.$store.set('dealerRegistration/wednesday_sales_hours', '')
    this.$store.set('dealerRegistration/thursday_sales_hours', '')
    this.$store.set('dealerRegistration/friday_sales_hours', '')
    this.$store.set('dealerRegistration/saturday_sales_hours', '')
    this.$store.set('dealerRegistration/sunday_sales_hours', '')
    this.$store.set('dealerRegistration/monday_service_hours', '')
    // this.$store.set('dealerRegistration/tuesday_service_hours', '')
    this.$store.set('dealerRegistration/wednesday_service_hours', '')
    this.$store.set('dealerRegistration/thursday_service_hours', '')
    this.$store.set('dealerRegistration/friday_service_hours', '')
    this.$store.set('dealerRegistration/saturday_service_hours', '')
    this.$store.set('dealerRegistration/sunday_service_hours', '')
    this.$store.set('dealerRegistration/monday_parts_hours', '')
    this.$store.set('dealerRegistration/tuesday_parts_hours', '')
    this.$store.set('dealerRegistration/wednesday_parts_hours', '')
    this.$store.set('dealerRegistration/thursday_parts_hours', '')
    this.$store.set('dealerRegistration/friday_parts_hours', '')
    this.$store.set('dealerRegistration/saturday_parts_hours', '')
    this.$store.set('dealerRegistration/sunday_parts_hours', '')
    this.$store.set('dealerRegistration/content_translation', '')
    this.$store.set('dealerRegistration/dealer_id', '')
    this.$store.set('dealerRegistration/rooftopId', '')
    this.$store.set('dealerRegistration/longitude', '')
    this.$store.set('dealerRegistration/google_places_id', "")
    this.$store.set('dealerRegistration/latitude', '')
    this.$store.set('dealerRegistration/about_us_text', '')
    this.$store.set('dealerRegistration/hero_image', '')
    this.$store.set('dealerRegistration/imageFile','')
    this.$store.set('dealerRegistration/english_website_url', '')
    this.$store.set('dealerRegistration/sales_phone', '')
    this.$store.set('dealerRegistration/dealer_type', '')
      }
    },
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
