import { NextPage } from 'next';
import Router from 'next/dist/next-server/lib/router/router';
import { ParsedUrlQuery } from 'querystring';

function InitializePageProps<T>(Component: NextPage<T>) {
  return (toProps: (query: ParsedUrlQuery) => T) => ({
    router,
  }: {
    router: Router;
  }) => <Component {...toProps(router.query)} />;
}

export default InitializePageProps;
