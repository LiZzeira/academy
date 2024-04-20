import { StudentModel } from '../../../../domain/models/student/student.model'
import { FindOneData } from '../../../../domain/usecase/base/find-one-data/find-one-data'
import { UpdateData } from '../../../../domain/usecase/base/update-data/update-data'
import { NotFoundError } from '../../../error'
import {
  badRequest,
  notFound,
  okRequest,
  serverError
} from '../../../helper/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from '../../../protocols'

export class UpdateStudentController implements Controller {
  constructor(
    private readonly updateStudent: UpdateData<
      Pick<StudentModel, 'id' | 'email' | 'name'>
    >,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { id, name, email } = httpRequest.body
      const { accountUser } = httpRequest.control

      const student = await this.updateStudent.update(
        {
          id,
          name,
          email
        },
        accountUser.id
      )

      if (!student) {
        return notFound(new NotFoundError('Student'))
      }

      return okRequest(student)
    } catch (error) {
      return serverError(error)
    }
  }
}
