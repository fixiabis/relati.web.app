import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  ChooseModeLayouts,
  ChooseModeUsage,
  useRedirectOnChoosedOrNotFound,
} from '../components/page/choose-mode';

type ChooseModePageProps = { usage: string };

const ChooseModePage: NextPage<ChooseModePageProps> = ({ usage }) => {
  const router = useRouter();

  useRedirectOnChoosedOrNotFound(usage);

  if (!(usage in ChooseModeLayouts)) {
    return <></>;
  }

  const ChooseModeLayout = ChooseModeLayouts[usage as ChooseModeUsage];

  return <ChooseModeLayout usage={usage} onCancel={() => router.back()} />;
};

ChooseModePage.getInitialProps = ({ query }) => {
  let usage: string | string[] = query.for || '';

  if (Array.isArray(usage)) {
    [usage] = usage.slice(-1);
  }

  return { usage };
};

export default ChooseModePage;
