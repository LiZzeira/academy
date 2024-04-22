/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterListModel } from '@/model/filter-list.model'
import { PagerData } from '@/model/pager-data.model'
import { StudentModel } from '@/model/student.model'
import swal from '@/swal'
import axios from '@/axios'
import { LoginModel } from '@/model/login.model'
import { AccountModel } from '@/model/account.model'
import store from '@/store'

export default {
  async login(user: LoginModel): Promise<AccountModel | null> {
    try {
      const data = await axios.post<AccountModel>(`login`, user)
      if (data.data.token) {
        localStorage.setItem('accessToken', data.data.token)
      }

      store.dispatch('setAccountAndIsAuthenticated', data.data)

      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )

      store.dispatch('setAccount', null)
      return null
    }
  },

  async register(account: AccountModel): Promise<AccountModel | null> {
    try {
      const data = await axios.post<AccountModel>(`register`, account)
      if (data.data.token) {
        localStorage.setItem('accessToken', data.data.token)
      }

      store.dispatch('setAccountAndIsAuthenticated', data.data)

      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )

      store.dispatch('setAccount', null)
      return null
    }
  },

  async refresh(): Promise<AccountModel | null> {
    try {
      const data = await axios.get<AccountModel>(`token`)
      if (data.data.token) {
        localStorage.setItem('accessToken', data.data.token)
      }

      console.log(data.data)

      store.dispatch('setAccountAndIsAuthenticated', data.data)

      return data.data
    } catch (err: any) {
      swal.danger(
        (err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred') + 'Testeee'
      )

      store.dispatch('setAccount', null)
      return null
    }
  },

  async getUserAsync(
    filters?: FilterListModel
  ): Promise<PagerData<StudentModel>> {
    try {
      const data = await axios.get(`student`, {
        params: filters
      })

      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )
      return { page: 0, limit: 10, length: 0, data: [] }
    }
  },

  async deleteStudent(id: string): Promise<{ deleteCount: number }> {
    try {
      const data = await axios.delete(`student/${id}`)
      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )
      return { deleteCount: 0 }
    }
  },

  async FindStudentById(id: string): Promise<StudentModel | null> {
    try {
      const data = await axios.get(`student/${id}`)
      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )
      return null
    }
  },

  async SaveStudent(student: StudentModel): Promise<StudentModel | null> {
    try {
      if (student?.id) {
        const data = await axios.put(`student`, student)
        return data.data
      }

      const data = await axios.post(`student`, student)
      return data.data
    } catch (err: any) {
      swal.danger(
        err.response?.data?.error ??
          err?.message ??
          'Oops! An internal error has occurred'
      )
      return null
    }
  }
}
