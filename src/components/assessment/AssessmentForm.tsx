import React, { useState } from 'react';
import { competencyAreas } from '../../constants/competencies';
import { ProgressIndicator } from './ProgressIndicator';
import { RoleScoring } from '../scoring/RoleScoring';
import { CompetencySection } from './CompetencySection';
import type { RatingValue } from '../../constants/ratingCriteria';
import type { RoleLevel } from '../../types/assessment.types';

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
  const [activeSection, setActiveSection] = useState(Object.keys(competencyAreas)[0]);
  const [ratings, setRatings] = useState<Record<string, RatingValue | null>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const getCompetencyProgress = () => {
    return Object.values(competencyAreas).map(area => ({
      id: area.id,
      title: area.title,
      totalCriteria: area.criteria.length,
      completedCriteria: area.criteria.filter(
        criterion => ratings[criterion.id] !== null && ratings[criterion.id] !== undefined
      ).length
    }));
  };

  const isComplete = () => {
    const totalRequired = Object.values(competencyAreas).reduce(
      (sum, area) => sum + area.criteria.length,
      0
    );
    
    const completed = Object.values(ratings).filter(
      rating => rating !== null && rating !== undefined
    ).length;

    return completed === totalRequired;
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete()) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmSubmit = () => {
    onComplete({ ratings, notes });
    setShowConfirmation(false);
  };

  return (
    <div className="flex gap-6">
      {/* Progress Sidebar */}
      <div className="w-64 flex-shrink-0">
        <div className="sticky top-4">
        <div className="space-y-8">
            <ProgressIndicator
              competencies={getCompetencyProgress()}
              currentSection={activeSection}
              onSectionClick={setActiveSection}
            />
            
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
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">
              {roleLevel} Assessment
            </h2>

            {/* Competency Section */}
            {competencyAreas[activeSection] && (
              <CompetencySection
                competency={competencyAreas[activeSection]}
                onRatingChange={handleRatingChange}
                onNotesChange={handleNotesChange}
                currentRatings={ratings}
                currentNotes={notes}
              />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  const sections = Object.keys(competencyAreas);
                  const currentIndex = sections.indexOf(activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1]);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={activeSection === Object.keys(competencyAreas)[0]}
              >
                Previous Section
              </button>

              <button
                type="button"
                onClick={() => {
                  const sections = Object.keys(competencyAreas);
                  const currentIndex = sections.indexOf(activeSection);
                  if (currentIndex < sections.length - 1) {
                    setActiveSection(sections[currentIndex + 1]);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={activeSection === Object.keys(competencyAreas)[Object.keys(competencyAreas).length - 1]}
              >
                Next Section
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!isComplete()}
              className={`
                px-6 py-2 rounded-md text-white
                ${isComplete()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'}
              `}
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