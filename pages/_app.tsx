import React from 'react';
import '../styles/globals.scss';
import { AppProps } from 'next/app';
import { wrapper } from '../src/store/store';
import '../localisation/i18n';
import 'swiper/css/swiper.min.css';
import '../styles/quill.snow.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps}/>
);

export default wrapper.withRedux(App);
