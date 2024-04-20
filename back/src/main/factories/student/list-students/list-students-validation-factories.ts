import { ValidationComposite } from '../../../../presentation/helper/validator'
import { Validation } from '../../../../presentation/protocols'

export const makeListStudentsValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  return new ValidationComposite(validations)
}
