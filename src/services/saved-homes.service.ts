import { IListingCard } from '../interfaces/buy/listing-card.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

const baseUrl: string = 'listings';

export const getListings = (ctx: GetServerSidePropsContext): Promise<IListingCard[]> =>
  axiosWithContext(ctx).get(`${baseUrl}/favorites`)
    .then((response: AxiosResponse<IListingCard[]>) => response.data);
