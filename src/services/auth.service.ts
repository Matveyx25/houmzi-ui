import { AxiosResponse } from 'axios';
import { IRegisterData } from '../interfaces/auth/register-data.interface';
import { ITokens } from '../interfaces/auth/tokens.interface';
import { axiosWithContext } from '../helpers/axios.config';
import { GetServerSidePropsContext } from 'next';
import { getCookie, removeTokens } from '../helpers/cookies.helpers';
import querystring from 'querystring'

const baseUrl: string = '/auth';

export const register = (registerData: IRegisterData): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/register`, registerData);

export const login = (params): Promise<ITokens> =>
  axiosWithContext(null).post(`${baseUrl}/realms/houmzi/protocol/openid-connect/token`, 
  querystring.stringify(params),
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
    .then((response: AxiosResponse<ITokens>) => response.data);

export const confirm = (token: string): Promise<ITokens> =>
  axiosWithContext(null).get(`${baseUrl}/confirm`, { params: { token } })
    .then((response: AxiosResponse<ITokens>) => response.data);

export const logout = (ctx: GetServerSidePropsContext = null, logoutAll: boolean = false): Promise<any> =>
  axiosWithContext(ctx).post(`${baseUrl}/realms/houmzi/protocol/openid-connect/logout`, 
    querystring.stringify(
      {'refresh_token': getCookie(ctx, 'refreshToken'),
      'client_id': 'houmzi'}),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }}).finally(() => removeTokens(ctx));

export const forgotPassword = (email: string): Promise<string> =>
  axiosWithContext(null).get(`${baseUrl}/password/forgot`, { params: { email } })
    .then((response: AxiosResponse<{ token: string }>) => response.data.token);

export const checkCode = (code: string, token: string): Promise<string> =>
  axiosWithContext(null).post(`${baseUrl}/password/check-code`, { code, token })
    .then((response: AxiosResponse<{ token: string }>) => response.data.token);

export const changePassword = (password: string, token: string): Promise<any> =>
  axiosWithContext(null).post(`${baseUrl}/password/reset`, { password, token });
