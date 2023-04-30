import React from 'react';
import Link, { LinkProps } from 'next/link';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';

interface IProps extends LinkProps, WithRouterProps {
  activeClassName: string
  match?: boolean
}

const ActiveLink: React.FC<IProps> = ({ activeClassName, children, ...props }) => {
  const child: React.ReactElement = React.Children.only(children) as React.ReactElement;
  const createClassName = (child: React.ReactElement) => {
    const { match, router, href } = props;
    const childClassName: string = child.props.className || '';
    const isMatch: boolean = match ? router.pathname === href : router.pathname === href;

    return isMatch
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;
  };
  const className = createClassName(child);

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default withRouter(ActiveLink);
