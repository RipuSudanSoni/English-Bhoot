export interface NavItem {
  id: string;
  label: string;
  category: 'grammar' | 'speaking' | 'others';
  path: string;
  icon?: string;
  colorClass?: string;
  children?: NavItem[];
}

export const navigationTree: NavItem[] = [
  {
    id: 'grammar',
    label: 'English Grammar',
    category: 'grammar',
    path: 'grammar',
    children: [
      { id: 'types-of-grammar', label: 'Types of Grammar', category: 'grammar', path: 'grammar/grammar', icon: 'A', colorClass: 'bg-purple-100 text-purple-600' },
      { id: 'noun', label: 'Noun', category: 'grammar', path: 'grammar/noun', icon: 'N', colorClass: 'bg-amber-100 text-amber-600' },
      { id: 'tense', label: 'Tense', category: 'grammar', path: 'grammar/tense', icon: 'T', colorClass: 'bg-blue-100 text-blue-600' },
      { id: 'verb', label: 'Verb', category: 'grammar', path: 'grammar/verb', icon: 'V', colorClass: 'bg-rose-100 text-rose-600' },
      { id: 'test', label: 'Test', category: 'grammar', path: 'grammar/test', icon: 'TS', colorClass: 'bg-rose-100 text-rose-600' },
    ],
  },
  {
    id: 'speaking',
    label: 'Start Speaking',
    category: 'speaking',
    path: 'start-speaking',
    children: [
      { id: 'introduction', label: 'Introduction', category: 'speaking', path: 'start-speaking/intro' },
    ],
  },
];
