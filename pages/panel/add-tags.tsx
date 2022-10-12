import AddTagsSection from '@panel/content/AddTagsSection';
import PanelLayout from '@panel/layout/PanelLayout';
import LabelCheckbox from '@panel/ui/Checkbox';
import DropDown from '@panel/ui/Dropdown';
import PanelHeadline from '@panel/ui/Headline';
import { TAG_ROLES_DROPDOWN } from 'constants/panel';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

type Props = {};

const PanelAddTags: NextPage<Props> = ({}) => {
  return (
    <PanelLayout>
      <PanelHeadline text="Add Tags" />
      <AddTagsSection />
    </PanelLayout>
  );
};

export default PanelAddTags;
