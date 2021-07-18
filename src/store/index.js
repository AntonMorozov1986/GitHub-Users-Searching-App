import Vue from 'vue';
import Vuex from 'vuex';
import {Octokit} from "@octokit/core";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wasAlreadySearching: false,
    users: [],
    usersQuantity: Infinity,
    userInfo: null,
    isLoading: false,
    pageNumber: 1,
    searchingText: '',
    sortingType: '',
    sortingOrder: '',
    isUserModalOpen: false
  },
  mutations: {
    setSearchingStatus (state, wasAlreadySearching) {
      state.wasAlreadySearching = wasAlreadySearching;
    },
    loadUsers (state, users) {
      state.users = [...state.users, ...users];
    },
    clearUsers (state) {
      state.users = [];
    },
    setUsersQuantity (state, usersQuantity) {
      state.usersQuantity = usersQuantity;
    },
    clearUsersQuantity (state) {
      state.usersQuantity = Infinity;
    },
    loadUserInfo (state, user) {
      state.userInfo = user;
    },
    toggleLoading (state) {
      state.isLoading = !state.isLoading
    },
    setPageNumber (state, pageNumber) {
      state.pageNumber = pageNumber;
    },
    setSearchingText (state, text) {
      state.searchingText = text;
    },
    setSortingType (state, sortingType) {
      state.sortingType = sortingType;
    },
    setSortingOrder (state, sortingOrder) {
      state.sortingOrder = sortingOrder;
    },
    setUserModalOpen (state, isUserOpenModal) {
      state.isUserModalOpen = isUserOpenModal;
    }


  },
  getters: {
    wasAlreadySearching (state) {
      return state.wasAlreadySearching;
    },
    users (state) {
      return state.users;
    },
    usersQuantity (state) {
      return state.usersQuantity;
    },
    userInfo (state) {
      return state.userInfo;
    },
    isLoading (state) {
      return state.isLoading;
    },
    pageNumber (state) {
      return state.pageNumber;
    },
    searchingText (state) {
      return state.searchingText;
    },
    sortingType (state) {
      return state.sortingType;
    },
    sortingOrder (state) {
      return state.sortingOrder;
    },
    isUserModalOpen (state) {
      return state.isUserModalOpen;
    }
  },
  actions: {
    async loadUsers ({commit, getters}) {
      if (getters.users.length === getters.usersQuantity ) {
        return;
      }
      commit('toggleLoading');
      const octokit = new Octokit();
      const response = await octokit.request('GET /search/users', {
        q: `${getters.searchingText} in:login`,
        sort: getters.sortingType,
        order: getters.sortingOrder,
        page: getters.pageNumber,
        per_page: 20
      });

      if (!getters.wasAlreadySearching) {
        commit('setSearchingStatus', true);
      }
      commit('loadUsers', response.data.items);
      commit('setUsersQuantity', response.data.total_count);
      commit('toggleLoading');
    },

    async loadUserInfo ({commit, getters}, user) {
      commit('toggleLoading');
      const octokit = new Octokit();
      const response = await octokit.request('GET /users/{username}', {
        username: user.login
      });
      commit('loadUserInfo', response.data);
      commit('toggleLoading');
    }
  },
  modules: {
  }
});
