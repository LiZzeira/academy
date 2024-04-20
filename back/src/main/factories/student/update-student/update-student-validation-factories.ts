import {
  EmailValidation,
  ValidationComposite
} from '../../../../presentation/helper/validator'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../utils/email-validatior/email-validator-adapter'

export const makeUpdateStudentValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['id', 'name', 'email']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
