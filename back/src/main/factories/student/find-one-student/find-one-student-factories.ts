import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbFindOneData } from '../../../../data/usecase/base/find-one-data/db-find-one-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { StudentTypeormRepository } from '../../../../infra/db/typeorm/student/student-typerom-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { FindOneStudentController } from '../../../../presentation/controller/student/find-one-student/find-one-student-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeFindOneStudentValidation } from './find-one-student-validation-factories'

export const makeFindOneStudentController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const studentTypeormRepository = new StudentTypeormRepository()

  const dbFindOneStudent = new DbFindOneData(studentTypeormRepository)
  const findOneStudentController = new FindOneStudentController(
    dbFindOneStudent,
    makeFindOneStudentValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    findOneStudentController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
