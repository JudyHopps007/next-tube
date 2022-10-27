import Footer from 'components/footer';
import Navbar from 'components/navbar';
import React, { FC } from 'react';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="bg-primary text-primary">
      <Navbar />
      <main className="container max-w-5xl mx-auto min-h-screen px-2">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
