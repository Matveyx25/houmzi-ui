import React from 'react';
import s from './news.module.scss';
import { Filters } from '../filters/filters';
import { IArticleCardFull, IAuthor, ICategory } from '../../../interfaces/blog.interfaces';
import { Card } from '../card/card';

interface IProps {
  categories: ICategory[]
  authors: IAuthor[]
}

interface IState {
  categoryId: string
}

export class News extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = { categoryId: null };
  }

  changeCategoryId = (categoryId: string) => {
    this.setState({ categoryId });
  };

  getArticles = () => {
    const { categories, authors } = this.props;
    const { categoryId } = this.state;

    if (!categories) return null;

    const category: ICategory = categories.find((category: ICategory) => category.id === categoryId);
    let renderedArticles: IArticleCardFull[] = category
      ? category.articles
      : categories
        .reduce((accumulator: IArticleCardFull[], currentValue: ICategory) => [...accumulator, ...currentValue.articles], [])
        // .filter((article: IArticleCardFull, i: number, arr: IArticleCardFull[]) =>
        //   i === arr.findIndex((a: IArticleCardFull) => article.id === a.id));

    return renderedArticles
      .map((article: IArticleCardFull) => <Card key={article.id} article={article} authors={authors}/>);
  };

  render() {
    const { categories } = this.props;
    const { categoryId } = this.state;

    return (
      <div className={s.news}>
        <h2 className={s.news__title}>
          Новости
        </h2>
        <Filters categories={categories} categoryId={categoryId} changeCategoryId={this.changeCategoryId}/>
        <div className={s.news__list}>
          {this.getArticles()}
        </div>
      </div>
    );
  }
}
