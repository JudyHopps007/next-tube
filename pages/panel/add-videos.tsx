import React from 'react';
import { NextPageWithLayout } from 'types/types';
import { getPanelLayout } from 'utils/layout';

type Props = {};

const PanelAddVideos: NextPageWithLayout<Props> = ({}) => {
  return <>PanelAddVideos</>;
};

PanelAddVideos.getLayout = getPanelLayout;

export default PanelAddVideos;
