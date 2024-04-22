import { InvalidParamError } from '../../../error'
import { Validation } from '../../../protocols'

export class ValidateCpfValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | null {
    if (!this.validateCPF(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }
    return null
  }

  private validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '')

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

    function calculateDigit(cpf: string, factor: number): number {
      let total = 0
      for (const digit of cpf) {
        total += parseInt(digit) * factor--
      }
      const remainder = total % 11
      return remainder < 2 ? 0 : 11 - remainder
    }

    const digit1 = calculateDigit(cpf.slice(0, 9), 10)
    const digit2 = calculateDigit(cpf.slice(0, 10), 11)
    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10])
  }
}
