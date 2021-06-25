export const state = () => ({
  preloading: false
})
export const mutations = {
    toggle(state) { state.preloading = !state.preloading }
}
export const actions = {
    toggled({ commit }) { commit('toggle') }
}
export const getters = {
    toggled(state) { return state.preloading }
}
