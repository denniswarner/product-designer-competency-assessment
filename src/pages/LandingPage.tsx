import React, { useState } from 'react';
import { RoleLevel } from '../types/assessment.types';

interface LandingPageProps {
  onStart: (employeeInfo: { name: string; currentLevel: RoleLevel }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [currentLevel, setCurrentLevel] = useState<RoleLevel>('Product Designer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ name, currentLevel });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        Product Design Competency Assessment
      </h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="level" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Role Level
            </label>
            <select
              id="level"
              value={currentLevel}
              onChange={(e) => setCurrentLevel(e.target.value as RoleLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Product Designer">Product Designer</option>
              <option value="Senior Product Designer">Senior Product Designer</option>
              <option value="Lead Product Designer">Lead Product Designer</option>
              <option value="Principal Product Designer">Principal Product Designer</option>
              <option value="Principal Product Designer II">Principal Product Designer II</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Start Assessment
          </button>
        </form>
      </div>
    </div>
  );
};