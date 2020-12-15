import { make } from 'vuex-pathify';
const state = () => ({
  is_logged_in: false,
  selected_search_distance: 'all',
  around_lat_lng_by_ip_address: true,
  zipcode: false,
  selected_algolia_index: '2020_classifieds_db'
});

const actions = {
  // automatically create only `setItems()` action
  ...make.actions(state),
};

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state)
};

const getters = {
  ...make.getters(state)
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
