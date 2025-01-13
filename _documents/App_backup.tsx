import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AssessmentForm } from './components/assessment/AssessmentForm';
import { Header } from './components/layout/Header';
import type { EmployeeInfo, RoleLevel } from './types/assessment.types';
import type { RatingValue } from './constants/ratingCriteria';
import './styles/tailwind.css';

const ROLE_LEVELS: RoleLevel[] = [
  'Product Designer',
  'Product Designer II',
  'Senior Product Designer',
  'Senior Product Designer II',
  'Principal Product Designer',
  'Principal Product Designer II'
];

function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Record<RoleLevel, {
    ratings: Record<string, RatingValue | null>;
    notes: Record<string, string>;
  }>>({} as any);

  const handleStart = (info: EmployeeInfo) => {
    console.log('Starting assessment for:', info);
    setEmployeeInfo(info);
    // Set initial level index based on employee's current level
    const startIndex = ROLE_LEVELS.indexOf(info.currentLevel);
    setCurrentLevelIndex(startIndex >= 0 ? startIndex : 0);
  };

  const handleAssessmentComplete = (data: {
    ratings: Record<string, RatingValue | null>;
    notes: Record<string, string>;
  }) => {
    const currentLevel = ROLE_LEVELS[currentLevelIndex];
    setAssessmentData(prev => ({
      ...prev,
      [currentLevel]: data
    }));
    // TODO: Handle final assessment completion
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < ROLE_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    }
  };

  const handlePreviousLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        {!employeeInfo ? (
          <LandingPage onStart={handleStart} />
        ) : (
          <AssessmentForm
            roleLevel={ROLE_LEVELS[currentLevelIndex]}
            onComplete={handleAssessmentComplete}
            onNext={handleNextLevel}
            onPrevious={handlePreviousLevel}
            isFirstLevel={currentLevelIndex === 0}
            isLastLevel={currentLevelIndex === ROLE_LEVELS.length - 1}
          />
        )}
      </main>
    </div>
  );
}

export default App;