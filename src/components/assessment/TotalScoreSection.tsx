import React from 'react';
import type { RoleLevel } from '../../types/assessment.types';
import { totalScoreStructures } from '../../constants/roleCompetencies/totalScoreStructure';

interface TotalScoreSectionProps {
  roleLevel: RoleLevel;
  ratings: Record<string, number>;
  onNotesChange: (notes: string) => void;
}

export const TotalScoreSection: React.FC<TotalScoreSectionProps> = ({
  roleLevel,
  ratings,
  onNotesChange,
}) => {
  const scoreStructure = totalScoreStructures[roleLevel];

  const calculateAreaScore = (prefixId: string) => {
    const areaRatings = Object.entries(ratings)
      .filter(([id]) => id.startsWith(prefixId))
      .map(([, value]) => value);

    if (areaRatings.length === 0) return 0;
    return areaRatings.reduce((sum, val) => sum + val, 0) / areaRatings.length;
  };

  const areaScores = scoreStructure.areas.map(area => ({
    ...area,
    score: calculateAreaScore(area.prefixId)
  }));

  const overallScore = areaScores.reduce((sum, area) => sum + area.score, 0) / areaScores.length;

  return (
    <div className="mt-8">
      <div className="bg-[#7CB9E8] px-8 py-4 mb-6">
        <h2 className="text-2xl font-bold">{scoreStructure.title}</h2>
      </div>

      <div className="space-y-4">
        {areaScores.map((area) => (
          <div key={area.title} className="flex justify-between items-center">
            <span className="text-lg">{area.title}</span>
            <div className="bg-gray-100 px-3 py-1 rounded w-16 text-center">
              <span className="font-mono">{area.score.toFixed(1)}</span>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-4 mt-4 border-t">
          <span className="text-lg font-bold">Overall Score:</span>
          <div className="bg-gray-100 px-3 py-1 rounded w-16 text-center">
            <span className="font-mono">{overallScore.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Qualitative Notes</h3>
        <textarea
          className="w-full p-4 border rounded-lg"
          rows={6}
          placeholder={scoreStructure.notesPlaceholder}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TotalScoreSection;