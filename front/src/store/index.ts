import { FilterListModel } from '@/model/filter-list.model'
import { StoreModel } from '@/model/store.model'
import { createStore } from 'vuex'
import service from '@/api'

export default createStore<StoreModel>({
  state: {
    students: { page: 0, limit: 10, length: 0, data: [] }
  },
  mutations: {
    setStudents(state, students) {
      state.students = students
    }
  },
  actions: {
    getUsers({ commit }, filters?: FilterListModel) {
      service.getUserAsync(filters).then(res => commit('setStudents', res))
    }
  },
  getters: {},
  modules: {}
})
