export interface NavItem {
  id: string;
  label: string;
  category: string;
  path?: string;
  icon?: string;
  color?: string;
  description?: string;
  children?: NavItem[]; // For Dropdowns or Sidebar sections
}

export const navigationTree: NavItem[] = [
  {
    id: 'start-speaking',
    label: 'Start Speaking 🚀',
    category: 'speaking',
    icon: '🗣️',
    color: '#f59e0b',
    description: 'Begin your journey from Day 1',
    children: [
      { 
        id: 'dropdown-1', 
        label: 'Basic Speaking', 
        category: 'speaking',
        children: [
          { id: 'speak-day-1', label: 'Speak from Day 1', category: 'speaking', path: 'speaking/day1' },
          { id: 'think-in-english', label: 'Think in English', category: 'speaking', path: 'speaking/think' },
        ]
      },
      { 
        id: 'dropdown-2', 
        label: 'Important English Uses', 
        category: 'speaking',
        children: [
          { id: 'use-of-may', label: 'Use of May', category: 'speaking', path: 'grammar/grammar' },
          { id: 'use-of-can', label: 'Use of Can / Could', category: 'speaking', path: 'grammar/grammar' },
        ]
      }
    ]
  },
  {
    id: 'courses',
    label: 'Courses',
    category: 'education',
    icon: '📚',
    color: '#8b5cf6',
    description: 'Structured learning paths',
    children: [
      { id: 'beginner-course', label: 'Beginner Course', category: 'education' },
      { id: 'intermediate-course', label: 'Intermediate Course', category: 'education' },
      { id: 'advanced-course', label: 'Advanced Course', category: 'education' },
    ]
  },
  {
    id: 'daily-english',
    label: 'Daily English',
    category: 'daily',
    icon: '📅',
    color: '#10b981',
    description: 'Daily sentences and vocabulary',
    children: [
      { id: 'daily-sentences', label: 'Daily Sentences', category: 'daily' },
      { id: 'daily-conversation', label: 'Daily Conversations', category: 'daily' },
    ]
  },
  {
    id: 'grammar',
    label: 'Grammar',
    category: 'grammar',
    icon: '📖',
    color: '#3b82f6',
    description: 'Master the rules of English',
    children: [
      { 
        id: 'tense-section', 
        label: 'Tenses', 
        category: 'grammar',
        children: [
          { id: 'tense-intro', label: 'What is Tense?', category: 'grammar', path: 'grammar/tense' },
          { id: 'present-tense', label: 'Present Tense', category: 'grammar', path: 'grammar/tense' },
        ]
      },
      { id: 'noun-section', label: 'Noun', category: 'grammar', path: 'grammar/noun' },
    ]
  },
  {
    id: 'vocabulary',
    label: 'Vocabulary',
    category: 'knowledge',
    icon: '📝',
    color: '#ec4899',
    description: 'Expand your word bank'
  },
  {
    id: 'conversation',
    label: 'Conversation',
    category: 'speaking',
    icon: '💬',
    color: '#06b6d4',
    description: 'Practice real-life dialogues'
  },
  {
    id: 'practice',
    label: 'Practice',
    category: 'practice',
    icon: '🎯',
    color: '#ef4444',
    description: 'Test your skills'
  },
  {
    id: 'interview',
    label: 'Interview English',
    category: 'career',
    icon: '👔',
    color: '#475569',
    description: 'Prepare for your dream job'
  },
  {
    id: 'free-resources',
    label: 'Free Resources',
    category: 'others',
    icon: '🎁',
    color: '#10b981',
    description: 'PDFs and extra materials'
  }
];
