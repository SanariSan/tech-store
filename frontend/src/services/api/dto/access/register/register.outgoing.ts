import type { IAccessRegisterOutgoingDTO, TAccessRegisterOutgoingFields } from './register.type';

export class RegisterOutgoingDTO implements IAccessRegisterOutgoingDTO {
  private readonly email: TAccessRegisterOutgoingFields['email'];

  private readonly username: TAccessRegisterOutgoingFields['username'];

  private readonly password: TAccessRegisterOutgoingFields['password'];

  constructor({ email, username, password }: TAccessRegisterOutgoingFields) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  public getFields() {
    return {
      email: this.email,
      username: this.username,
      password: this.password,
    };
  }
}
