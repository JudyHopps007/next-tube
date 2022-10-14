import BaseLayout from 'components/layout/BaseLayout';
import PanelLayout from '@panel/layout/PanelLayout';
import React from 'react';

export function getBaseLayout(page: React.ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
}

export function getPanelLayout(page: React.ReactElement) {
  return <PanelLayout>{page}</PanelLayout>;
}
