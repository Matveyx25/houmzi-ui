import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenStatic } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { ITokens } from '../interfaces/auth/tokens.interface';
import { getAccessToken, getCookie, removeCookie, setTokens } from './cookies.helpers';

export const blogUrl: string = 'https://api.rassafel.space';
export const axiosBlog: AxiosInstance = Axios.create({ baseURL: blogUrl });

let isRefreshing = false;
let refreshSubscribers: any[] = [];

export const axiosWithContext = (ctx: GetServerSidePropsContext = null): AxiosInstance & { CancelToken?: CancelTokenStatic } => {
  const axios: AxiosInstance & { CancelToken?: CancelTokenStatic } = Axios.create({ baseURL: 'https://auth.rassafel.space/'});

  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config.headers['Authorization'] && getAccessToken(ctx))
        config.headers['Authorization'] = `Bearer ${getAccessToken(ctx)}`;
      return config;
    },
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        if (!isRefreshing) {
          isRefreshing = true;
          Axios.post('https://auth.rassafel.space/auth/realms/houmzi/protocol/openid-connect/token', { client_id: 'houmzi', refresh_token: getCookie(ctx, 'refreshToken'), grand_type: 'refresh_token' },
            { headers: { Authorization: `Bearer ${getAccessToken(ctx)}` } })
            .then((response: AxiosResponse<ITokens>) => response.data)
            .then((tokens: ITokens) => {
              setTokens(ctx, tokens);
              isRefreshing = false;
              onRrefreshed(tokens.accessToken);
            })
            .catch((err) => {
              removeCookie(ctx, 'accessToken');
              removeCookie(ctx, 'refreshToken');
              return Promise.reject(err);
            });
        }

        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            resolve(Axios(originalRequest));
          });
        });
      } else {
        return Promise.reject(error);
      }
    },
  );

  function subscribeTokenRefresh(cb: any) {
    refreshSubscribers.push(cb);
  }

  function onRrefreshed(token: string) {
    refreshSubscribers.map(cb => cb(token));
  }

  return axios;
};






