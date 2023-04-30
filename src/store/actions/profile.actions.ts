import { Action } from 'redux';
import { IProfile } from '../../interfaces/my-profile/profile.interface';
import { IUpdateProfileData } from '../../interfaces/my-profile/update-profile-data.interface';
import { INewsletterData } from '../../interfaces/my-profile/newsletter-data.interface';
import { IChangePasswordData } from '../../interfaces/settings/change-password-data.interface';

export enum ProfileActionTypes {
  getProfile = '[My Profile] Get Profile',
  getProfileSuccess = '[My Profile] Get Profile Success',
  getProfileFailed = '[My Profile] Get Profile Failed',

  updateProfile = '[My Profile] Update Profile',
  updateProfileSuccess = '[My Profile] Update Profile Success',
  updateProfileFailed = '[My Profile] Update Profile Failed',

  uploadAvatar = '[My Profile] Upload Avatar',
  uploadAvatarSuccess = '[My Profile] Upload Avatar Success',
  uploadAvatarFailed = '[My Profile] Upload Avatar Failed',

  changePassword = '[My Profile] Change Password',
  changePasswordSuccess = '[My Profile] Change Password Success',
  changePasswordFailed = '[My Profile] Change Password Failed',

  enableTwoFactor = '[My Profile] Enable Two Factor',
  enableTwoFactorSuccess = '[My Profile] Enable Two Factor Success',
  enableTwoFactorFailed = '[My Profile] Enable Two Factor Failed',

  disableTwoFactor = '[My Profile] Disable Two Factor',
  disableTwoFactorSuccess = '[My Profile] Disable Two Factor Success',
  disableTwoFactorFailed = '[My Profile] Disable Two Factor Failed',

  setNewsletter = '[Newsletters] Set Newsletter',
  setNewsletterSuccess = '[Newsletters] Set Newsletter Success',
  setNewsletterFiled = '[Newsletters] Set Newsletter Failed',

  unsubscribeNewsletters = '[Newsletters] Unsubscribe Newsletters',
  unsubscribeNewslettersSuccess = '[Newsletters] Unsubscribe Newsletters Success',
  unsubscribeNewslettersFailed = '[Newsletters] Unsubscribe Newsletters Failed',

  deleteAccount = '[Profile] Delete Profile',
  deleteAccountSuccess = '[Profile] Delete Profile Success',
  deleteAccountFailed = '[Profile] Delete Profile Failed',
}

export class GetProfile implements Action {
  readonly type = ProfileActionTypes.getProfile;
}

export class GetProfileSuccess implements Action {
  readonly type = ProfileActionTypes.getProfileSuccess;

  constructor(public payload: IProfile) {
  }
}

export class GetProfileFailed implements Action {
  readonly type = ProfileActionTypes.getProfileFailed;
}

export class UpdateProfile implements Action {
  readonly type = ProfileActionTypes.updateProfile;

  constructor(public payload: IUpdateProfileData) {
  }
}

export class UpdateProfileSuccess implements Action {
  readonly type = ProfileActionTypes.updateProfileSuccess;

  constructor(public payload: IUpdateProfileData) {
  }
}

export class UpdateProfileFailed implements Action {
  readonly type = ProfileActionTypes.updateProfileFailed;
}

export class UploadAvatar implements Action {
  readonly type = ProfileActionTypes.uploadAvatar;

  constructor(public payload: Blob) {
  }
}

export class UploadAvatarSuccess implements Action {
  readonly type = ProfileActionTypes.uploadAvatarSuccess;

  constructor(public payload: string) {
  }
}

export class UploadAvatarFailed implements Action {
  readonly type = ProfileActionTypes.uploadAvatarFailed;
}

export class ChangePassword implements Action {
  readonly type = ProfileActionTypes.changePassword;

  constructor(public payload: IChangePasswordData) {
  }
}

export class ChangePasswordSuccess implements Action {
  readonly type = ProfileActionTypes.changePasswordSuccess;
}

export class ChangePasswordFailed implements Action {
  readonly type = ProfileActionTypes.changePasswordFailed;
}

export class EnableTwoFactor implements Action {
  readonly type = ProfileActionTypes.enableTwoFactor;

  constructor(public payload: string) {
  }
}

export class EnableTwoFactorSuccess implements Action {
  readonly type = ProfileActionTypes.enableTwoFactorSuccess;
}

export class EnableTwoFactorFailed implements Action {
  readonly type = ProfileActionTypes.enableTwoFactorFailed;
}

export class DisableTwoFactor implements Action {
  readonly type = ProfileActionTypes.disableTwoFactor;
}

export class DisableTwoFactorSuccess implements Action {
  readonly type = ProfileActionTypes.disableTwoFactorSuccess;
}

export class DisableTwoFactorFailed implements Action {
  readonly type = ProfileActionTypes.disableTwoFactorFailed;
}

export class SetNewsletter implements Action {
  readonly type = ProfileActionTypes.setNewsletter;

  constructor(public payload: INewsletterData) {
  }
}

export class SetNewsletterSuccess implements Action {
  readonly type = ProfileActionTypes.setNewsletterSuccess;

  constructor(public payload: INewsletterData) {
  }
}

export class SetNewsletterFailed implements Action {
  readonly type = ProfileActionTypes.setNewsletterFiled;
}

export class UnsubscribeNewsletters implements Action {
  readonly type = ProfileActionTypes.unsubscribeNewsletters;
}

export class UnsubscribeNewslettersSuccess implements Action {
  readonly type = ProfileActionTypes.unsubscribeNewslettersSuccess;
}

export class UnsubscribeNewslettersFailed implements Action {
  readonly type = ProfileActionTypes.unsubscribeNewslettersFailed;
}

export class DeleteAccount implements Action {
  readonly type = ProfileActionTypes.deleteAccount;
}

export class DeleteAccountSuccess implements Action {
  readonly type = ProfileActionTypes.deleteAccountSuccess;
}

export class DeleteAccountFailed implements Action {
  readonly type = ProfileActionTypes.deleteAccountFailed;
}

export type ProfileActions =
  | GetProfile
  | GetProfileSuccess
  | GetProfileFailed
  | UpdateProfile
  | UpdateProfileSuccess
  | UpdateProfileFailed
  | UploadAvatar
  | UploadAvatarSuccess
  | UploadAvatarFailed
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFailed
  | EnableTwoFactor
  | EnableTwoFactorSuccess
  | EnableTwoFactorFailed
  | DisableTwoFactor
  | DisableTwoFactorSuccess
  | DisableTwoFactorFailed
  | SetNewsletter
  | SetNewsletterSuccess
  | SetNewsletterFailed
  | UnsubscribeNewsletters
  | UnsubscribeNewslettersSuccess
  | UnsubscribeNewslettersFailed
  | DeleteAccount
  | DeleteAccountSuccess
  | DeleteAccountFailed
  ;
