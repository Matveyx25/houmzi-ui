import React from 'react';
import c from 'classnames/bind';
import s from './input.module.scss';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  isHideError?: boolean
  prevIcon?: string
}

interface IState {
  touched: boolean
  focused: boolean
  type: string
}

export class Input extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    type: 'text',
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      touched: false,
      focused: false,
      type: props.type,
    };
  }

  onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;

    this.setState({ focused: false });
    onBlur && onBlur(e);
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      touched: true,
      focused: true,
    });

    this.props.onChange(e);
  };

  onChangeType = () => {
    const { type } = this.state;

    this.setState({
      type: type === 'password' ? 'text' : 'password',
    });
  };

  render(): React.ReactElement {
    const { className, error, isHideError, prevIcon, children, ...inputProps } = this.props;
    const { type: propsType, value } = inputProps;
    const { touched, focused, type } = this.state;

    return (
      <div className={c(s.input__wrap, className)}>
        {
          prevIcon && <i className={c(s.input__prevIcon, prevIcon)}/>
        }
        <input
          className={c(
            s.input,
            prevIcon && s.input_prevIcon,
            propsType === 'password' && s.input_icon,
            error && touched && !focused && s.input_error,
          )}
          {...inputProps}
          type={type}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
        {
          propsType === 'password' && value &&
          <div className={s.input__rightAction} onClick={this.onChangeType}>
            {
              type === 'password'
                ? <i className="icon-visible"/>
                : <i className="icon-invisible"/>
            }
          </div>
        }
        {
          children &&
          <div className={c(s.input__rightAction, s.input__rightAction_text)}>
            {children}
          </div>
        }
        {
          !isHideError &&
          <div className={s.input__error}>
            {error && touched && !focused && error}
          </div>
        }
      </div>
    );
  }
}
