import React from 'react';
import SliderRating from './SliderRating';
import { productDesignerStrategicThinking } from '../../constants/roleCompetencies/productDesigner/strategicThinking';
import { productDesignerIIStrategicThinking } from '../../constants/roleCompetencies/productDesignerII/strategicThinking';
import type { RoleLevel } from '../../types/assessment.types';

interface StrategicThinkingSectionProps {
  roleLevel: RoleLevel;
  ratings: Record<string, number>;
  onRatingChange: (criterionId: string, value: number) => void;
}

export const StrategicThinkingSection: React.FC<StrategicThinkingSectionProps> = ({
  roleLevel,
  ratings,
  onRatingChange,
}) => {
  const getCriteriaForRole = () => {
    switch (roleLevel) {
      case 'Product Designer':
        return productDesignerStrategicThinking;
      case 'Product Designer II':
        return productDesignerIIStrategicThinking;
      // Add cases for other roles
      default:
        return productDesignerStrategicThinking; // Fallback to Product Designer
    }
  };

  const competencyData = getCriteriaForRole();
  
  const calculateScore = () => {
    const criteriaIds = competencyData.criteria.map(c => c.id);
    const relevantRatings = Object.entries(ratings)
      .filter(([id]) => criteriaIds.includes(id))
      .map(([, value]) => value);

    if (relevantRatings.length === 0) return 0;
    return relevantRatings.reduce((sum, val) => sum + val, 0) / relevantRatings.length;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">{competencyData.title}</h2>
      
      <div className="space-y-8">
        {competencyData.criteria.map((criterion) => (
          <div key={criterion.id} className="space-y-2">
            <p className="text-gray-800">{criterion.text}</p>
            <div className="flex items-center justify-between">
              <SliderRating
                id={criterion.id}
                value={ratings[criterion.id] || 0}
                onChange={(value) => onRatingChange(criterion.id, value)}
              />
              <span className="font-mono font-medium w-12 text-right">
                {ratings[criterion.id]?.toFixed(1) || '0.0'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t flex justify-between items-center">
        <span className="font-medium">{competencyData.title} Score:</span>
        <span className="font-mono font-medium text-lg">
          {calculateScore().toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default StrategicThinkingSection;