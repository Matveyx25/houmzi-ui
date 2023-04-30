import { Action } from 'redux';
import { INewsletter } from '../../interfaces/newsletters/newsletter.interface';

export enum NewsletterActionTypes {
  getNewslettersSuccess = '[NewsLetters] Get Newsletters Success',
  getNewslettersFailed = '[NewsLetters] Get Newsletters Failed',
}

export class GetNewslettersSuccess implements Action {
  readonly type = NewsletterActionTypes.getNewslettersSuccess;

  constructor(public payload: INewsletter[]) {
  }
}

export class GetNewslettersFailed implements Action {
  readonly type = NewsletterActionTypes.getNewslettersFailed;
}

export type NewsletterActions =
  | GetNewslettersSuccess
  | GetNewslettersFailed
  ;
