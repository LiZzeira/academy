import { AccountModel } from './account.model'
import { PagerData } from './pager-data.model'
import { StudentModel } from './student.model'

export interface StoreModel {
  isAuthenticated: boolean
  account: AccountModel | null
  students: PagerData<StudentModel>
}
