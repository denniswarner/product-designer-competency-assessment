import React from 'react';

interface SliderRatingProps {
  value: number;
  onChange: (value: number) => void;
  id: string;
}

export const SliderRating: React.FC<SliderRatingProps> = ({ value, onChange, id }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="relative w-48">
      <input
        type="range"
        id={id}
        min="0"
        max="5"
        step="0.5"
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-600 px-1 mt-1">
        <span>0</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
};

export default SliderRating;