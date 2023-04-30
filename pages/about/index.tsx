import React from 'react';
import s from './about.module.scss';
import { Banner } from '../../src/components/about/banner/banner';
import { FormContainer } from '../../src/containers/about/form-container';
import { Contacts } from '../../src/components/about/contacts/contacts';
import { Layout } from '../../src/containers/layout/layout-container';

const About: React.FC = () => (
  <Layout title="About us">
    <Banner/>
    <section className={s.wrap}>
      <FormContainer/>
      <Contacts/>
    </section>
  </Layout>
);

export default About;
