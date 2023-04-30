import React from 'react';
import s from './city.module.scss';
import Link from 'next/link';

const imageDefault: string = 'data:image/jpeg;base64,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';

interface IProps {
  name: string
  image: string
  listingsCount: number
}

export const City: React.FC<IProps> = ({ name, image, listingsCount }) => (
  <Link href={`/homes/${name}`}>
    <div className={s.city}>
      <img className={s.city__img} src={image || imageDefault} alt=""/>
      <div className={s.city__desc}>
        <div className={s.city__name}>
          {name}
        </div>
        <div className={s.city__count}>
          {listingsCount} {`listing${listingsCount !== 1 ? 's' : ''}`}
        </div>
      </div>
    </div>
  </Link>
);
