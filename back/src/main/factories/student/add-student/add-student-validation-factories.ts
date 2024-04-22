import {
  EmailValidation,
  ValidationComposite
} from '../../../../presentation/helper/validator'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { ValidateCpfValidation } from '../../../../presentation/helper/validator/valide-cpf/valide-cpf-validation'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../utils/email-validatior/email-validator-adapter'

export const makeAddStudentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'cpf', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new ValidateCpfValidation('cpf'))

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
