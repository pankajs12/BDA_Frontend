<template>
  <v-dialog
    :value="dialog"
    max-width="435px"
    :fullscreen="$vuetify.breakpoint.mdAndUp ? false : true"
  >

    <v-card tile>
      <v-card-title
        class="headline"
        :style="{ 'background-color': $vuetify.theme.themes.light.bdablue }"
      >
        <div class="overline" style="color:white">
          {{ $attrs.vehicleData.condition }} {{ $attrs.vehicleData.year }}
          {{ $attrs.vehicleData.make }}
          <div class="subtitle-1">
            {{ $attrs.vehicleData.model }} {{ $attrs.vehicleData.trim }}
            {{ $attrs.vehicleData.style }}
          </div>
        </div>
        <v-btn
          absolute
          right
          depressed
          fab
          dark
          color="transparent"
          small
          @click="closeWindow"
        >
          <v-icon dark>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <div>
      <v-card-title class="header-title">
        {{ $t('labels.check_availability') }}
      </v-card-title>
      <v-card-text>
        <ValidationObserver v-slot="{ handleSubmit }">
          <v-form
            ref="inquiryForm"
            @submit.prevent="handleSubmit(submit)"
            autocomplete="on"
          >
            <v-row align="start">
              <v-col cols="12">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    prepend-inner-icon="mdi-account"
                    :label="$t('labels.forms.first_and_last_name')"
                    :placeholder="$t('labels.forms.first_and_last_name')"
                    outlined
                    :error-messages="errors[0]"
                    required
                    v-model="full_name"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" class="pt-0">
                <ValidationProvider
                  rules="required|email"
                  v-slot="{ errors }"
                  disabled
                >
                  <v-text-field
                    prepend-inner-icon="mdi-at"
                    :label="$t('labels.forms.email_address')"
                    placeholder="me@email.com"
                    outlined
                    required
                    :error-messages="errors[0]"
                    v-model="email"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" class="pt-0">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <v-text-field
                    prepend-inner-icon="mdi-phone"
                    :label="$t('labels.forms.phone_number')"
                    placeholder="(555) 444-3333"
                    outlined
                    v-mask="'(###) ###-####'"
                    :error-messages="errors[0]"
                    required
                    v-model="phone"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-textarea
                  :label="$t('labels.forms.message_label_optional')"
                  :placeholder="$t('labels.forms.message_label_optional')"
                  outlined
                  v-model="message"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-btn
                  :loading="submitting"
                  type="submit"
                  x-large
                  block
                  color="rgb(236, 5, 5)"
                  dark
                >
                  {{ $t('labels.forms.submit') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="blue darken-1" text @click="closeWindow">{{
          $t('labels.forms.close_form')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'srp-inquire-popup',
  components: {
    ValidationProvider,
    ValidationObserver,
    InquiryFormFullscreen: () => import("@/components/form-components/InquiryFormFullscreen"),
    InquiryFormStandard: () =>
import("@/components/form-components/InquiryFormStandard")

  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      valid: true,
      full_name: '',
      email: '',
      phone: '',
      message: '',
      submitting: false,
      isMediumBreakpoint: false
    }
  },
  mounted () {
    this.isMediumBreakpoint = this.$vuetify.breakpoint.mdAndUp
    this.message = `${this.$t('labels.forms.default_inquiry_message')} ${
      this.$attrs.vehicleData.condition
    } ${this.$attrs.vehicleData.year} ${this.$attrs.vehicleData.make} ${
      this.$attrs.vehicleData.model
    } ${this.$attrs.vehicleData.trim}`
  },
  beforeDestroy () {
    // this.$emit('close-window', true)
  },
  methods: {
    closeWindow () {
      this.$emit('close-window', true)
    },
    submit () {
      this.submitting = true
      setTimeout(() => {

          this.$emit('close-window' , true)
      }, 1000);
    }
  }
}
</script>

<style lang="scss" scoped></style>
