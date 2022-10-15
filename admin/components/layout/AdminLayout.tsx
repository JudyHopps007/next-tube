import PanelNavbar from 'components/navbar';
import React, { FC } from 'react';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="bg-slate-900 text-gray-100">
      <PanelNavbar />
      <main className="container max-w-5xl mx-auto min-h-screen px-2 mt-5">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
