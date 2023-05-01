import React from 'react';
import s from './blog.module.scss';
import { Banner } from '../../src/components/blog/banner/banner';
import { News } from '../../src/components/blog/news/news';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../src/store/store';
import { getArticles, getAuthors, getCategories } from '../../src/services/blog.service';
import { Layout } from '../../src/containers/layout/layout-container';
import { IArticleCard, IAuthor, ICategory } from '../../src/interfaces/blog.interfaces';

interface IProps {
  articles: IArticleCard[]
  categories: ICategory[]
  authors: IAuthor[]
}

const Blog: React.FC<IProps> = ({ articles, categories, authors }) => (
  <Layout title="Blog">
    <section className={s.blog}>
      <Banner articles={articles}/>
      <News categories={categories} authors={authors}/>
    </section>
  </Layout>
);

export default Blog;

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  async () => {
    const articles: IArticleCard[] = await getArticles();
    const categories: ICategory[] = await getCategories();
    const authors: IAuthor[] = null;

    console.log(categories[0].articles);
    
    
    return { props: { articles, categories, authors } };
  });
