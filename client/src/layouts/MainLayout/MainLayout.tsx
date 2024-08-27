
import React from 'react';
import './MainLayout.scss';

type MainContainerProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainContainerProps> = ({ children }) => {
  return (
    <div className="main-layout">
      {children}
    </div>
  );
};

export default MainLayout;