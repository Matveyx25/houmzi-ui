import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IListingCard } from '../interfaces/buy/listing-card.interface';
import { ICity } from '../interfaces/saved-homes/city.interface';
import { GetServerSidePropsContext } from 'next';

const baseUrl: string = 'listings';

export const getCities = (ctx: GetServerSidePropsContext, country: string, type: string): Promise<ICity[]> =>
  axiosWithContext(ctx).get(`${baseUrl}/topCities`, { params: { country: country, type } })
    .then((response: AxiosResponse<ICity[]>) => response.data.slice(0, 5));

export const getListings = (ctx: GetServerSidePropsContext, country: string, type: string): Promise<IListingCard[]> =>
  axiosWithContext(ctx).get(`${baseUrl}/topListings`, { params: { country, type } })
    .then((res: AxiosResponse<IListingCard[]>) => res.data);
