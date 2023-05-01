import React from 'react';
import s from './technical-work.module.scss';
import c from 'classnames';
import { Button } from '../../src/components/shared/button/button';
import Link from 'next/link';
import { Layout } from '../../src/containers/layout/layout-container';

const TechnicalWork: React.FC = () => (
  <Layout title="Technical work" hideLayout>
    <section className={s.technicalWork}>
      <img src="/images/technical-work.svg" alt="Not found image" className={s.technicalWork__img}/>
      <div className={s.info}>
        <div className={s.info__wrap}>
          <h1 className={s.info__title}>
            Извините
          </h1>
          <p className={s.info__subtitle}>
            На сайте ведутся технические работы.
            <br/>
            Повторите попытку через 15 минут.
          </p>
          <p className={c(s.info__subtitle, s.info__subtitle_grey)}>
          Выверяем планировки, меняем крышу, ремонтируем лестницу...
          </p>
        </div>
        <Link href="/">
          <Button className={s.info__btn} color="blue">
            На главную
          </Button>
        </Link>
      </div>
    </section>
  </Layout>
);

export default TechnicalWork;
