import { make } from 'vuex-pathify';
const state = () => ({
  clipped: true,
  show_side_nav: false,
  loading: true,
  dealerInventoryActive: false,
  show_saved_vehicles: false,
  breadcrumbs: [],
  route_meta: [],
  no_results_found: false,
  distanceSelections: [
    {
      text: '25 miles',
      value: 25
    },
    {
      text: '50 miles',
      value: 50
    },
    {
      text: '75 miles',
      value: 75
    },
    {
      text: '100 miles',
      value: 100
    },
    {
      text: '150 miles',
      value: 150
    },
    {
      text: '200 miles',
      value: 200
    },
    {
      text: '250 miles',
      value: 250
    },
    {
      text: '300 miles',
      value: 300
    },
    {
      text: '400 miles',
      value: 400
    },
    {
      text: '500 miles',
      value: 500
    },
    {
      text: '600 miles',
      value: 600
    },
    {
      text: 'all',
      value: 'all'
    }
  ]
})

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
