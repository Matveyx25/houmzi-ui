import { IReview } from './review.interface';

export interface IReviewResponse {
  total: number
  items: IReview[]
}
