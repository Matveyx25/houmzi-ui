import React from 'react';
import s from './options.module.scss';
import { withTranslation, WithTranslation } from 'react-i18next';
import Link from 'next/link';
import { LayoutContext } from '../../../contexts/layout.context';

class Options extends React.Component<WithTranslation> {
  options = ['buy', 'realtor'];

  checkCountry = (link: string): string => {
    const { country } = this.context;

    if (link.includes('buy') || link.includes('rent'))
      return country ? `${country}/${link}` : '/homes';
    return link;
  };

  render(): React.ReactElement {
    const { t } = this.props;

    return (
      <section className={s.options}>
        <h2 className={s.options__title}>
          {t('options.title')}
        </h2>
        <div className={s.options__list}>
          {
            this.options.map((name: string) => (
              <Link key={name} href={`/${this.checkCountry(name)}`}>
                <a className={s.option}>
                  <img className={s.option__img} src={`/images/home/${name}.svg`} alt={name}/>
                  <div className={s.option__title}>
                    {t(`options.${name}.title`)}
                  </div>
                  <div className={s.option__description}>
                    {t(`options.${name}.desc`)}
                  </div>
                </a>
              </Link>
            ))
          }
        </div>
      </section>
    );
  }
}

Options.contextType = LayoutContext;

export default withTranslation('home')(Options);
