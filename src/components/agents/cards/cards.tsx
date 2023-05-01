import React from 'react';
import s from './cards.module.scss';
import c from 'classnames';
import { Button } from '../../shared/button/button';
import { IAgent } from '../../../interfaces/agent.interface';
import Link from 'next/link';

interface IProps {
  total: number
  items: IAgent[]
  currentPage: number

  getAgents(currentPage: number): void
}

export const Cards: React.FC<IProps> = ({ items }) => (
  <section className={s.cards}>
    <div className={s.cards__wrap}>
      {
        items?.map((agent: IAgent) => (
          <div key={agent?.id} className={s.card}>
            <div className={s.card__wrap}>
              {
                agent?.avatar
                  ? <img src={agent?.avatar} alt="" className={s.card__avatar}/>
                  : <div className={s.card__avatar}>
                    <i className="icon-profile"/>
                  </div>
              }
              <div className={s.card__info}>
                <span className={s.card__name}>{agent?.name}</span>
                {
                  agent?.rate &&
                  <span className={s.card__rate}>
                        <i className="icon-star2"/>
                        <span className={s.card__text}>{agent?.rate}/5&nbsp;</span>
                        <span className={c(s.card__text, s.card__text_orange)}>({agent?.reviewsCount})</span>
                      </span>
                }
                {
                  agent?.phone &&
                  <span className={s.card__text}>{agent?.phone}</span>
                }
                {
                  agent?.email &&
                  <span className={s.card__text}>{agent?.email}</span>
                }
              </div>
            </div>
            <div className={s.card__mediaList}>
              {
                agent.listings?.slice(0, 5).map((listing: { avatar: string, id: string }) => (
                  <img key={listing?.id} src={listing?.avatar} alt="" className={s.card__media}/>
                ))
              }
            </div>
            <div className={s.card__buttons}>
              <Button color="blue" className={s.card__btn}>
                Contact
              </Button>
              <Link href={`/user/${agent?.id}`}>
                <Button color="blueBorder" className={s.card__btn}>
                  View profile
                </Button>
              </Link>
            </div>
          </div>
        ))
      }
    </div>
  </section>
);
