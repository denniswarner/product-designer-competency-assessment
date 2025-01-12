import React from 'react';

interface Competency {
  id: string;
  title: string;
  description: string;
  criteria: {
    id: string;
    description: string;
    examples: string[];
  }[];
}

interface CompetencySectionProps {
  competency: Competency;
  onRatingChange: (criterionId: string, score: number) => void;
  onNotesChange: (criterionId: string, notes: string) => void;
  currentRatings: Record<string, number>;
}

export const CompetencySection: React.FC<CompetencySectionProps> = ({
  competency,
  onRatingChange,
  onNotesChange,
  currentRatings,
}) => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <h3 className="text-lg font-semibold mb-2">{competency.title}</h3>
      <p className="text-gray-600 mb-4">{competency.description}</p>
      
      <div className="space-y-6">
        {competency.criteria.map((criterion) => (
          <div key={criterion.id} className="bg-gray-50 p-4 rounded-md">
            <p className="font-medium mb-2">{criterion.description}</p>
            
            {criterion.examples.length > 0 && (
              <ul className="text-sm text-gray-600 mb-4 ml-4">
                {criterion.examples.map((example, index) => (
                  <li key={index} className="list-disc">{example}</li>
                ))}
              </ul>
            )}
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Rating:</label>
              <select
                value={currentRatings[criterion.id] || ''}
                onChange={(e) => onRatingChange(criterion.id, Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {[1, 2, 3, 4, 5].map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Notes:</label>
              <textarea
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                rows={3}
                placeholder="Add any specific examples or context..."
                onChange={(e) => onNotesChange(criterion.id, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetencySection;