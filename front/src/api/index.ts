/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterListModel } from '@/model/filter-list.model'
import { PagerData } from '@/model/pager-data.model'
import { StudentModel } from '@/model/student.model'
import swal from '@/swal'
import axios from '@/axios'
import { LoginModel } from '@/model/login.model'
import { AccountModel } from '@/model/account.model'
import store from '@/store'

function handleApiError(err: any) {
  swal.danger(
    err.response?.data?.error ??
      err?.message ??
      'Oops! An internal error has occurred'
  )
}

async function updateStoreAndToken(data: AccountModel) {
  if (data.token) {
    localStorage.setItem('accessToken', data.token)
  }
  store.dispatch('setAccountAndIsAuthenticated', data)
  return data
}

const apiService = {
  async login(user: LoginModel): Promise<AccountModel | null> {
    try {
      const response = await axios.post<AccountModel>('login', user)
      return updateStoreAndToken(response.data)
    } catch (err: any) {
      handleApiError(err)
      store.dispatch('setAccount', null)
      return null
    }
  },

  async register(account: AccountModel): Promise<AccountModel | null> {
    try {
      const response = await axios.post<AccountModel>('register', account)
      return updateStoreAndToken(response.data)
    } catch (err: any) {
      handleApiError(err)
      store.dispatch('setAccount', null)
      return null
    }
  },

  async refresh(): Promise<AccountModel | null> {
    try {
      const response = await axios.get<AccountModel>('token')
      return updateStoreAndToken(response.data)
    } catch (err: any) {
      handleApiError(err)
      store.dispatch('setAccount', null)
      return null
    }
  },

  async getUserAsync(
    filters?: FilterListModel
  ): Promise<PagerData<StudentModel>> {
    try {
      const response = await axios.get('student', { params: filters })
      return response.data
    } catch (err: any) {
      handleApiError(err)
      return { page: 0, limit: 10, length: 0, data: [] }
    }
  },

  async deleteStudent(id: string): Promise<{ deleteCount: number }> {
    try {
      const response = await axios.delete(`student/${id}`)
      return response.data
    } catch (err: any) {
      handleApiError(err)
      return { deleteCount: 0 }
    }
  },

  async findStudentById(id: string): Promise<StudentModel | null> {
    try {
      const response = await axios.get<StudentModel>(`student/${id}`)
      return response.data
    } catch (err: any) {
      handleApiError(err)
      return null
    }
  },

  async saveStudent(student: StudentModel): Promise<StudentModel | null> {
    try {
      if (student.id) {
        const response = await axios.put<StudentModel>(
          `student/${student.id}`,
          student
        )
        return response.data
      }
      const response = await axios.post<StudentModel>('student', student)
      return response.data
    } catch (err: any) {
      handleApiError(err)
      return null
    }
  }
}

export default apiService
