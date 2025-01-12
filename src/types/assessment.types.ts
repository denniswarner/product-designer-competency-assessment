export type RoleLevel =
  | 'Product Designer'
  | 'Senior Product Designer'
  | 'Lead Product Designer'
  | 'Principal Product Designer'
  | 'Principal Product Designer II';

export interface EmployeeInfo {
  name: string;
  currentLevel: RoleLevel;
  assessmentDate?: string;
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