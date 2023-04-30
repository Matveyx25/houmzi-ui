import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IReview } from '../interfaces/shared/review.interface';

const baseUrl = 'reviews';

export const getReviews = (): Promise<IReview[]> =>
  axiosWithContext(null).get(`${baseUrl}`)
    .then((response: AxiosResponse<IReview[]>) => response.data);


export const getMyReviews = (): Promise<IReview[]> =>
  axiosWithContext(null).get(`${baseUrl}/sent`)
    .then((response: AxiosResponse<IReview[]>) => response.data);
