import { StudentModel } from '../../../../domain/models/student/student.model'
import { AddData } from '../../../../domain/usecase/base/add-data/add-data'
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

export class AddStudentController implements Controller {
  constructor(
    private readonly addStudent: AddData<
      Pick<StudentModel, 'cpf' | 'name' | 'email'>,
      StudentModel
    >,
    private readonly validation: Validation
  ) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, cpf, email } = httpRequest.body

      const student = await this.addStudent.add({
        name,
        cpf,
        email
      })

      return okRequest(student)
    } catch (err) {
      return serverError(err)
    }
  }
}
