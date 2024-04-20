import { FindOptionsRelations, FindOptionsSelect } from 'typeorm'
import { StudentEntity } from '../../../../infra/db/typeorm/entities/student/student-entity'
import {
  badRequest,
  okRequest,
  serverError
} from '../../../helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'
import { ListPagerData } from '../../../../domain/usecase/base/list-pager/list-pager-data'

export class ListStudentsController implements Controller {
  constructor(
    private readonly listStudents: ListPagerData<StudentEntity>,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { search, page, limit, orderBy, desc, filterColumns } =
        httpRequest.body

      const filterColumnsValidation = filterColumns ?? {}

      const searchableFields = [
        { field: 'id', type: 'number' },
        { field: 'name', type: 'string' },
        { field: 'cpf', type: 'string' },
        { field: 'email', type: 'string' }
      ]

      const relations: FindOptionsRelations<StudentEntity> | undefined =
        undefined
      const select: FindOptionsSelect<StudentEntity> | undefined = undefined

      const data = await this.listStudents.list(
        search,
        page,
        limit,
        orderBy,
        desc,
        filterColumnsValidation,
        searchableFields,
        relations,
        select
      )

      return okRequest(data)
    } catch (err) {
      return serverError(err)
    }
  }
}
