import { FilterListModel } from '@/model/filter-list.model'
import { PagerData } from '@/model/pager-data.model'
import { StudentModel } from '@/model/student.model'
import swal from '@/swal'
import axios from '@/axios'

export default {
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
  }
}
