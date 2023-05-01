import React from 'react';
import s from './lang-container.module.scss';
import c from 'classnames';
import { IRootState } from '../../../store/reducers';
import { lang } from '../../../store/selectors/lang.selectors';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { LangActions, SetLanguage } from '../../../store/actions/lang.actions';
import i18n from 'i18next';
import { langs } from '../../../data/layout/langs.data';
import { ILang } from '../../../interfaces/layout/lang.interface';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  lang: string

  changeLanguage(lang: string): void
}

interface IState {
  isOpen: boolean
}

class LangContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { isOpen: false };
  }

  onSwitchLangMenu = () => {
    const { isOpen } = this.state;

    this.setState({ isOpen: !isOpen });
  };

  changeLanguage = (lang: string) => {
    const { changeLanguage } = this.props;

    changeLanguage(lang);
    i18n.changeLanguage(lang);
    this.setState({ isOpen: false });
  };

  render(): React.ReactElement {
    const { lang, t } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={s.lang__wrap}>
        <div className={c(s.lang, isOpen && s.active)} onClick={this.onSwitchLangMenu}>
          <div className={s.lang__text}>
            {t(`lang.${lang}`)}
          </div>
          <i className={c('icon-arrow', s.lang__arrow)}/>
        </div>
        <div className={c(s.lang__dropdown, isOpen && s.show)}>
          {
            langs
              .filter((l: ILang) => l.type !== lang)
              .map((l: ILang) => (
                <div
                  key={l.type}
                  className={s.lang__item}
                  onClick={() => this.changeLanguage(l.type)}
                >
                  {l.text}
                </div>
              ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  lang: lang(state),
});

const mapDispatchToProps = (dispatch: Dispatch<LangActions>) => ({
  changeLanguage: (lang: string) => dispatch(new SetLanguage(lang)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('header'),
)(LangContainer);
