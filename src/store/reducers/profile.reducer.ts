import { ProfileActions, ProfileActionTypes } from '../actions/profile.actions';
import { IProfile } from '../../interfaces/my-profile/profile.interface';
import { INewsletterData } from '../../interfaces/my-profile/newsletter-data.interface';
import { ReviewsActions, ReviewsActionTypes } from '../actions/reviews.actions';
import { IReview } from '../../interfaces/shared/review.interface';

export interface IState extends IProfile {
  isLoadData: boolean
  isLoadAvatar: boolean
  reviews: IReview[]
  myReviews: IReview[]
}

const initialState: IState = {
  name: '',
  avatar: '',
  email: '',
  phone: '',
  is2faEnabled: false,
  newsletters: [],
  rate: 0,
  isLoadData: false,
  isLoadAvatar: false,
  reviews: [],
  myReviews: [],
};

export function reducer(state: IState = initialState, actions: ProfileActions | ReviewsActions): IState {
  switch (actions.type) {
    case ProfileActionTypes.getProfileSuccess:
      return {
        ...state,
        ...actions.payload,
      };
    case ProfileActionTypes.updateProfile:
      return {
        ...state,
        isLoadData: false,
      };
    case ProfileActionTypes.updateProfileSuccess:
      return {
        ...state,
        name: actions.payload.name,
        email: actions.payload.email,
        phone: actions.payload.phone,
        isLoadData: true,
      };
    case ProfileActionTypes.uploadAvatar:
      return {
        ...state,
        isLoadAvatar: false,
      };
    case ProfileActionTypes.uploadAvatarSuccess:
      return {
        ...state,
        avatar: actions.payload,
        isLoadAvatar: true,
      };
    case ProfileActionTypes.enableTwoFactorSuccess:
      return {
        ...state,
        is2faEnabled: true,
      };
    case ProfileActionTypes.disableTwoFactorSuccess:
      return {
        ...state,
        is2faEnabled: false,
      };
    case ProfileActionTypes.setNewsletterSuccess:
      return {
        ...state,
        newsletters: setNewsletter(actions.payload, state.newsletters),
      };
    case ProfileActionTypes.unsubscribeNewslettersSuccess:
      return {
        ...state,
        newsletters: state.newsletters.map((newsletter: INewsletterData) => (
          { ...newsletter, enabled: false }
        )),
      };
    case ReviewsActionTypes.getReviewsSuccess:
      return {
        ...state,
        reviews: actions.payload,
      };
    case ReviewsActionTypes.getMyReviewsSuccess:
      return {
        ...state,
        myReviews: actions.payload,
      };
    default:
      return state;
  }
}

function setNewsletter(newsletter: INewsletterData, newsletters: INewsletterData[]): INewsletterData[] {
  if (newsletters.some((n: INewsletterData) => n.id === newsletter.id)) {
    newsletters = newsletters.map((n: INewsletterData) => {
        if (n.id === newsletter.id) {
          n = { ...n, enabled: !n.enabled };
        }
        return n;
      },
    );
  } else {
    newsletters = [...newsletters, newsletter];
  }
  return newsletters;
}
