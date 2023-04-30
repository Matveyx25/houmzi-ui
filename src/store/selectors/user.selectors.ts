import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { IState } from '../reducers/user.reducers';
import { IProfile } from '../../interfaces/user/profile.interface';

const _user = (state: IRootState) => state.user;
const _profile = (state: IRootState) => _user(state).profile;

export const user = createSelector(
  _user,
  (user: IState) => ({ ...user, countReviews: user?.reviews.length }),
);

export const userName = createSelector(
  _profile,
  (profile: IProfile) => profile?.name,
);
