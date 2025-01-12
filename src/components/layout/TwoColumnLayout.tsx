import React from 'react';

interface TwoColumnLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ sidebar, main }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        {sidebar}
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        {main}
      </div>
    </div>
  );
};