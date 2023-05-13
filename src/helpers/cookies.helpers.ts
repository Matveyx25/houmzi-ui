import { GetServerSidePropsContext } from 'next';
import { ITokens } from '../interfaces/auth/tokens.interface';
import nookies from 'nookies';

export const setCookie = (
  ctx: GetServerSidePropsContext = null,
  key: string,
  value: string,
  options: any = {},
) => {
  nookies.set(ctx, key, value,
    {
      path: '/',
      ...options,
    });
};

export const removeCookie = (
  ctx: GetServerSidePropsContext = null,
  key: string,
  options: any = {},
): void => {
  nookies.destroy(ctx, key, {
    path: '/',
    ...options,
  });
};

export const getCookie = (ctx: GetServerSidePropsContext = null, key: string): string =>
  nookies.get(ctx)[key];

export const getAccessToken = (ctx: GetServerSidePropsContext = null): string =>
  getCookie(ctx, 'accessToken');

export const setTokens = (ctx: GetServerSidePropsContext = null, {
  access_token,
  refresh_token,
}: ITokens, rememberMe?: boolean) => {
  const options = { maxAge: 6 * 24 * 60 * 60 };

  setCookie(ctx, 'accessToken', access_token, rememberMe && options);
  setCookie(ctx, 'refreshToken', refresh_token, rememberMe && options);
};

export const removeTokens = (ctx: GetServerSidePropsContext = null) => {
  removeCookie(ctx, 'accessToken');
  removeCookie(ctx, 'refreshToken');
};
