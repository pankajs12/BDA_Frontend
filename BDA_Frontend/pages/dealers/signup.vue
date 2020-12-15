<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="9">
        <v-stepper v-model="e1">
          <v-stepper-header class="mt-10">
            <v-stepper-step :complete="e1 > 1" step="1">Register
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 2" step="2">Confirm your dealership
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">Lets go!</v-stepper-step>
          </v-stepper-header>
          <v-stepper-items>

            <v-stepper-content step="1">
              <v-card>
                <div>

                  <v-card-text>
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <v-form ref="inquiryForm"
                              @submit.prevent="handleSubmit(submit)"
                              autocomplete="on">
                        <v-row align="start">
                          <v-col cols="12">
                            <DealerAutocompleteSearch />
                          </v-col>
                          <!-- <v-col cols="12">
                            <v-text-field outlined v-model="dealership_name"
                                          prepend-inner-icon="mdi-domain"
                                          placeholder="dealership name"
                                          label="dealership name">
                            </v-text-field>
                          </v-col> -->
                          <v-col cols="12">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }">
                              <v-text-field prepend-inner-icon="mdi-account"
                                            label="First and Last name"
                                            placeholder="First and Last Name"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="first_and_last_name">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" class="pt-0">
                            <ValidationProvider rules="required|email"
                                                v-slot="{ errors }" disabled>
                              <v-text-field prepend-inner-icon="mdi-email"
                                            label="Contact email address"
                                            placeholder="me@mydealership.com"
                                            outlined required
                                            :error-messages="errors[0]"
                                            v-model="contact_email">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>
                          <v-col cols="12" class="pt-0">
                            <ValidationProvider rules="required"
                                                v-slot="{ errors }">
                              <v-text-field prepend-inner-icon="mdi-phone"
                                            label="Contact phone number"
                                            placeholder="(555) 444-3333"
                                            outlined v-mask="'(###) ###-####'"
                                            :error-messages="errors[0]" required
                                            v-model="contact_phone">
                              </v-text-field>
                            </ValidationProvider>
                          </v-col>

                          <v-col cols="12">
                            <v-btn :disabled="disabled" :loading="submitting"
                                   @click="verifyDealer()" type="submit" x-large
                                   block color="rgb(236, 5, 5)" dark>
                              Proceed to Store Setup
                              <v-icon>mdi-chevron-right-circle-outline</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-form>
                    </ValidationObserver>
                  </v-card-text>
                </div>
              </v-card>

            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card flat>
                <v-card-text v-if="dealer_logo">
                  <v-img max-width="200" v-if="dealer_logo" :src="dealer_logo">
                  </v-img>
                </v-card-text>
                <v-card-text v-if="dealer_data">
                  <v-text-field prepend-inner-icon="mdi-domain" outlined
                                autofocus label="Dealer Name"
                                placeholder="Dealership Name"
                                v-model="dealer_data.name"></v-text-field>
                  <v-text-field prepend-inner-icon="mdi-map-check" outlined
                                label="Dealer Address"
                                placeholder="Dealer Address"
                                v-model="dealer_data.formatted_address">
                  </v-text-field>
                  <v-text-field prepend-inner-icon="mdi-phone" outlined
                                label="Dealer Phone Number"
                                placeholder="Dealer Phone Number"
                                v-model="dealer_data.formatted_phone_number">
                  </v-text-field>
                  <v-text-field prepend-inner-icon="mdi-web" outlined
                                label="Website URL" placeholder="Website URL"
                                v-model="dealer_data.website">
                  </v-text-field>
                </v-card-text>
              </v-card>
              <v-col cols="12">
                <v-btn :loading="submitting" @click.prevent="generateDealer()"
                       type="submit" x-large block color="rgb(236, 5, 5)" dark>
                  Go to My Dashboard
                  <v-icon>mdi-chevron-right-circle-outline</v-icon>
                </v-btn>
              </v-col>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card color="grey lighten-1" height="200px">
              </v-card>

              <v-btn color="primary" @click="e1 = 1">
                Continue
              </v-btn>

              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper-items>
          <v-row align="center" justify="center" class="pb-10">
            <v-btn @click="clearForm()" text>cancel</v-btn>
          </v-row>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    ValidationProvider,
    ValidationObserver
  } from 'vee-validate'
  import {
    sync,
    set,
    get
  } from 'vuex-pathify'

  export default {
    name: 'DealerSignup',
    components: {
      ValidationProvider,
      ValidationObserver,
      DealerAutocompleteSearch: () => import(
        '@/components/dealer-info/DealerAutocompleteSearch.vue')
    },
    data() {
      return {
        e1: 1,
        valid: true,
        submitting: false,
        isMediumBreakpoint: false,
        dealerInfo: undefined
      }
    },
    computed: {
      disabled() {
        if (this.dealership_name && this.first_and_last_name && this
          .contact_email && this.contact_phone) {
          return false;
        }
        return true;
      },
      dealership_name: sync('dealerRegistration/dealership_name'),
      first_and_last_name: sync('dealerRegistration/first_and_last_name'),
      contact_email: sync('dealerRegistration/contact_email'),
      contact_phone: sync('dealerRegistration/contact_phone'),
      dealer_data: get('dealerRegistration/dealer_data'),
      dealer_logo: get('dealerRegistration/dealer_logo')
    },
    mounted() {
      if (this.dealer_logo) {
        this.e1 = 2;
      }
    },
    methods: {
      closeWindow() {
        this.$emit('close-window', true)
      },
      submit() {
        this.submitting = true
      },
      async verifyDealer() {
        try {
          this.submitting = true;
          const dealerName = this.dealership_name.replace(/[ ]/g, '-')
          const {
            data
          } = await this.$axios.get(`/places-data/${dealerName}`)
          if (data.details) {

            /**
             * replace any query parameters on the website URL
             * retured from google places and update the dealer data object
             * with parsed URL, then set the dealers data in the Vuex Store
             */
            const websiteURL = data.details.result.website.split('/?')[0]
            data.details.result.website = websiteURL.replace('https://', '');
            this.$store.set('dealerRegistration/dealer_data', data.details
              .result)

            /**
             * Get the dealers logo using the website URL
             */
            const dealerLogo = await this.$axios.get(
              `/logos?url=${websiteURL}`)
            if (dealerLogo) {
              this.$store.set('dealerRegistration/dealer_logo', dealerLogo
                .data)
            }

            this.submitting = false;
            this.e1 = 2;
          } else {
            throw new Error('no data found for this location')
            this.submitting = false;
          }
        } catch (e) {
          console.error(e);
          this.e1 = 2;
        }
      },
      async generateDealer() {
        const dealersDataFromStore  =  this.$store.get('dealerRegistration/dealer_data');
        const dealerName = this.$store.get('dealerRegistration/dealership_name');
        const dealerData = {
        dealer_name: dealerName,
        phone: dealersDataFromStore.formatted_phone_number,
        address_line_1: `${dealersDataFromStore.address_components[0].long_name} ${dealersDataFromStore.address_components[1].long_name}`,
        city_name: dealersDataFromStore.address_components[2].long_name,
        state: dealersDataFromStore.address_components[4].long_name,
        zip_code: dealersDataFromStore.address_components[6].long_name,
        logo_url: this.$store.get('dealerRegistration/dealer_logo') || 'https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png',
        english_website_url : dealersDataFromStore.website ? dealersDataFromStore.website : '',
        dealer_id: dealerName.replace(/[ ]/g, '_').toLowerCase(),
        google_places_id: dealersDataFromStore.place_id || '',
        sales_phone: dealersDataFromStore.formatted_phone_number,
        service_phone: dealersDataFromStore.formatted_phone_number,
        parts_phone: dealersDataFromStore.formatted_phone_number,
        is_live: false,
        }
        const self = this;
        this.$axios.get('/signup/dealer', {
            params: dealerData
          })
          .then(function (response) {
            self.$store.set('dealerRegistration/airtable_record_id' , response.data.record_id)
            self.$store.set('loggedInDealer/dealerData' , dealerData)
            window.sessionStorage.setItem('dealerData' , JSON.stringify(dealerData))
            self.$router.push('/dealers/dashboard')
          })
          .catch(function (error) {
            console.error(error);
          });

      },
      clearForm() {
        this.$store.set('dealerRegistration/dealership_name', '')
        this.$store.set('dealerRegistration/first_and_last_name', '')
        this.$store.set('dealerRegistration/contact_email', '')
        this.$store.set('dealerRegistration/contact_phone', '')
        this.$store.set('dealerRegistration/dealer_data', false)
        this.$store.set('dealerRegistration/dealer_logo', false)
        this.e1 = 1;
      }
    },
  }

</script>

<style lang="scss" scoped>
  .v-stepper.theme--light {
    box-shadow: none;
    border: 0px;
  }

  .v-stepper__header {
    box-shadow: none;
  }

  .theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
    background-color: rgb(228, 6, 6) !important;
  }

</style>
