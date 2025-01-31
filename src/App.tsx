import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { AssessmentForm } from './components/assessment/AssessmentForm';
import { Header } from './components/layout/Header';
import { RoleScoring } from './components/scoring/RoleScoring';
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
      
      <main className="container mx-auto py-6">
        {!employeeInfo ? (
          <LandingPage onStart={handleStart} />
        ) : (
          <div className="flex gap-8">
            {/* Role Scoring Sidebar */}
            <div className="w-72 flex-shrink-0">
              <h2 className="text-xl font-bold mb-4">Role Scoring</h2>
              <RoleScoring
                scores={{
                  'Product Designer': 0.0,
                  'Product Designer II': 0.0,
                  'Senior Product Designer': 0.0,
                  'Senior Product Designer II': 0.0,
                  'Principal Product Designer': 0.0,
                  'Principal Product Designer II': 0.0
                }}
              />
            </div>

            {/* Main Assessment Form */}
            <div className="flex-1">
              <AssessmentForm
                roleLevel={ROLE_LEVELS[currentLevelIndex]}
                onComplete={handleAssessmentComplete}
                onNext={handleNextLevel}
                onPrevious={handlePreviousLevel}
                isFirstLevel={currentLevelIndex === 0}
                isLastLevel={currentLevelIndex === ROLE_LEVELS.length - 1}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;