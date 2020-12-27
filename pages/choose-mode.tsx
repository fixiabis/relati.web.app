import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { LightBackIconUrl } from '../icons';
import { Button } from '../components';

import {
  ChooseModeLayouts,
  ChooseModeUsage,
  useRedirect,
} from '../page-components/choose-mode';

type ChooseModePageProps = { usage: ChooseModeUsage };

const ChooseModePage: NextPage<ChooseModePageProps> = ({ usage }) => {
  const router = useRouter();

  useRedirect(usage);

  const ChooseModeLayout = ChooseModeLayouts[usage];

  if (!(usage in ChooseModeLayouts)) {
    return <></>;
  }

  return (
    <div className="conatiner-filled flex-centered">
      <ChooseModeLayout usage={usage} />
      <div className="bottom-fixed flex-centered" style={{ height: 70 }}>
        <Button.Group>
          <Button
            title="返回"
            backgroundColor="#888"
            backgroundImage={`url(${LightBackIconUrl})`}
            onClick={() => router.back()}
          />
        </Button.Group>
      </div>
    </div>
  );
};

ChooseModePage.getInitialProps = ({ query }) => {
  let usage: string | string[] = query.for;

  if (Array.isArray(usage)) {
    [usage] = usage.slice(-1);
  }

  return { usage: usage as ChooseModeUsage };
};

export default ChooseModePage;
