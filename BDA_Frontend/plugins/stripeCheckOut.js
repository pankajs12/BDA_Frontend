import Vue from 'vue'
// import VueStripeCheckout from 'vue-stripe-checkout'
import VueStripeCheckout from '../node_modules/vue-stripe-checkout/dist'
// import StripeElements from 'vue-stripe-checkout';
const options = {
  key: 'pk_test_51GHGgRKwZCJ9Iq9U80Po43t5uUg0hwi9aC9KSohCWZpenZow5584vj0AOsP3eg21lqUe1veeImrF3xwrAAVDYZ7n00zUUlZue2', // STRIPE_TOKEN,
  locale: 'auto',
  currency: 'USD'
}
Vue.extend(VueStripeCheckout, options)