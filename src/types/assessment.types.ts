export type RoleLevel =
  | 'Product Designer'
  | 'Senior Product Designer'
  | 'Lead Product Designer'
  | 'Principal Product Designer'
  | 'Principal Product Designer II';

  export type AssessmentType = 'self' | 'manager';

  export interface EmployeeInfo {
    name: string;
    currentLevel: RoleLevel;
    department?: string;
    manager?: string;
    assessmentDate?: string;
    assessmentType: AssessmentType;
    assessorName?: string;
  }

export interface Assessment {
  employeeInfo: EmployeeInfo;
  roleLevels: {
    [K in RoleLevel]?: {
      competencies: CompetencyRatings;
      qualitativeNotes: string;
      overallScore: number;
      lastUpdated: string;
    };
  };
}

export interface CompetencyRatings {
  [competencyId: string]: Rating[];
}

export interface Rating {
  value: number;
  criterion: string;
  notes?: string;
}