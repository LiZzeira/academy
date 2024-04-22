import { AccountModel } from '../../../../domain'
import { RefreshToken } from '../../../../domain/usecase/account/refresh-token/refresh-token'
import { MissingParamError } from '../../../error'
import { badRequest } from '../../../helper/http/http-helper'
import { HttpRequest, HttpResponse, Validation } from '../../../protocols'
import { RefreshTokenController } from './refresh-token-controller'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  createdAt: new Date(2020, 1, 1),
  updatedAt: new Date(2020, 1, 1)
})

const makeFakeRequest = (): HttpRequest => ({
  body: {},
  control: {
    accountUser: makeFakeAccount()
  }
})

const makeRefreshToken = (): RefreshToken => {
  class RefreshTokenStub implements RefreshToken {
    async refresh(id: string): Promise<string> {
      return await new Promise((resolve) => resolve('any_token'))
    }
  }
  return new RefreshTokenStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: RefreshTokenController
  refreshTokenStub: RefreshToken
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const refreshTokenStub = makeRefreshToken()
  const validationStub = makeValidation()
  const sut = new RefreshTokenController(refreshTokenStub, validationStub)

  return {
    sut,
    refreshTokenStub,
    validationStub
  }
}

describe('Refresh Token Controller', () => {
  test('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse: HttpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
