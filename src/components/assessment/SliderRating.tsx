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
    <div className="flex items-center space-x-4">
      <div className="flex flex-col w-64">
        <div className="relative">
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
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-sm text-gray-600">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded px-3 py-1 min-w-[48px] text-center">
        <span className="font-mono text-lg">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default SliderRating;