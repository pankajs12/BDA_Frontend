// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      modules: ['recentlyViewedVehicles', 'savedVehicles' , 'userProfile', 'dealerRegistration', 'loggedInDealer', 'currentDealerProfile'],
    }).plugin(store);
  });
}
