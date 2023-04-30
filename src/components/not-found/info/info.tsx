import React from 'react';
import s from './info.module.scss';
import { Button } from '../../shared/button/button';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Popup } from '../../shared/popup/popup';
import { ReportingPopup } from '../reporting-popup/reporting-popup';

interface IState {
  isOpenPopup: boolean
}

class Info extends React.Component<WithTranslation, IState> {
  constructor(props: WithTranslation) {
    super(props);

    this.state = { isOpenPopup: false };
  }

  switchPopup = () => {
    const { isOpenPopup } = this.state;

    this.setState({ isOpenPopup: !isOpenPopup });
  };

  render(): React.ReactElement {
    const { t } = this.props;
    const { isOpenPopup } = this.state;

    return (
      <div className={s.info}>
        <div className={s.info__wrap}>
          <div className={s.info__title}>
            {t('title')}
          </div>
          <div className={s.info__subtitle}>
            {t('subtitle')}
          </div>
        </div>
        <Button className={s.info__btn} color="blue" onClick={this.switchPopup}>
          {t('btn')}
        </Button>

        <Popup visible={isOpenPopup} title="Thanks for reporting the bug!" width={60} onClose={this.switchPopup}>
          <ReportingPopup closePopup={this.switchPopup}/>
        </Popup>
      </div>
    );
  }
}

export default withTranslation('notFound')(Info);
