import React from 'react';
import s from './help.module.scss';
import { Banner } from '../../src/components/help/banner/banner';
import { Cards } from '../../src/components/help/cards/cards';
import { FormContainer } from '../../src/containers/help/form-container';
import { Layout } from '../../src/containers/layout/layout-container';

const Help: React.FC = () => (
  <Layout title="Help">
    <section className={s.help}>
      <Cards/>
      <FormContainer/>
    </section>
  </Layout>
);

export default Help;
