import React, { useEffect } from 'react';
import s from './article.module.scss';
import { Article } from '../../../src/components/blog/article/article';
import { Store } from 'redux';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { wrapper } from '../../../src/store/store';
import { getArticle, getCategory, getInterestedArticles, getNearbyArticles } from '../../../src/services/blog.service';
import { Layout } from '../../../src/containers/layout/layout-container';
import { IArticle, IArticleCardFull } from '../../../src/interfaces/blog.interfaces';
import { Interested } from '../../../src/components/blog/interested/interested';

interface IProps {
  article: IArticle
  articles: IArticleCardFull[]
  nearbyArticles: {prev: IArticleCardFull, next: IArticleCardFull}
}

const Index: React.FC<IProps> = (props) => {
  const { article, articles } = props;

  return (
    <Layout title={[article?.title, 'Article', 'Blog']}>
      <section className={s.article}>
        <div>
          <Article {...props}/>
          <Interested articles={articles}/>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async (cxt: GetServerSidePropsContext<{ id: string }> & { store: Store }) => {
    const articleId = cxt.params.id
    
    const article =  await getArticle(articleId)
    if (!article) return { redirect: { permanent: false, destination: '/blog' } };
    const articles = await getInterestedArticles(articleId);
    const nearbyArticles = await getNearbyArticles(articleId);

    return { props: { article, articles, nearbyArticles } };
  });
