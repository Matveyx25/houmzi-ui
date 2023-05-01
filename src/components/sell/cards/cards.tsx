import React from 'react';
import s from './cards.module.scss';
import c from 'classnames';
import { Button } from '../../shared/button/button';
import { cards } from '../../../data/sell/cards.data';
import { ICard } from '../../../interfaces/sell/card.interface';
import Link from 'next/link';
import { getAccessToken } from '../../../helpers/cookies.helpers';

interface IProps {
  openPopup(): void
}

export const Cards: React.FC<IProps> = ({ openPopup }) => (
  <section className={s.cards}>
    {
      cards.map((card: ICard) => (
        <div key={card.title} className={s.card}>
          <img src={card.img} alt="" className={s.card__img}/>
          <div className={s.card__wrap}>
            <span className={s.card__title}>
              {card.title}
            </span>
            <span className={s.card__text}>
              {card.text}
              <span className={c(s.card__text, s.card__text_link)}>
                {card.link}
              </span>.
            </span>
            {
              card.desc &&
              <span className={c(s.card__text, s.card__text_desc)}>
                {card.desc}
              </span>
            }
            {
              card.btn.link === '/agents'
                ? <Link href={card.btn.link}>
                  <Button color="blue" className={s.card__btn}>
                    {card.btn.text}
                  </Button>
                </Link>
                : getAccessToken()
                ? <Link href={card.btn.link}>
                  <Button color="blue" className={s.card__btn}>
                    {card.btn.text}
                  </Button>
                </Link>
                : <Button color="blue" className={s.card__btn} onClick={openPopup}>
                  {card.btn.text}
                </Button>
            }
          </div>
        </div>
      ))
    }
  </section>
);
