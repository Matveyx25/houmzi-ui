import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IListingConfig } from '../interfaces/edit-listing/listing-config.interface';
import { IMedia } from '../interfaces/edit-listing/media.interface';
import { GetServerSidePropsContext } from 'next';

const baseUrl: string = 'listings';

export const getConfig = (ctx: GetServerSidePropsContext): Promise<IListingConfig> =>
  axiosWithContext(ctx).get('config', { params: { key: 'dropdowns' } })
    .then((response: AxiosResponse<IListingConfig>) => response.data);

export const getListing = (ctx: GetServerSidePropsContext, id: string): Promise<any> =>
  axiosWithContext(ctx).get(`${baseUrl}/edit/${id}`)
    .then((response: AxiosResponse) => response.data);

export const updateListing = (id: string, data: any): Promise<any> =>
  axiosWithContext(null).put(`${baseUrl}/edit/${id}`, data);

export const addMedia = (id: string, file: FormData): Promise<IMedia> =>
  axiosWithContext(null).post(`${baseUrl}/${id}/media`, file,
    { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response: AxiosResponse<IMedia>) => response.data);

export const deleteMedia = (id: string, fileId: string): Promise<any> =>
  axiosWithContext(null).delete(`${baseUrl}/${id}/media/${fileId}`);

