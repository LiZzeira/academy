import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbAddData } from '../../../../data/usecase/base/add-data/db-add-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { StudentTypeormRepository } from '../../../../infra/db/typeorm/student/student-typerom-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { AddStudentController } from '../../../../presentation/controller/student/add-student/add-student-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeAddStudentValidation } from './add-student-validation-factories'

export const makeAddStudentController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const studentTypeormRepository = new StudentTypeormRepository()

  const dbAddStudent = new DbAddData(studentTypeormRepository)
  const addStudentController = new AddStudentController(
    dbAddStudent,
    makeAddStudentValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    addStudentController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
