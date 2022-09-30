import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import { NextPage } from 'next';

const PanelVideosPage: NextPage = () => {
  return (
    <PanelLayout>
      <PanelHeadline text="Manage Videos" />
    </PanelLayout>
  );
};

export default PanelVideosPage;
