import { FilterListModel } from '@/model/filter-list.model'
import { StoreModel } from '@/model/store.model'
import { createStore } from 'vuex'
import service from '@/api'
import { AccountModel } from '@/model/account.model'

export default createStore<StoreModel>({
  state: {
    isAuthenticated: false,
    account: null,
    students: { page: 0, limit: 10, length: 0, data: [] }
  },
  mutations: {
    setStudents(state, students) {
      state.students = students
    },

    setMyAccount(state, account) {
      state.account = account
    },

    setIsAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated
    }
  },
  actions: {
    getStudents({ commit }, filters?: FilterListModel) {
      service.getUserAsync(filters).then(res => commit('setStudents', res))
    },

    setAccount({ commit }, account: AccountModel) {
      commit('setMyAccount', account)
    },

    setAccountAndIsAuthenticated({ commit }, account: AccountModel | null) {
      commit('setMyAccount', account)
      commit('setIsAuthenticated', !!account)
    },

    logout() {
      localStorage.removeItem('accessToken')
      this.dispatch('setAccountAndIsAuthenticated', null)
    }
  },
  getters: {
    async getIsAuthenticated(state: StoreModel) {
      if (state.isAuthenticated) {
        return state.isAuthenticated
      }
      if (localStorage.getItem('accessToken')) {
        return !!(await service.refresh())
      }
      return false
    }
  },
  modules: {}
})
