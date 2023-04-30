import { createSelector } from 'reselect';
import { IProfile } from '../../interfaces/my-profile/profile.interface';
import { IRootState } from '../reducers';

const _profile = (state: IRootState) => state.profile;
const _isLoadData = (state: IRootState) => _profile(state).isLoadData;
const _isLoadAvatar = (state: IRootState) => _profile(state).isLoadAvatar;
const _is2faEnabled = (state: IRootState) => _profile(state).is2faEnabled;

export const profile = createSelector(
  _profile,
  (profile: IProfile) => ({
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    avatar: profile.avatar,
    rate: profile.rate,
  }),
);

export const isLoadData = createSelector(
  _isLoadData,
  (isLoadData: boolean) => isLoadData,
);

export const isLoadAvatar = createSelector(
  _isLoadAvatar,
  (isLoadAvatar: boolean) => isLoadAvatar,
);

export const is2faEnabled = createSelector(
  _is2faEnabled,
  (is2faEnabled: boolean) => is2faEnabled,
);
