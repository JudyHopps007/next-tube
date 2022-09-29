import PanelNavbar from 'components/panelbar';
import React, { FC } from 'react';

type PanelLayoutProps = {
  children: React.ReactNode;
};

const PanelLayout: FC<PanelLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-900 text-gray-100">
      <PanelNavbar />
      <main className="container max-w-5xl mx-auto min-h-screen px-2">
        {children}
      </main>
    </div>
  );
};

export default PanelLayout;
