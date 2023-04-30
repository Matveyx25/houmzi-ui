import { IListingCard } from '../interfaces/buy/listing-card.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { ISearchParams } from '../interfaces/buy/search-params.interface';
import { IListing } from '../interfaces/buy/listing.interface';
import { IOfferFormData } from '../interfaces/buy/offer-form-data.interface';

const baseUrl: string = 'listings';

export const getListings = (params: ISearchParams): Promise<{ items: IListingCard[]; total: number }> =>
  axiosWithContext(null).get(`${baseUrl}/search`, { params })
    .then((response: AxiosResponse<{ items: IListingCard[]; total: number }>) => response.data);

export const addFavorite = (id: string) =>
  axiosWithContext(null).post(`${baseUrl}/${id}/favorite`);

export const removeFavorite = (id: string) =>
  axiosWithContext(null).delete(`${baseUrl}/${id}/favorite`);

export const getListing = (id: string) =>
  axiosWithContext(null).get(`${baseUrl}/${id}`)
    .then((response: AxiosResponse<IListing>) => response.data);

export const sendOffer = (data: IOfferFormData, id: string): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/${id}/author/email`, data);
