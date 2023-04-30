import React from 'react';
import s from './rename.module.scss';
import { Input } from '../../shared/input/input';
import { Button } from '../../shared/button/button';

interface IProps {
  name: string

  onRename(name: string): void
}

interface IState {
  name: string
}

export class Rename extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { name: 'Text search' };
  }

  componentDidMount() {
    const { name } = this.props;

    if (name?.trim()) this.setState({ name });
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: name } = e.currentTarget;

    this.setState({ name });
  };

  onSubmit = (e: React.FormEvent) => {
    this.props.onRename(this.state.name);
    e.preventDefault();
  };

  render(): React.ReactElement {
    const { name } = this.state;

    return (
      <form className={s.rename} onSubmit={this.onSubmit}>
        <Input
          className={s.rename__input}
          value={name}
          placeholder="New Search Name"
          onChange={this.onChange}
        />
        <Button color="blue">Save</Button>
      </form>
    );
  }
}
