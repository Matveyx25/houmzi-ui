import React from 'react';
import s from './not-found.module.scss';
import Info from '../../src/components/not-found/info/info';
import { Listings } from '../../src/components/not-found/listings/listings';
import { Layout } from '../../src/containers/layout/layout-container';

const NotFound: React.FC = () => (
  <Layout title="Not Found">
    <section className={s.notFound}>
      <img src="/images/not-found.svg" alt="Not found image" className={s.notFound__img}/>
      <div className={s.notFound__wrap}>
        <Info/>
        <Listings/>
      </div>
    </section>
  </Layout>
);

export default NotFound;
