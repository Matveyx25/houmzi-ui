import React from 'react';
import s from './article-card.module.scss';
import Link from 'next/link';

class ArticleCard extends React.Component {
  img: string = 'https://c1.staticflickr.com/5/4800/26818171938_e598f8b311_z.jpg';

  render(): React.ReactElement {
    return (
      <div className={s.card}>
        <Link href='/blog/article'>
          <img src={this.img} alt="" className={s.card__img}/>
        </Link>
        <Link href='/blog/article'>
          <div className={s.card__title}>
            How to Actually Afford to Buy a Home in America
          </div>
        </Link>
        <div className={s.card__author}>
          <span>by</span> Susan Kelleher
        </div>
        <div className={s.card__date}>
          26 Jun 2019
        </div>
      </div>
    );
  }
}

export default ArticleCard;
