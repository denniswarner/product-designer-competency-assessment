export const ratingDescriptions = {
    1: {
      label: 'Developing',
      description: 'Limited experience or capability in this area. Requires significant guidance.'
    },
    2: {
      label: 'Applied',
      description: 'Can perform with guidance. Growing capability but not fully independent.'
    },
    3: {
      label: 'Proficient',
      description: 'Consistently demonstrates this capability independently.'
    },
    4: {
      label: 'Advanced',
      description: 'Strong capability. Can guide others and handle complex situations.'
    },
    5: {
      label: 'Expert',
      description: 'Exceptional capability. Sets standards and leads innovation in this area.'
    }
  } as const;
  
  export const ratingScale = {
    min: 1,
    max: 5,
    step: 0.5
  } as const;
  
  export type RatingValue = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  
  export const getRatingLabel = (value: number): string => {
    const floorValue = Math.floor(value) as keyof typeof ratingDescriptions;
    if (Number.isInteger(value)) {
      return ratingDescriptions[floorValue].label;
    }
    return `${ratingDescriptions[floorValue].label}+`;
  };