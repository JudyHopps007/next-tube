import PanelLayout from '@panel/layout/PanelLayout';
import PanelHeadline from '@panel/ui/Headline';
import VideosManager from '@panel/videos';
import { NextPage } from 'next';

const PanelVideosPage: NextPage = () => {
  return (
    <PanelLayout>
      <PanelHeadline text="Manage Videos" />
      <VideosManager />
    </PanelLayout>
  );
};

export default PanelVideosPage;
