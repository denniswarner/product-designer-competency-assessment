import React from 'react';
import type { CompetencyArea } from '../../constants/productDesignerCompetencies';

interface CompetencyRatingSectionProps {
  area: CompetencyArea;
  ratings: Record<string, number>;
  onRatingChange: (criterionIndex: number, rating: number) => void;
  areaScore: number;
}

export const CompetencyRatingSection: React.FC<CompetencyRatingSectionProps> = ({
  area,
  ratings,
  onRatingChange,
  areaScore
}) => {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-xl font-semibold mb-4">{area.title}</h3>
      
      <div className="space-y-4">
        {area.criteria.map((criterion, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900 mb-3">{criterion.text}</p>
            
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => onRatingChange(index, rating)}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${ratings[index] === rating 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }
                  `}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <span className="font-medium">{area.title} Score:</span>
        <span className="text-xl font-mono">{areaScore.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default CompetencyRatingSection;