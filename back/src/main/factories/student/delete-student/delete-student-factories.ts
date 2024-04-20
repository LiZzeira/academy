import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbDeleteData } from '../../../../data/usecase/base/delete-data/db-delete-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { StudentTypeormRepository } from '../../../../infra/db/typeorm/student/student-typerom-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { DeleteStudentController } from '../../../../presentation/controller/student/delete-student/delete-student-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeDeleteStudentValidation } from './delete-student-validation-factories'

export const makeDeleteStudentController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const studentTypeormRepository = new StudentTypeormRepository()

  const dbDeleteStudent = new DbDeleteData(studentTypeormRepository)
  const deleteStudentController = new DeleteStudentController(
    dbDeleteStudent,
    makeDeleteStudentValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    deleteStudentController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
