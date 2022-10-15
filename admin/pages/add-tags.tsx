import AddTagsSection from 'components/content/AddTagsSection';
import PanelHeadline from '@ui/Headline';
import React from 'react';
import { NextPage } from 'next';

type Props = {};

const AddTags: NextPage<Props> = ({}) => {
  return (
    <>
      <PanelHeadline text="Add Tags" />
      <AddTagsSection />
    </>
  );
};

export default AddTags;
