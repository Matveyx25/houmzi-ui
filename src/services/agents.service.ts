import { axiosWithContext } from '../helpers/axios.config';
import { AxiosResponse } from 'axios';
import { IAgentsResponse } from '../interfaces/agents-response.interface';
import { GetServerSidePropsContext } from 'next';

export const getAgents = (ctx: GetServerSidePropsContext = null, page: number = 0, limit: number = 10): Promise<IAgentsResponse> =>
  axiosWithContext(ctx).get('/agents', { params: { page, limit } })
    .then((res: AxiosResponse<IAgentsResponse>) => res.data);
