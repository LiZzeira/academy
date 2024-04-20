import { AppDataSource } from '../../../../../ormconfig'
import { PagerData } from '../../../../domain/models/list-pager/list-pager-data'
import { FilterColumns } from '../../../../domain/usecase/base/list-pager/list-pager-data'
import { BaseTypeormRepository } from '../base/base-typeorm-repository'
import { typeormHelper } from '../base/helper'
import { mergeObjects } from '../base/mergeObjects'
import { StudentEntity } from '../entities/student/student-entity'

export class StudentTypeormRepository extends BaseTypeormRepository<StudentEntity> {
  constructor() {
    super()
    this.connect = AppDataSource.getRepository(StudentEntity)
  }
}
