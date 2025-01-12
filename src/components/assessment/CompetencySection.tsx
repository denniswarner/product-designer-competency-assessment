import React from 'react';
import { RatingInput } from './RatingInput';
import type { RatingValue } from '../../constants/ratingCriteria';

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
  onRatingChange: (criterionId: string, score: RatingValue) => void;
  onNotesChange: (criterionId: string, notes: string) => void;
  currentRatings: Record<string, RatingValue | null>;
  currentNotes: Record<string, string>;
}

export const CompetencySection: React.FC<CompetencySectionProps> = ({
  competency,
  onRatingChange,
  onNotesChange,
  currentRatings,
  currentNotes,
}) => {
  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold mb-2">{competency.title}</h3>
        <p className="text-gray-600">{competency.description}</p>
      </div>
      
      <div className="space-y-8">
        {competency.criteria.map((criterion) => (
          <div key={criterion.id} className="bg-white shadow rounded-lg p-6">
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{criterion.description}</h4>
              
              {criterion.examples.length > 0 && (
                <div className="bg-gray-50 rounded-md p-4 mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Examples</h5>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    {criterion.examples.map((example, index) => (
                      <li key={index} className="list-disc">{example}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <RatingInput
                  id={`rating-${criterion.id}`}
                  value={currentRatings[criterion.id]}
                  onChange={(value) => onRatingChange(criterion.id, value)}
                />
              </div>

              <div>
                <label 
                  htmlFor={`notes-${criterion.id}`}
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Supporting Examples / Notes
                </label>
                <textarea
                  id={`notes-${criterion.id}`}
                  value={currentNotes[criterion.id] || ''}
                  onChange={(e) => onNotesChange(criterion.id, e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  rows={3}
                  placeholder="Provide specific examples or context for your rating..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetencySection;