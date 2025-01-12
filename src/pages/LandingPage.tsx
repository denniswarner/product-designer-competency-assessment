import React, { useState } from 'react';
import type { RoleLevel, AssessmentType } from '../types/assessment.types';

interface LandingPageProps {
  onStart: (employeeInfo: { 
    name: string; 
    currentLevel: RoleLevel;
    department?: string;
    manager?: string;
    assessmentType: AssessmentType;
    assessorName?: string;
  }) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [currentLevel, setCurrentLevel] = useState<RoleLevel>('Product Designer');
  const [department, setDepartment] = useState('');
  const [manager, setManager] = useState('');
  const [assessmentType, setAssessmentType] = useState<AssessmentType>('self');
  const [assessorName, setAssessorName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart({ 
      name, 
      currentLevel,
      department,
      manager,
      assessmentType,
      assessorName: assessmentType === 'manager' ? assessorName : undefined
    });
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
              Product Designer Name
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

          <div>
            <label 
              htmlFor="department" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Product Design, Design Systems, UX Research"
            />
          </div>

          <div>
            <label 
              htmlFor="manager" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Manager's Name
            </label>
            <input
              type="text"
              id="manager"
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your manager's full name"
            />
          </div>

          <div>
            <label 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Assessment Type
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="self-assessment"
                  name="assessment-type"
                  value="self"
                  checked={assessmentType === 'self'}
                  onChange={(e) => setAssessmentType(e.target.value as AssessmentType)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="self-assessment" className="ml-2 text-sm text-gray-700">
                  Self Assessment
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="manager-assessment"
                  name="assessment-type"
                  value="manager"
                  checked={assessmentType === 'manager'}
                  onChange={(e) => setAssessmentType(e.target.value as AssessmentType)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="manager-assessment" className="ml-2 text-sm text-gray-700">
                  Manager Assessment
                </label>
              </div>
            </div>
          </div>

          {assessmentType === 'manager' && (
            <div>
              <label 
                htmlFor="assessor-name" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Assessor's Name
              </label>
              <input
                type="text"
                id="assessor-name"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name (as the assessor)"
                required={assessmentType === 'manager'}
              />
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="text-sm font-medium text-blue-800 mb-2">Assessment Information</h2>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• This assessment will take approximately 30-45 minutes to complete</li>
              <li>• You can save your progress and return later</li>
              <li>• All responses are confidential</li>
              <li>• Be honest and reflective in your self-assessment</li>
            </ul>
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

export default LandingPage;