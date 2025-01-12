import React, { useState } from 'react';
import { ratingDescriptions, ratingScale, getRatingLabel, type RatingValue } from '../../constants/ratingCriteria';

interface RatingInputProps {
  value: RatingValue | null;
  onChange: (value: RatingValue) => void;
  id: string;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  value,
  onChange,
  id
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value) as RatingValue);
  };

  // Generate rating options from min to max with step intervals
  const options = Array.from(
    { length: (ratingScale.max - ratingScale.min) / ratingScale.step + 1 },
    (_, i) => ratingScale.min + (i * ratingScale.step)
  );

  return (
    <div className="relative">
      <div className="flex items-center space-x-4">
        <select
          id={id}
          value={value || ''}
          onChange={handleChange}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select...</option>
          {options.map((rating) => (
            <option key={rating} value={rating}>
              {rating} - {getRatingLabel(rating)}
            </option>
          ))}
        </select>
        
        <button
          type="button"
          onClick={() => setShowTooltip(!showTooltip)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Rating descriptions tooltip */}
      {showTooltip && (
        <div className="absolute z-10 mt-2 w-96 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Rating Scale</h4>
            <div className="space-y-2">
              {Object.entries(ratingDescriptions).map(([rating, { label, description }]) => (
                <div key={rating} className="text-sm">
                  <span className="font-medium">{rating} - {label}:</span>
                  <span className="text-gray-600 ml-1">{description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};