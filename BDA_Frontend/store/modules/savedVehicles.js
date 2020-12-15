import { make } from 'vuex-pathify';
const state = () => ({
  vehicles: [],
  show_saved_vehicles: false,
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
