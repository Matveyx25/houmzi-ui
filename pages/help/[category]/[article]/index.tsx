import React from 'react';
import s from './article.module.scss';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Breadcrumbs } from '../../../../src/components/help/breadcrumbs/breadcrumbs';
import { Article } from '../../../../src/components/help/article/article';
import { ArticleList } from '../../../../src/components/help/article-list/article-list';
import { FormContainer } from '../../../../src/containers/help/form-container';
import { Layout } from '../../../../src/containers/layout/layout-container';
import { cards } from '../../../../src/data/help/category-cards.data';

interface IProps {
  category: string
  article: string
}

const Index: React.FC<IProps> = ({ category, article }) => (
  <Layout title={article}>
    <section className={s.article}>
      <Breadcrumbs category={category} article={article}/>
      <Article/>
      <div className={s.article__wrap}>
        <ArticleList {...cards[0]}/>
        <FormContainer/>
      </div>
    </section>
  </Layout>
);

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => ({
  props: {
    category: ctx.params.category,
    article: ctx.params.article,
  },
});
