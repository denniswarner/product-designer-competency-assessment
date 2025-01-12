import { useState } from 'react';
import { TwoColumnLayout } from './components/layout/TwoColumnLayout';
import { LandingPage } from './pages/LandingPage';
import { AssessmentForm } from './components/assessment/AssessmentForm';
import type { EmployeeInfo } from './types/assessment.types';
import type { RatingValue } from './constants/ratingCriteria';
import './styles/tailwind.css';

function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);

  const handleStart = (info: EmployeeInfo) => {
    console.log('Starting assessment for:', info);
    setEmployeeInfo(info);
  };

  const handleAssessmentComplete = (data: {
    ratings: Record<string, RatingValue | null>;
    notes: Record<string, string>;
  }) => {
    console.log('Assessment completed:', { employeeInfo, ...data });
    // TODO: Handle assessment completion (e.g., save to localStorage, send to server, etc.)
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
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-6">
            Product Design Competency Assessment
          </h1>
          <AssessmentForm
            roleLevel={employeeInfo.currentLevel}
            onComplete={handleAssessmentComplete}
          />
        </div>
      }
    />
  );
}

export default App;