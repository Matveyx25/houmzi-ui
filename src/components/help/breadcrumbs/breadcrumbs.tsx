import React from 'react';
import s from './breadcrumbs.module.scss';
import Link from 'next/link';

interface IProps {
  category: string
  article?: string
}

const baseUrl: string = '/help';

export const Breadcrumbs: React.FC<IProps> = ({ category, article }) => (
  <div className={s.breadcrumbs}>
    <Link href={baseUrl}>
      <a className={s.breadcrumbs__link}>
        Help
      </a>
    </Link>
    <i className="icon-arrow"/>
    {
      article
        ? <Link href={`${baseUrl}/${category}`}>
          <a className={s.breadcrumbs__link}>
            {category}
          </a>
        </Link>
        : <span>{category}</span>
    }
    {
      article &&
      <>
        <i className="icon-arrow"/>
        <span>{article}</span>
      </>
    }
  </div>
);
