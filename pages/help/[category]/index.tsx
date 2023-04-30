import React from 'react';
import s from './category.module.scss';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Breadcrumbs } from '../../../src/components/help/breadcrumbs/breadcrumbs';
import { Category } from '../../../src/components/help/category/category';
import { Layout } from '../../../src/containers/layout/layout-container';

interface IProps {
  category: string
}

const Index: React.FC<IProps> = ({ category }) => (
  <Layout title={category}>
    <section className={s.article}>
      <Breadcrumbs category={category}/>
      <Category/>
    </section>
  </Layout>
);

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: {
    category: ctx.params.category,
  },
});
