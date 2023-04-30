import React from 'react';
import s from '../forgot-password.module.scss';
import { Input } from '../../../shared/input/input';
import { Button } from '../../../shared/button/button';
import { Timer } from '../timer/timer';
import { WithTranslation, withTranslation } from 'react-i18next';

interface IProps extends WithTranslation {
  onCheckCode(code: string): void
}

interface IState {
  code: string
  codeError: string
}

class Step2 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { code: '', codeError: '' };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: code } = e.currentTarget;

    this.setState({ code });
    this.validateField(code);
  };

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { onCheckCode } = this.props;
    const { code } = this.state;

    onCheckCode(code);
    e.preventDefault();
  };

  validateField = (value: string) => {
    const codeError = value.trim().length === 6
      ? 'Code is invalid'
      : '';
    this.setState({ codeError });
  };

  render(): React.ReactElement {
    const { t } = this.props;
    const { code, codeError } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className={s.subtitle}>
          {t('step2.subtitle')}
        </div>
        <Input
          name="code"
          value={code}
          placeholder={t('step2.code')}
          error={codeError}
          onChange={this.onChange}
        />
        <Timer/>
        <Button color="blue" full disabled={!codeError}>
          {t('step2.btn')}
        </Button>
      </form>
    );
  }
}

export default withTranslation('forgot')(Step2);
