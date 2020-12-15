<template>
 <div>
<nuxt />
  <DealerDashboardTabs />
  <v-layout>
  <v-container class="fill-height" fluid style="margin-left:240px; margin-top:50px;">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="9">
        <h3 class="registertitle">Edit Dealer Profile</h3>
           <v-card>
                <div>
                  <v-card-text>
                    <ValidationObserver v-slot="{ handleSubmit }">
                      <v-form ref="inquiryForm"
                              @submit.prevent="handleSubmit(submit)"
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
                                            label="Website Url"
                                            placeholder="Website Url"
                                            outlined :error-messages="errors[0]"
                                            required
                                            v-model="english_website_url">
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
                            <img :src="image" height="80" v-else/>
                          </v-col>
                          <v-col cols="12">
                            <v-btn :disabled="disabled" :loading="submitting"
                                   @click="updateDealers()" x-large
                                   block color="#019cf7" dark>
                                   Update
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
  </v-container>
  </v-layout>
 </div>
</template>

<script>
import { ValidationProvider, ValidationObserver, extend  } from 'vee-validate';
import axios from 'axios';
 extend('min', zip_code => {
  return zip_code.length >=4;
});
export default {
    layout: "adminpage",
    name: "dealers_edit",
      components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            ValidationProvider,
            ValidationObserver,
        },
        data(){
            return{
                image:"",
                submitting: false,
                value: true,
                max: 6,
                min:  1,
                userid:"",
                dealer_name  :  "",
                phone  :  "",
                email  :  "",
                address  :  "",
                city  :  "",
                state  :  "",
                zip_code  :  "",
                monday_sales_hours  :  "",
                tuesday_sales_hours  :  "",
                wednesday_sales_hours  :  "",
                thursday_sales_hours  :  "",
                friday_sales_hours  :  "",
                saturday_sales_hours  :  "",
                sunday_sales_hours  :  "",
                monday_service_hours  :  "",
                wednesday_service_hours  :  "",
                thursday_service_hours  :  "",
                friday_service_hours  :  "",
                saturday_service_hours  :  "",
                sunday_service_hours  :  "",
                monday_parts_hours  :  "",
                tuesday_parts_hours  :  "",
                wednesday_parts_hours  :  "",
                thursday_parts_hours  :  "",
                friday_parts_hours  :  "",
                saturday_parts_hours  :  "",
                sunday_parts_hours  :  "",
                sales_phone  :  "",
                dealer_type  :  "",
                content_translation  :  "",
                dealer_id  :  "",
                rooftopId  : "",
                english_website_url : "",
                longitude : "",
                hero_image : '',
                imageFile : '',
                imageUrl : ''
            }
        },
        computed: {
                disabled() {
                    if (this.dealer_name && this.email && this.phone && this.address && this.city && this.state && this.zip_code.length>=4 &&  this.monday_sales_hours && 
        this.tuesday_sales_hours && this.wednesday_sales_hours && this.thursday_sales_hours && this.friday_sales_hours && this.saturday_sales_hours && this.sunday_sales_hours && this.monday_service_hours && this.wednesday_service_hours && this.thursday_service_hours && this.friday_service_hours && this.saturday_service_hours && this.sunday_service_hours && this.monday_parts_hours && this.tuesday_parts_hours && this.wednesday_parts_hours 
        && this.thursday_parts_hours && this.friday_parts_hours && this.saturday_parts_hours && this.sunday_parts_hours && this.sales_phone &&  this.dealer_type && this.content_translation && this.dealer_id && this.rooftopId && this.english_website_url && this.longitude) {
                    return false;
                    }
                    return true;
                }
        },
        mounted(){
          this.userid = this.$route.query.id;
          console.log('dealers id',this.user_id);
            // var userdata = localStorage.getItem('user');
            // this.userid = JSON.parse(userdata)[0]._id; 
            // console.log('datasssssssssssss', this.userid);
             axios.post(`${process.env.BACKEND_API}/getDealersDataById`, {
            id: this.userid,
            })
            .then(res => {
            this.image = res.data[0].imageFile;
            this.dealer_name =  res.data[0].dealer_name;
            this.phone = res.data[0].phone;
            this.email= res.data[0].email;
            this.address = res.data[0].address;
            this.city = res.data[0].city; 
            this.state = res.data[0].state;
            this.zip_code = res.data[0].zip_code;
            this.monday_sales_hours = res.data[0].monday_sales_hours;
            this.tuesday_sales_hours = res.data[0].tuesday_sales_hours;
            this.wednesday_sales_hours = res.data[0].wednesday_sales_hours;
            this.thursday_sales_hours = res.data[0].thursday_sales_hours;
            this.friday_sales_hours = res.data[0].friday_sales_hours;
            this.saturday_sales_hours = res.data[0].saturday_sales_hours;
            this.sunday_sales_hours = res.data[0].sunday_sales_hours;
            this.monday_service_hours = res.data[0].monday_service_hours;
            this.wednesday_service_hours = res.data[0].wednesday_service_hours;
            this.thursday_service_hours = res.data[0].thursday_service_hours;
            this.friday_service_hours = res.data[0].friday_service_hours;
            this.saturday_service_hours = res.data[0].saturday_service_hours;
            this.sunday_service_hours = res.data[0].sunday_service_hours;
            this.monday_parts_hours = res.data[0].monday_parts_hours;
            this.tuesday_parts_hours = res.data[0].tuesday_parts_hours;
            this.wednesday_parts_hours = res.data[0].wednesday_parts_hours;
            this.thursday_parts_hours = res.data[0].thursday_parts_hours;
            this.friday_parts_hours = res.data[0].friday_parts_hours;
            this.saturday_parts_hours = res.data[0].saturday_parts_hours;
            this.sunday_parts_hours = res.data[0].sunday_parts_hours;
            this.sales_phone = res.data[0].sales_phone;
            this.dealer_type = res.data[0].dealer_type;
            this.content_translation = res.data[0].content_translation;
            this.dealer_id = res.data[0].dealer_id;
            this.rooftopId = res.data[0].rooftopId;
            this.english_website_url = res.data[0].english_website_url;
            this.longitude = res.data[0].longitude;     
            })
            .catch(e => {
                console.error(e);
            }) 
           
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
          console.log('image for edit dealers',this.imageFile);
        })
      } else {
        this.hero_image = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },
            submit() {
                this.submitting = true
            },
            updateDealers(){
                  if(this.imageFile ==""){
                    this.imageFile = this.image;
                    console.log('update dealers', this.image);
                  }else{
                    this.imageFile = this.imageFile.baseEncImage;
                    console.log('update dealers=========', this.imageFile);
                  }
                axios.post(`${process.env.BACKEND_API}/updateDealers`, {
                    id:this.userid,
                    dealer_name  :  this.dealer_name,
                    phone  :  this.phone,
                    email  :  this.email,
                    address  :  this.address,
                    city  :  this.city,
                    state  :  this.state,
                    zip_code  :  this.zip_code,
                    monday_sales_hours  :  this.monday_sales_hours,
                    tuesday_sales_hours  :  this.tuesday_sales_hours,
                    wednesday_sales_hours  :  this.wednesday_sales_hours,
                    thursday_sales_hours  :  this.thursday_sales_hours,
                    friday_sales_hours  :  this.friday_sales_hours,
                    saturday_sales_hours  :  this.saturday_sales_hours,
                    sunday_sales_hours  :  this.sunday_sales_hours,
                    monday_service_hours  :  this.monday_service_hours,
                    wednesday_service_hours  :  this.wednesday_service_hours,
                    thursday_service_hours  :  this.thursday_service_hours,
                    friday_service_hours  :  this.friday_service_hours,
                    saturday_service_hours  :  this.saturday_service_hours,
                    sunday_service_hours  :  this.sunday_service_hours,
                    monday_parts_hours  :  this.monday_parts_hours,
                    tuesday_parts_hours  :  this.tuesday_parts_hours,
                    wednesday_parts_hours  :  this.wednesday_parts_hours,
                    thursday_parts_hours  :  this.thursday_parts_hours,
                    friday_parts_hours  :  this.friday_parts_hours,
                    saturday_parts_hours  :  this.saturday_parts_hours,
                    sunday_parts_hours  :  this.sunday_parts_hours,
                    sales_phone  :  this.sales_phone,
                    dealer_type  :  this.dealer_type,
                    content_translation  :  this.content_translation,
                    dealer_id  :  this.dealer_id,
                    rooftopId  : this.rooftopId,
                    english_website_url : this.english_website_url,
                    longitude : this.longitude,
                    imageFile : this.imageFile
                }).then(res => {
                    var status = res.status
                    if(status == 200){
                        this.$toast.success('Updated Successfully');
                        // window.location.href='profile';
                        setTimeout( () => window.location.href = '/dealers/dealermanagement', 2000);
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }

}
</script>

<style>
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