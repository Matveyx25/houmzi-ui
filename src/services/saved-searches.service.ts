import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { ISavedSearch } from '../interfaces/saved-searches/saved-search.interface';
import { ISaveSearchParams } from '../interfaces/buy/save-search-params.interface';
import { GetServerSidePropsContext } from 'next';

const baseUrl: string = 'listings/search';

export const saveSearch = (params: ISaveSearchParams): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/save`, { ...params });

export const getSavedSearches = (ctx: GetServerSidePropsContext = null): Promise<ISavedSearch[]> =>
  axiosWithContext(ctx).get(`${baseUrl}/list`)
    .then((response: AxiosResponse<ISavedSearch[]>) => response.data);

export const renameSavedSearch = ({ id, name }): Promise<any> =>
  axiosWithContext(null).put(`${baseUrl}/${id}`, { name });

export const deleteSavedSearch = (id: string): Promise<any> =>
  axiosWithContext(null).delete(`${baseUrl}/${id}`);
