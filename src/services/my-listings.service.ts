import { axiosWithContext } from '../helpers/axios.config';
import { IListingCard } from '../interfaces/my-listings/listing-card.interface';
import { ICreateListingData } from '../interfaces/my-listings/create-listing-data.interface';
import { AxiosResponse } from 'axios';

const baseUrl: string = 'listings';

export const createListing = (createListingData: ICreateListingData): Promise<string> =>
  axiosWithContext(null).post(`${baseUrl}`, createListingData)
    .then((response: AxiosResponse<{ id: string }>) => response.data.id);

export const getMyListings = (isDraft: boolean): Promise<IListingCard[]> =>
  axiosWithContext(null).get(`${baseUrl}/my`, { params: { isDraft } })
    .then((response: AxiosResponse<IListingCard[]>) => response.data);

export const deleteListing = (id: string): Promise<any> =>
  axiosWithContext(null).delete(`${baseUrl}/${id}`);
