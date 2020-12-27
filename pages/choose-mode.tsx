import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  ChooseModeLayouts,
  ChooseModeUsage,
  useRedirectOnChoosed,
} from '../page-components/choose-mode';

type ChooseModePageProps = { usage: ChooseModeUsage };

const ChooseModePage: NextPage<ChooseModePageProps> = ({ usage }) => {
  const router = useRouter();

  useRedirectOnChoosed(usage);

  const ChooseModeLayout = ChooseModeLayouts[usage];

  if (!(usage in ChooseModeLayouts)) {
    return <></>;
  }

  return <ChooseModeLayout usage={usage} onCancel={() => router.back()} />;
};

ChooseModePage.getInitialProps = ({ query }) => {
  let usage: string | string[] = query.for;

  if (Array.isArray(usage)) {
    [usage] = usage.slice(-1);
  }

  return { usage: usage as ChooseModeUsage };
};

export default ChooseModePage;
