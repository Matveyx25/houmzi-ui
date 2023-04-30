import { combineEpics } from 'redux-observable';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import {
  ChangePassword,
  ChangePasswordFailed,
  ChangePasswordSuccess,
  GetProfile,
  GetProfileFailed, GetProfileSuccess,
  ProfileActionTypes,
  SetNewsletter,
  SetNewsletterFailed,
  SetNewsletterSuccess,
  UnsubscribeNewsletters,
  UnsubscribeNewslettersFailed,
  UnsubscribeNewslettersSuccess,
  UpdateProfile,
  UpdateProfileFailed,
  UpdateProfileSuccess,
  UploadAvatar,
  UploadAvatarFailed,
  UploadAvatarSuccess,
} from '../actions/profile.actions';
import {
  getProfile,
  setNewsletter,
  unsubscribeNewsletters,
  updateProfile,
  uploadAvatar,
} from '../../services/my-profile.service';
import { IErrorResponse } from '../../interfaces/auth/error-response.interface';
import {
  GetMyReviews,
  GetMyReviewsFailed, GetMyReviewsSuccess, GetReviews,
  GetReviewsFailed, GetReviewsSuccess,
  ReviewsActionTypes,
} from '../actions/reviews.actions';
import { IChangePasswordData } from '../../interfaces/settings/change-password-data.interface';
import { INewsletterData } from '../../interfaces/my-profile/newsletter-data.interface';
import { IReview } from '../../interfaces/shared/review.interface';
import { mergeMap, pluck } from 'rxjs/operators';
import { getMyReviews, getReviews } from '../../services/my-reviews.service';
import { IUpdateProfileData } from '../../interfaces/my-profile/update-profile-data.interface';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IProfile } from '../../interfaces/my-profile/profile.interface';
import { changePassword } from '../../services/settings.service';

export const getProfileEpic = (action$: Observable<GetProfile>) => action$.pipe(
  ofType<GetProfile>(ProfileActionTypes.getProfile),
  mergeMap(() =>
    getProfile()
      .then((profile: IProfile) => new GetProfileSuccess(profile))
      .catch(() => new GetProfileFailed()),
  ),
);

export const updateProfileEpic = (action$: Observable<UpdateProfile>) => action$.pipe(
  ofType<UpdateProfile>(ProfileActionTypes.updateProfile),
  pluck('payload'),
  mergeMap((updateProfileData: IUpdateProfileData) =>
    updateProfile(updateProfileData)
      .then(() => {
        toast.success('Updating profile is success');
        return new UpdateProfileSuccess(updateProfileData);
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        toast.error(error.response?.data.message || error.message);
        return new UpdateProfileFailed();
      }),
  ),
);

export const uploadAvatarEpic = (action$: Observable<UploadAvatar>) => action$.pipe(
  ofType<UploadAvatar>(ProfileActionTypes.uploadAvatar),
  pluck('payload'),
  mergeMap((file: Blob) =>
    uploadAvatar(file)
      .then((avatar: string) => {
        toast.success('Updating profile is success');
        return new UploadAvatarSuccess(avatar);
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        toast.error(error.response?.data.message || error.message);
        return new UploadAvatarFailed();
      }),
  ),
);

export const changePasswordEpic = (action$: Observable<ChangePassword>) => action$.pipe(
  ofType<ChangePassword>(ProfileActionTypes.changePassword),
  pluck('payload'),
  mergeMap((changePasswordData: IChangePasswordData) =>
    changePassword(changePasswordData)
      .then(() => {
        toast.success('Password is changed');
        return new ChangePasswordSuccess();
      })
      .catch((error: AxiosError<IErrorResponse>) => {
        toast.error(error.response?.data.message || error.message);
        return new ChangePasswordFailed();
      }),
  ),
);
//
// export const enableTwoFactorEpic = (action$: Observable<EnableTwoFactor>) => action$.pipe(
//   ofType<EnableTwoFactor>(ProfileActionTypes.enableTwoFactor),
//   pluck('payload'),
//   mergeMap((phone: string) =>
//     enableTwoFactor(phone)
//       .then(() => {
//         toast.success('Enabled two factor authentication');
//         return new EnableTwoFactorSuccess();
//       })
//       .catch((error: AxiosError<IErrorResponse>) => {
//         toast.error(error.response?.data.message || error.message);
//         return new EnableTwoFactorFailed();
//       }),
//   ),
// );
//
// export const disableTwoFactorEpic = (action$: Observable<DisableTwoFactor>) => action$.pipe(
//   ofType<DisableTwoFactor>(ProfileActionTypes.disableTwoFactor),
//   mergeMap(() =>
//     disableTwoFactor()
//       .then(() => {
//         toast.success('Disabled two factor authentication');
//         return new DisableTwoFactorSuccess()
//       })
//       .catch((error: AxiosError<IErrorResponse>) => {
//         toast.error(error.response?.data.message || error.message);
//         return new DisableTwoFactorFailed()
//       }),
//   ),
// );

export const setNewsletterEpic = (action$: Observable<SetNewsletter>) => action$.pipe(
  ofType<SetNewsletter>(ProfileActionTypes.setNewsletter),
  pluck('payload'),
  mergeMap((newsletterData: INewsletterData) =>
    setNewsletter(newsletterData)
      .then(() => new SetNewsletterSuccess(newsletterData))
      .catch(() => new SetNewsletterFailed()),
  ),
);

export const unsubscribeNewsletterEpic = (action$: Observable<UnsubscribeNewsletters>) => action$.pipe(
  ofType<UnsubscribeNewsletters>(ProfileActionTypes.unsubscribeNewsletters),
  mergeMap(() =>
    unsubscribeNewsletters()
      .then(() => new UnsubscribeNewslettersSuccess())
      .catch(() => new UnsubscribeNewslettersFailed()),
  ),
);

// export const deleteAccountEpic = (action$: Observable<DeleteAccount>) => action$.pipe(
//   ofType<DeleteAccount>(ProfileActionTypes.deleteAccount),
//   // mergeMap(() =>
//     // deleteAccount()
//     //   .then(() => new LogoutSuccess())
//     //   .catch(() => new DeleteAccountFailed()),
//   ),
// );

export const getReviewsEpic = (action$: Observable<GetReviews>) => action$.pipe(
  ofType<GetReviews>(ReviewsActionTypes.getReviews),
  mergeMap(() =>
    getReviews()
      .then((reviews: IReview[]) => new GetReviewsSuccess(reviews))
      .catch(() => new GetReviewsFailed()),
  ),
);

export const getMyReviewsEpic = (action$: Observable<GetMyReviews>) => action$.pipe(
  ofType<GetMyReviews>(ReviewsActionTypes.getMyReviews),
  mergeMap(() =>
    getMyReviews()
      .then((reviews: IReview[]) => new GetMyReviewsSuccess(reviews))
      .catch(() => new GetMyReviewsFailed()),
  ),
);

export const myProfileEpics = combineEpics(
  getProfileEpic,
  updateProfileEpic,
  uploadAvatarEpic,
  changePasswordEpic,
  // enableTwoFactorEpic,
  // disableTwoFactorEpic,
  setNewsletterEpic,
  unsubscribeNewsletterEpic,
  getReviewsEpic,
  getMyReviewsEpic,
  // deleteAccountEpic,
);
