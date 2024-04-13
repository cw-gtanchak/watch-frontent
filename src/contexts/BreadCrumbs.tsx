import { createContext, useContext, useState } from 'react';
import { BreadCrumb, Maybe, Setter } from 'types';

type Value = [Maybe<BreadCrumb[]>, Setter<Maybe<BreadCrumb[]>>];

export const BreadCrumbsContext = createContext<Value>([undefined, () => {}]);

export function BreadCrumbsProvider({ children }: React.PropsWithChildren) {
  const value = useState<Maybe<BreadCrumb[]>>();

  return <BreadCrumbsContext.Provider value={value}>{children}</BreadCrumbsContext.Provider>;
}

export const useBreadCrumbs = () => useContext(BreadCrumbsContext);
