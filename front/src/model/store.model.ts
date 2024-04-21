import { PagerData } from './pager-data.model'
import { StudentModel } from './student.model'

export interface StoreModel {
  students: PagerData<StudentModel>
}
