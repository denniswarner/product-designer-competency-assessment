# Product Design Competency Assessment - Project Summary

## Project Structure
- Created with Vite + React + TypeScript + Tailwind CSS
- Main components located in src/components/
- Constants and types in respective directories

## Key Components

### 1. Landing Page (LandingPage.tsx)
- Initial form for assessment type selection
- Fields:
  - Assessment Type (Self/Manager)
  - Full Name
  - Current Role Level
  - Department
  - Manager's Name (for self-assessments)

### 2. Assessment Form (AssessmentForm.tsx)
- Two-column layout
- Left sidebar:
  - Progress tracking
  - Role scoring
- Main content:
  - Role level header with blue (#7CB9E8) background
  - Competency sections

### 3. Strategic Thinking Section (StrategicThinkingSection.tsx)
- Rating system using horizontal sliders (0-5 scale)
- Two-column layout:
  - Left: Competency descriptions
  - Right: Slider and score
- Right-aligned score summary

### 4. Rating Components
- SliderRating.tsx for individual ratings
- Support for 0.5 increments
- Score display in grey box

## Styling Details
- Main title: text-4xl
- Role level: text-3xl in blue (#7CB9E8) background
- Section titles: text-2xl
- Content padding: px-8 for horizontal spacing

## Key Files to Reference
```typescript
src/
├── components/
│   ├── assessment/
│   │   ├── AssessmentForm.tsx
│   │   ├── StrategicThinkingSection.tsx
│   │   ├── SliderRating.tsx
│   ├── layout/
│   │   └── TwoColumnLayout.tsx
├── constants/
│   ├── roleCompetencies/
│   │   ├── productDesigner/
│   │   ├── productDesignerII/
├── types/
│   └── assessment.types.ts