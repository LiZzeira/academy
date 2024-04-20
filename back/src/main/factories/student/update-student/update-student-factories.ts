import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbUpdateData } from '../../../../data/usecase/base/update-data/db-update-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { StudentTypeormRepository } from '../../../../infra/db/typeorm/student/student-typerom-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { UpdateStudentController } from '../../../../presentation/controller/student/update-student/update-student-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeUpdateStudentValidation } from './update-student-validation-factories'

export const makeUpdateStudentController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const studentTypeormRepository = new StudentTypeormRepository()

  const dbUpdateStudent = new DbUpdateData(studentTypeormRepository)
  const updateStudentController = new UpdateStudentController(
    dbUpdateStudent,
    makeUpdateStudentValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    updateStudentController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
