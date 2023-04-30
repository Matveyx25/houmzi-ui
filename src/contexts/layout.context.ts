import React from 'react';

export interface ILayoutContext {
  windowWidth: number
  country: string
}

export const LayoutContext = React.createContext<ILayoutContext>(null);
