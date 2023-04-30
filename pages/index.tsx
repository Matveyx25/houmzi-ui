import React from 'react';
import Banner from '../src/components/home/banner/banner';
import Options from '../src/components/home/options/options';
import { Layout } from '../src/containers/layout/layout-container';

const Home: React.FC = () => (
  <Layout>
    <Banner/>
    <Options/>
  </Layout>
);

export default Home;
