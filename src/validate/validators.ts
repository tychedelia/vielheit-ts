import {IsLength, IsEmail, } from 'validator.ts/decorator/Validation'

class UsersController_authenticate {
    @IsEmail()
    email: string = '' // TODO: It sucks to have to initialize these

    @IsLength(6, 20)
    password: string = ''
}

const _validators = {
  UsersController_authenticate, 
}

const validators = new Proxy(_validators, {
  get(target: any, name: string) {
    return name in target? 
      target[name] : new Error(`Validator ${name} not found!`);
  }
})

export default validators