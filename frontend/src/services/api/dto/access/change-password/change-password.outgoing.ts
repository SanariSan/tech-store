import type {
  IAccessChangePasswordOutgoingDTO,
  TAccessChangePasswordOutgoingFields,
} from './change-password.type';

export class ChangePasswordOutgoingDTO implements IAccessChangePasswordOutgoingDTO {
  private readonly oldPassword: TAccessChangePasswordOutgoingFields['oldPassword'];

  private readonly newPassword: TAccessChangePasswordOutgoingFields['newPassword'];

  constructor({ oldPassword, newPassword }: TAccessChangePasswordOutgoingFields) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  public getFields() {
    return {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
    };
  }
}
