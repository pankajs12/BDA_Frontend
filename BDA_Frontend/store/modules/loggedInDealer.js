import { make } from 'vuex-pathify'
const state = () => ({
  dealerData: []
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
