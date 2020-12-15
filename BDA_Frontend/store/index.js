import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import navigation from './modules/navigation'
import savedVehicles from './modules/savedVehicles'
import recentlyViewedVehicles from './modules/recentlyViewedVehicles'
import userProfile from './modules/userProfile'
import algoliaState from './modules/algoliaState'
import dealerRegistration from './modules/dealerRegistration'
import loggedInDealer from './modules/loggedInDealer'
import currentDealerProfile from './modules/currentDealerProfile'
const createStore = () => {
  return new Vuex.Store({
    plugins: [pathify.plugin],

    modules: {
      navigation,
      savedVehicles,
      recentlyViewedVehicles,
      userProfile,
      algoliaState,
      dealerRegistration,
      loggedInDealer,
      currentDealerProfile
    },

    actions: {
      nuxtServerInit(context, value) {}
    }
  })
}
export default createStore
