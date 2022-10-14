import { NextPageWithLayout } from 'types/types';
import { getBaseLayout } from 'utils/layout';

const VideoPage: NextPageWithLayout = () => {
  return <>Video Page</>;
};

VideoPage.getLayout = getBaseLayout;

export default VideoPage;
