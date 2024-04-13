/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { BreadCrumbsContext } from 'contexts/BreadCrumbs';
import { BreadCrumb } from 'types';

const MAX_LENGTH = 6;

export function useBreadCrumbsRoot(breadCrumbs: BreadCrumb[]) {
  const [, setBreadCrumbs] = useContext(BreadCrumbsContext);

  useEffect(() => {
    setBreadCrumbs(breadCrumbs);
  }, []);
}

export function useBreadCrumbsChild(page: BreadCrumb, initial: BreadCrumb[]) {
  const navType = useNavigationType();
  const location = useLocation();
  const [, setBreadCrumbs] = useContext(BreadCrumbsContext);

  const fallback = useMemo(() => [...initial, page], [initial, page]);

  useEffect(() => {
    setBreadCrumbs((prev) => {
      if (page.page === 'MyProfile') {
        return [page];
      }

      if (prev && prev[prev?.length - 1]?.page === page.page) {
        return prev;
      }

      if (page.page === 'FundingActivity') {
        if (prev?.length) {
          return [...prev, page];
        }
        return [{ page: 'Library' }, { page: 'View', params: page.params }, page];
      }

      if (page?.page === 'View' || page?.page === 'SmartContract' || page.page === 'Publisher') {
        if (prev?.length) {
          if (
            prev[prev.length - 1].page === 'ViewBuilder' &&
            (page.page === 'View' || page?.page === 'SmartContract')
          ) {
            return [{ page: 'Library' }, page];
          }
          if (prev.find((el) => (el.params && el.params[0]) === (page.params && page.params[0]))) {
            const temp = [...prev];
            temp.splice(
              prev.findIndex(
                (el) => (el.params && el.params[0]) === (page.params && page.params[0])
              )
            );
            return [...temp, page];
          } else {
            return [...prev, page];
          }
        } else {
          return [{ page: 'Library' }, page];
        }
      }

      if (prev && location.state && typeof location.state.bcIndex === 'number') {
        return prev.slice(0, location.state.bcIndex + 1);
      }

      if (!prev || prev.length === MAX_LENGTH || !prev.some((p) => p.page === initial[0]?.page)) {
        return fallback;
      }

      switch (navType) {
        case 'PUSH':
          return [...prev, page];

        case 'POP':
          if (!prev.some((p) => p.page === page.page)) {
            return [...prev, page];
          } else if (prev.length >= 2) {
            return prev.slice(0, -1);
          }
          return fallback;
        case 'REPLACE':
          if (prev.length >= 1) {
            return [...prev.slice(0, -1), page];
          }
          return fallback;
      }
    });
  }, [location]);
}
