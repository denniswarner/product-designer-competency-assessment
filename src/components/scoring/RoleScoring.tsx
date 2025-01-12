import React, { useState } from 'react';

interface RoleScoringProps {
  scores: {
    [key: string]: number;
  };
}

export const RoleScoring: React.FC<RoleScoringProps> = ({ scores }) => {
  const [showScoring, setShowScoring] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);

  const roles = [
    { name: 'Product Designer', color: 'rgb(100, 181, 246)' },
    { name: 'Product Designer II', color: 'rgb(100, 181, 246)' },
    { name: 'Senior Product Designer', color: 'rgb(129, 199, 132)' },
    { name: 'Senior Product Designer II', color: 'rgb(129, 199, 132)' },
    { name: 'Principal Product Designer', color: 'rgb(229, 115, 115)' },
    { name: 'Principal Product Designer II', color: 'rgb(186, 104, 200)' }
  ];

  const averageScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length || 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Role Scoring</h2>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 space-y-4">
          {roles.map((role) => (
            <div key={role.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-mono">{scores[role.name]?.toFixed(1) || '0.0'}</span>
                <span className="text-gray-700">{role.name}</span>
              </div>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: role.color }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-mono">{averageScore.toFixed(1)}</span>
                <span className="text-gray-700">Average Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible sections */}
      <div className="space-y-2">
        <button
          onClick={() => setShowScoring(!showScoring)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <span className="text-sm">{'>'}</span>
          <span className="text-sm">Scoring Scale</span>
        </button>

        <button
          onClick={() => setShowGuidelines(!showGuidelines)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <span className="text-sm">{'>'}</span>
          <span className="text-sm">Promotion Guidelines</span>
        </button>
      </div>
    </div>
  );
};