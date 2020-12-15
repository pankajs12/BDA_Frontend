import { make } from 'vuex-pathify'
const state = () => ({
  dealership_name: '',
  first_and_last_name: '',
  contact_email: '',
  contact_phone: '',
  dealer_data: undefined,
  dealer_logo: false,
  airtable_record_id: undefined,
  payAmount: "",
  verification_status: "",
  approve_status: "",
  activate_suspend_status:"",
  roles:"",
  description:"",
  subscription_date:"",
  subscription_expiration_date:"",
  dealer_name: "",
  phone: "",
  email: "",
  password: "",
  confirm_password: "",
  address: "",
  city: "",
  state: "",
  zip_code: "",
  monday_sales_hours: "",
  tuesday_sales_hours : "",
  wednesday_sales_hours : "",
  thursday_sales_hours : "",
  friday_sales_hours : "",
  saturday_sales_hours : "",
  sunday_sales_hours : "",
  monday_service_hours : "",
  // tuesday_service_hours : "",
  wednesday_service_hours : "",
  thursday_service_hours : "",
  friday_service_hours : "",
  saturday_service_hours : "",
  sunday_service_hours : "",
  monday_parts_hours : "",
  tuesday_parts_hours : "",
  wednesday_parts_hours : "",
  thursday_parts_hours : "",
  friday_parts_hours : "",
  saturday_parts_hours : "",
  sunday_parts_hours : "",
  sales_phone : "",
  dealer_type : "",
  content_translation : "",
  dealer_id : "",
  rooftopId : "",
  english_website_url : "",
  longitude : "",
  latitude : "",
  google_places_id:"",
  about_us_text : "",
  hero_image : "",
  imageFile: "",
  imageUrl: "",
})

const actions = {
  // automatically create only `setItems()` action
  ...make.actions(state)
}

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state)
}

const getters = {
  ...make.getters(state)
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
