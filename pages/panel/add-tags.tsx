import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import { NextPage } from 'next';
import React from 'react';

type Props = {};

const PanelAddTags: NextPage<Props> = ({}) => {
  return (
    <PanelLayout>
      <PanelHeadline text="Add Tags" />
    </PanelLayout>
  );
};

export default PanelAddTags;
