export interface CompetencyArea {
    title: string;
    description?: string;
    criteria: {
      text: string;
      description?: string;
    }[];
  }
  
  export interface RoleCompetencies {
    title: string;
    description?: string;
    areas: {
      [key: string]: CompetencyArea;
    };
  }
  
  export const productDesignerCompetencies: RoleCompetencies = {
    title: "Product Designer",
    areas: {
      strategicThinking: {
        title: "Strategic Thinking & Domain Expertise",
        criteria: [
          {
            text: "Proactively identifies gaps or improvement areas in the problem definitions they are working in occasionally"
          },
          {
            text: "Understands the voice of the customer, and leverages research to make well-informed product decisions. Justifies ideas based on real evidence vs just intuition"
          },
          {
            text: "Starting to understand and recognize industry patterns and trends"
          },
          {
            text: "Awareness of what's happening with our competitors and within our industry for their use case area"
          }
        ]
      },
      craftAndQuality: {
        title: "Craft & Quality",
        criteria: [
          {
            text: "Takes the time to understand our design system and lean on existing patterns"
          },
          {
            text: "Understands and adheres to our org's design principles with a decreasing need for guidance"
          }
        ]
      },
      leadership: {
        title: "Leadership, Communication, & Collaboration",
        criteria: [
          {
            text: "Can facilitate cross-functional conversations between design, product, ops, and business"
          },
          {
            text: "Identifies challenges that arise during the course of research can effectively articulate the problem to stakeholders"
          },
          {
            text: "Learns our values and starts consciously applying these"
          }
        ]
      },
      teamCulture: {
        title: "Team Culture",
        criteria: [
          {
            text: "Regularly participates in research, design, and product team meetings, critiques, and events"
          },
          {
            text: "Seeks to provide actionable feedback to others projects when possible"
          },
          {
            text: "Participates in hiring processes as needed"
          }
        ]
      },
      independence: {
        title: "Independence & Growth Mindset",
        criteria: [
          {
            text: "Needs guidance in some areas"
          },
          {
            text: "Consistently seek out opportunities to improve"
          },
          {
            text: "Be resilient when you face setbacks"
          }
        ]
      }
    }
  };