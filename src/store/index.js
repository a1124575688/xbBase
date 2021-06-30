import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    detailsPage: false
  },
  mutations: {
    setDetailsPage (state,params) {
      state.detailsPage = params
    }
  },
  actions: {
  },
  modules: {
  },
});
