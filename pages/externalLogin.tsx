import { FC } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../src/store/store';
import { Store } from 'redux';
import { getCookie, removeCookie, setTokens } from '../src/helpers/cookies.helpers';
import { ITokens } from '../src/interfaces/auth/tokens.interface';

const ExternalLogin: FC = () => {
  return null;
};

export default ExternalLogin;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (cxt: GetServerSidePropsContext & { store: Store }) => {
    const tokens: ITokens = cxt.query as unknown as ITokens;
    const redirectLink: string = getCookie(cxt, 'beforeSocAuth');

    removeCookie(cxt, 'beforeSocAuth');
    setTokens(cxt, tokens);
    return { redirect: { permanent: false, destination: redirectLink } };
  });
