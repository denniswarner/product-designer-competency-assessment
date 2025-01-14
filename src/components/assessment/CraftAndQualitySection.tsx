import React from 'react';
import SliderRating from './SliderRating';
import { craftAndQualityCompetencies } from '../../constants/roleCompetencies/craftAndQuality';
import type { RoleLevel } from '../../types/assessment.types';

interface CraftAndQualitySectionProps {
  roleLevel: RoleLevel;
  ratings: Record<string, number>;
  onRatingChange: (criterionId: string, value: number) => void;
}

export const CraftAndQualitySection: React.FC<CraftAndQualitySectionProps> = ({
  roleLevel,
  ratings,
  onRatingChange,
}) => {
  const competencyData = craftAndQualityCompetencies[roleLevel];
  
  const calculateScore = () => {
    const criteriaIds = competencyData.criteria.map(c => c.id);
    const relevantRatings = Object.entries(ratings)
      .filter(([id]) => criteriaIds.includes(id))
      .map(([, value]) => value);

    if (relevantRatings.length === 0) return 0;
    return relevantRatings.reduce((sum, val) => sum + val, 0) / relevantRatings.length;
  };

  return (
    <div className="space-y-8 mt-16">
      {/* Section Title */}
      <h2 className="text-2xl font-bold">
        {competencyData.title}
      </h2>

      {/* Criteria and Ratings */}
      <div>
        {competencyData.criteria.map((criterion) => (
          <div key={criterion.id} className="mb-12 flex justify-between items-start">
            {/* Left Column - Criterion Text */}
            <div className="w-1/2 pr-8">
              <p className="text-gray-900">{criterion.text}</p>
            </div>
            
            {/* Right Column - Rating */}
            <div className="flex items-center space-x-4">
              <SliderRating
                id={criterion.id}
                value={ratings[criterion.id] || 0}
                onChange={(value) => onRatingChange(criterion.id, value)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Score Summary */}
      <div className="flex justify-end items-center space-x-4 pt-6 border-t">
        <span className="font-bold text-lg">
          {competencyData.title} Score:
        </span>
        <div className="bg-gray-100 rounded px-3 py-1">
          <span className="font-mono font-medium text-lg">
            {calculateScore().toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CraftAndQualitySection;