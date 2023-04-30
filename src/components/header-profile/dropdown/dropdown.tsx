import React from 'react';
import s from './dropdown.module.scss';
import TabletNav from '../tablet-nav/tablet-nav';
import MyAccount from '../my-account/my-account';
import { Auth } from '../auth/auth';
import { getAccessToken } from '../../../helpers/cookies.helpers';
import Link from 'next/link';
import { Block } from '../block/block';
import { ISavedSearch } from '../../../interfaces/saved-searches/saved-search.interface';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends WithRouterProps {
  savedSearches: ISavedSearch[]

  onOpenPopup(name: string): void

  onLogout(): void
}

const Dropdown: React.FC<IProps> = ({ savedSearches, router, onOpenPopup, onLogout }) => {
  const redirectToSavedSearch = () => {
    !savedSearches.length && router.push('/dashboard/saved-searches');
  };

  return (
    <div className={s.dropdown}>
      <TabletNav/>
      {
        getAccessToken() &&
        <>
          <Block title="Сохраненные поиски" onClick={redirectToSavedSearch}>
            {
              savedSearches?.length || true ?
                <>
                  <Link href={`/dashboard/${savedSearches[0]?.id}`}>
                    <a className={s.savedSearchItem}>{savedSearches[0]?.name}</a>
                  </Link>
                  <Link href="/dashboard/saved-searches">
                    <a className={s.savedSearchItem}>Смотреть все</a>
                  </Link>
                </>
                : null
            }
          </Block>
          <MyAccount/>
        </>
      }
      <Auth onOpenPopup={onOpenPopup} onLogout={onLogout}/>
    </div>
  );
};

export default withRouter(Dropdown);
