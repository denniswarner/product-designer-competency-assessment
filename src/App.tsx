import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AssessmentForm } from './components/assessment/AssessmentForm';
import { Header } from './components/layout/Header';
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
    // TODO: Handle assessment completion
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        {!employeeInfo ? (
          <LandingPage onStart={handleStart} />
        ) : (
          <AssessmentForm
            roleLevel={employeeInfo.currentLevel}
            onComplete={handleAssessmentComplete}
          />
        )}
      </main>
    </div>
  );
}

export default App;