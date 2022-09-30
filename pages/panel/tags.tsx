import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import { NextPage } from 'next';

const PanelTagsPage: NextPage = () => {
  return (
    <PanelLayout>
      <PanelHeadline text="Manage Tags" />
    </PanelLayout>
  );
};

export default PanelTagsPage;
