import AddTagsSection from '@panel/content/AddTagsSection';
import PanelHeadline from '@panel/ui/Headline';
import React from 'react';
import { NextPageWithLayout } from 'types/types';
import { getPanelLayout } from 'utils/layout';

type Props = {};

const PanelAddTags: NextPageWithLayout<Props> = ({}) => {
  return (
    <>
      <PanelHeadline text="Add Tags" />
      <AddTagsSection />
    </>
  );
};

PanelAddTags.getLayout = getPanelLayout;

export default PanelAddTags;
