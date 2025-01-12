import { useState } from 'react';
import { TwoColumnLayout } from './components/layout/TwoColumnLayout';
import { LandingPage } from './pages/LandingPage';
import type { EmployeeInfo } from './types/assessment.types';
import './styles/tailwind.css';

function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);

  const handleStart = (info: EmployeeInfo) => {
    setEmployeeInfo(info);
    // TODO: Initialize assessment data
  };

  if (!employeeInfo) {
    return <LandingPage onStart={handleStart} />;
  }

  return (
    <TwoColumnLayout
      sidebar={
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Navigation</h2>
          <p className="text-gray-600">Welcome, {employeeInfo.name}</p>
        </div>
      }
      main={
        <div>
          <h1 className="text-3xl font-bold mb-6">
            Product Design Competency Assessment
          </h1>
          <p className="text-gray-600">
            Assessment content will go here
          </p>
        </div>
      }
    />
  );
}

export default App;