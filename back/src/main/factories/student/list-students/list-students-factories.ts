import { DbGetAccount } from '../../../../data/usecase/account/get-account-by-token/db-get-account'
import { DbListPagerData } from '../../../../data/usecase/base/list-pager-data/db-list-data'
import { AccountTypeormRepository } from '../../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogErrorTypeormRepository } from '../../../../infra/db/typeorm/log/log-error-typeorm-repository'
import { StudentTypeormRepository } from '../../../../infra/db/typeorm/student/student-typerom-repository'
import { JwtAdapter } from '../../../../infra/jwt-adapter/jwt-adapter'
import { ListStudentsController } from '../../../../presentation/controller/student/list-students/list-stydents-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log/error/log-error-controller-decorator'
import { makeVerifyUserAuthDecoratorValidation } from '../../../decorators/verify-user-auth/validator/verify-user-auth-decorator-validation'
import { VerifyUserAuthDecorator } from '../../../decorators/verify-user-auth/verify-user-auth-decorator'
import { makeListStudentsValidation } from './list-students-validation-factories'

export const makeListStudentsController = (): Controller => {
  // Repositories
  const logErrorTypeormRepository = new LogErrorTypeormRepository()
  const accountTypeormRepository = new AccountTypeormRepository()
  const studentTypeormRepository = new StudentTypeormRepository()

  const dbListStudents = new DbListPagerData(studentTypeormRepository)
  const listStudentsController = new ListStudentsController(
    dbListStudents,
    makeListStudentsValidation()
  )

  // Verify User Decorator
  const jwtAdapter = new JwtAdapter()
  const dbGetAccount = new DbGetAccount(jwtAdapter, accountTypeormRepository)
  const verifyUserAuth0Decorator = new VerifyUserAuthDecorator(
    listStudentsController,
    dbGetAccount,
    makeVerifyUserAuthDecoratorValidation()
  )

  // Log Error Decorator
  return new LogControllerDecorator(
    verifyUserAuth0Decorator,
    logErrorTypeormRepository
  )
}
