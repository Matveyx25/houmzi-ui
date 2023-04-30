import { IProfile } from '../interfaces/my-profile/profile.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IUpdateProfileData } from '../interfaces/my-profile/update-profile-data.interface';
import { INewsletterData } from '../interfaces/my-profile/newsletter-data.interface';
import { GetServerSidePropsContext } from 'next';

const baseUrl: string = 'user';

export const getProfile = (ctx: GetServerSidePropsContext = null): Promise<IProfile> =>
  axiosWithContext(ctx).get(`${baseUrl}/profile`)
    .then((response: AxiosResponse<IProfile>) => response.data);

export const updateProfile = (updateProfileData: IUpdateProfileData): Promise<any> =>
  axiosWithContext(null).put(`${baseUrl}/profile`, updateProfileData);

export const uploadAvatar = (file: Blob): Promise<string> => {
  const formData = new FormData();

  formData.append('file', file);
  return axiosWithContext(null).post(`${baseUrl}/profile/avatar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((response: AxiosResponse<{ avatar: string }>) => response.data.avatar);
};

export const setNewsletter = (newsletterData: INewsletterData): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/profile/newsletters`, newsletterData);

export const unsubscribeNewsletters = (): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/profile/newsletters/unsubscribe`);
