import { INewsletter } from '../interfaces/newsletters/newsletter.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';

export const getNewsletters = (ctx: GetServerSidePropsContext): Promise<INewsletter[]> =>
  axiosWithContext(ctx).get('/newsletters')
    .then((response: AxiosResponse<INewsletter[]>) => response.data);
