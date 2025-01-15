import React, { useState, useEffect } from 'react';
import StrategicThinkingSection from './StrategicThinkingSection';
import CraftAndQualitySection from './CraftAndQualitySection';
import LeadershipCommunicationSection from './LeadershipCommunicationSection';
import TeamCultureSection from './TeamCultureSection';
import IndependenceGrowthSection from './IndependenceGrowthSection';
import TotalScoreSection from './TotalScoreSection';
import type { RoleLevel } from '../../types/assessment.types';
import type { RatingValue } from '../../constants/ratingCriteria';

interface AssessmentFormProps {
  roleLevel: RoleLevel;
  onComplete: (data: {
    ratings: Record<string, RatingValue | null>;
    notes: Record<string, string>;
  }) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstLevel: boolean;
  isLastLevel: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  roleLevel,
  onComplete,
  onNext,
  onPrevious,
  isFirstLevel,
  isLastLevel,
}) => {
  const [ratings, setRatings] = useState<Record<string, RatingValue | null>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [roleLevel]);

  const handleRatingChange = (criterionId: string, value: RatingValue) => {
    setRatings(prev => ({
      ...prev,
      [criterionId]: value
    }));
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
    <div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow rounded-lg">
          <div className="bg-[#7CB9E8] px-8 py-6">
            <h2 className="text-3xl font-bold">
              {roleLevel}
            </h2>
          </div>
          
          <StrategicThinkingSection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />
            
            <CraftAndQualitySection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />

<LeadershipCommunicationSection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />

            <TeamCultureSection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />

<IndependenceGrowthSection
              roleLevel={roleLevel}
              ratings={ratings}
              onRatingChange={handleRatingChange}
            />
            <TotalScoreSection
              roleLevel={roleLevel}
              ratings={ratings}
              onNotesChange={(value) => handleNotesChange('summary_notes', value)}
            />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className={`px-6 py-2 rounded-md transition-colors ${
              isFirstLevel 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
            disabled={isFirstLevel}
          >
            Previous Level
          </button>

          {isLastLevel ? (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Complete Assessment
            </button>
          ) : (
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Next Level
            </button>
          )}
        </div>
      </form>

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