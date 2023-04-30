import { INewsletter } from '../../interfaces/newsletters/newsletter.interface';
import { NewsletterActions, NewsletterActionTypes } from '../actions/newsletter.actions';

export function reducer(state: INewsletter[] = [], actions: NewsletterActions): INewsletter[] {
  if (actions.type === NewsletterActionTypes.getNewslettersSuccess)
    return [...actions.payload];
  return state;
}
