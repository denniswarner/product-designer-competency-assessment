import React from 'react';

interface CompetencyProgress {
  id: string;
  title: string;
  totalCriteria: number;
  completedCriteria: number;
}

interface ProgressIndicatorProps {
  competencies: CompetencyProgress[];
  currentSection: string;
  onSectionClick: (sectionId: string) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  competencies,
  currentSection,
  onSectionClick,
}) => {
  const totalCriteria = competencies.reduce((sum, comp) => sum + comp.totalCriteria, 0);
  const totalCompleted = competencies.reduce((sum, comp) => sum + comp.completedCriteria, 0);
  const overallProgress = Math.round((totalCompleted / totalCriteria) * 100);

  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-6">
      {/* Overall Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-900">Overall Progress</h3>
          <span className="text-sm font-medium text-gray-700">{overallProgress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Section Progress */}
      <div className="space-y-4">
        {competencies.map((competency) => {
          const progress = Math.round(
            (competency.completedCriteria / competency.totalCriteria) * 100
          );

          return (
            <div key={competency.id}>
              <button
                onClick={() => onSectionClick(competency.id)}
                className={`w-full text-left group ${
                  currentSection === competency.id
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{competency.title}</span>
                  <span className="text-sm">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSection === competency.id 
                        ? 'bg-blue-600' 
                        : 'bg-gray-400 group-hover:bg-gray-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {overallProgress === 100 && (
        <div className="bg-green-50 text-green-800 p-3 rounded-md text-sm">
          ✓ Assessment Complete
        </div>
      )}
    </div>
  );
};