import React, { useState } from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { RoleScoring } from '../scoring/RoleScoring';
import StrategicThinkingSection from './StrategicThinkingSection';
import type { RoleLevel } from '../../types/assessment.types';
import type { RatingValue } from '../../constants/ratingCriteria';

interface AssessmentFormProps {
  roleLevel: RoleLevel;
  onComplete: (data: {
    ratings: Record<string, RatingValue | null>;
    notes: Record<string, string>;
  }) => void;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  roleLevel,
  onComplete,
}) => {
  const [activeSection, setActiveSection] = useState<string>('strategicThinking');
  const [ratings, setRatings] = useState<Record<string, RatingValue | null>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRatingChange = (criterionId: string, value: RatingValue) => {
    setRatings(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };

  const handleNotesChange = (criterionId: string, value: string) => {
    setNotes(prev => ({
      ...prev,
      [criterionId]: value
    }));
  };

  const getCompetencyProgress = () => {
    // For now, just return strategic thinking progress
    return [
      {
        id: 'strategicThinking',
        title: 'Strategic Thinking & Domain Expertise',
        totalCriteria: 4,
        completedCriteria: Object.values(ratings).filter(Boolean).length
      }
    ];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    onComplete({
      ratings,
      notes
    });
    setShowConfirmation(false);
  };

  return (
    <div className="flex gap-6">
      {/* Progress Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-4">
          <ProgressIndicator
            competencies={getCompetencyProgress()}
            currentSection={activeSection}
            onSectionClick={setActiveSection}
          />
          <div className="mt-8">
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
        </div>
      </div>

      {/* Main Assessment Form */}
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
        <div className="bg-[#7CB9E8] px-O py-6 pl-6">
              <h2 className="text-3xl font-bold">
                {roleLevel}
              </h2>
            </div>
            
            <StrategicThinkingSection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Complete Assessment
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-medium mb-4">Confirm Submission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to submit this assessment? You won't be able to make changes after submission.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentForm;