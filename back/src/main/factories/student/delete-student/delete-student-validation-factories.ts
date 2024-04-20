import { ValidationComposite } from '../../../../presentation/helper/validator'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { Validation } from '../../../../presentation/protocols'

export const makeDeleteStudentValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['id']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
