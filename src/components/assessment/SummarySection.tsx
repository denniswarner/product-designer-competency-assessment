import React, { useState } from 'react';
import type { RoleLevel } from '../../types/assessment.types';
import { summaryStructures } from '../../constants/roleCompetencies/summaryStructure';

interface SummarySectionProps {
  roleLevel: RoleLevel;
  ratings: Record<string, number>;
  onNotesChange: (notes: string) => void;
}

export const SummarySection: React.FC<SummarySectionProps> = ({
  roleLevel,
  ratings,
  onNotesChange,
}) => {
  const [notes, setNotes] = useState('');

  // Get the prefix based on role level
  const getRolePrefix = () => {
    const prefixMap = {
      'Product Designer': 'pd',
      'Product Designer II': 'pd2',
      'Senior Product Designer': 'spd',
      'Senior Product Designer II': 'spd2',
      'Principal Product Designer': 'ppd',
      'Principal Product Designer II': 'ppd2'
    };
    return prefixMap[roleLevel];
  };

  const calculateAreaScore = (competencyType: string) => {
    const prefix = `${getRolePrefix()}_${competencyType}`;
    const areaRatings = Object.entries(ratings)
      .filter(([id]) => id.startsWith(prefix))
      .map(([, value]) => value);

    if (areaRatings.length === 0) return 0;
    return areaRatings.reduce((sum, val) => sum + val, 0) / areaRatings.length;
  };

  const { areas, notesPlaceholder } = summaryStructures[roleLevel];

  const areaScores = areas.map(area => ({
    ...area,
    score: calculateAreaScore(area.type)
  }));

  const overallScore = areaScores.reduce((sum, area) => sum + area.score, 0) / areas.length;

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNotes(value);
    onNotesChange(value);
  };

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="bg-[#7CB9E8] px-8 py-4 mb-8">
        <h2 className="text-2xl font-bold">
          Summary - {roleLevel}
        </h2>
      </div>

      {/* Area Scores */}
      <div className="space-y-6">
        {areaScores.map((area) => (
          <div key={area.title} className="flex justify-between items-center">
            <span className="text-lg">{area.title}</span>
            <div className="bg-gray-100 rounded px-3 py-1 w-16 text-center">
              <span className="font-mono text-lg">
                {area.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}

        {/* Overall Score */}
        <div className="flex justify-between items-center mt-8">
          <span className="text-lg font-semibold">Overall Score:</span>
          <div className="bg-gray-100 rounded px-3 py-1 w-16 text-center">
            <span className="font-mono text-lg">
              {overallScore.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Qualitative Notes */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Qualitative Notes</h3>
        <textarea
          value={notes}
          onChange={handleNotesChange}
          placeholder={notesPlaceholder}
          className="w-full p-4 border rounded-lg h-40 text-base"
        />
      </div>
    </div>
  );
};

export default SummarySection;