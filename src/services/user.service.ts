import { IProfile } from '../interfaces/user/profile.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IReview } from '../interfaces/shared/review.interface';
import { IAddReviewData } from '../interfaces/user/add-review-data.interface';
import { IReviewResponse } from '../interfaces/shared/review-response.interface';

const baseUrl: string = 'user';

export const getProfile = (id: string): Promise<IProfile> =>
  axiosWithContext(null).get(`${baseUrl}/${id}`)
    .then((res: AxiosResponse<IProfile>) => res.data);

export const getReviews = (id: string, page: number = 0, limit: number = 10): Promise<IReviewResponse> =>
  axiosWithContext(null).get(`${baseUrl}/${id}/reviews`, { params: { page, limit } })
    .then((res: AxiosResponse<IReviewResponse>) => res.data,
    );

export const addReview = (addReviewData: IAddReviewData): Promise<IReview> =>
  axiosWithContext(null).post('reviews', addReviewData)
    .then((res: AxiosResponse<IReview>) => res.data);
