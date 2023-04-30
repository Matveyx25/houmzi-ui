import { IRootState } from '../reducers';
import { createSelector } from 'reselect';
import { INewsletter } from '../../interfaces/newsletters/newsletter.interface';
import { INewsletterData } from '../../interfaces/my-profile/newsletter-data.interface';

const _newsletters = (state: IRootState) => state.newsletters;
const _profile = (state: IRootState) => state.profile;
const _profileNewsletters = (state: IRootState) => _profile(state).newsletters;

export const newsletters = createSelector(
  [_newsletters, _profileNewsletters],
  (newsletters: INewsletter[], profileNewsletters: INewsletterData[]) => {
    return newsletters.map((newsletter: INewsletter) => {
      newsletter.isEnable = profileNewsletters
        .find((profileNewsletter: INewsletterData) => profileNewsletter.id === newsletter.id)?.enabled || false;
      return newsletter;
    });
  },
);
