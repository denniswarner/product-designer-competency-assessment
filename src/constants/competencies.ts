export const competencyAreas = {
  leadership: {
    id: 'leadership',
    title: 'Design Leadership',
    description: 'Ability to guide design decisions and influence stakeholders',
    criteria: [
      {
        id: 'leadership_1',
        description: 'Effectively communicates design decisions to stakeholders',
        examples: [
          'Presents design work with clear rationale',
          'Handles feedback constructively',
          'Documents design decisions'
        ]
      },
      {
        id: 'leadership_2',
        description: 'Influences product strategy through design thinking',
        examples: [
          'Contributes to product roadmap discussions',
          'Identifies opportunities for design improvements',
          'Advocates for user needs'
        ]
      }
    ]
  },
  execution: {
    id: 'execution',
    title: 'Design Execution',
    description: 'Ability to deliver high-quality design work',
    criteria: [
      {
        id: 'execution_1',
        description: 'Creates polished, high-quality design solutions',
        examples: [
          'Maintains consistent visual design',
          'Produces developer-ready specifications',
          'Ensures designs meet accessibility standards'
        ]
      },
      {
        id: 'execution_2',
        description: 'Manages design projects effectively',
        examples: [
          'Delivers work on time',
          'Prioritizes tasks appropriately',
          'Communicates progress clearly'
        ]
      }
    ]
  }
} as const;