import React from 'react';
import type { RoleCompetencies } from '../../constants/productDesignerCompetencies';

interface AssessmentSummaryProps {
  competencies: RoleCompetencies;
  areaScores: Record<string, number>;
  overallScore: number;
  notes: string;
  onNotesChange: (notes: string) => void;
}

export const AssessmentSummary: React.FC<AssessmentSummaryProps> = ({
  competencies,
  areaScores,
  overallScore,
  notes,
  onNotesChange
}) => {
  return (
    <div className="bg-blue-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Summary - {competencies.title}</h2>
      
      <div className="space-y-2 mb-6">
        {Object.entries(competencies.areas).map(([key, area]) => (
          <div key={key} className="flex justify-between items-center">
            <span className="text-gray-700">{area.title}</span>
            <span className="font-mono">{areaScores[key]?.toFixed(1) || '0.0'}</span>
          </div>
        ))}
        
        <div className="pt-2 mt-2 border-t border-blue-200 flex justify-between items-center">
          <span className="font-medium">Overall Score:</span>
          <span className="font-mono font-medium">{overallScore.toFixed(1)}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Qualitative Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Enter specific examples, areas of improvement and development goals for this level."
          className="w-full h-32 p-3 border rounded-md"
        />
      </div>
    </div>
  );
};