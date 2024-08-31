export const TEAMS = [
  '기아 타이거즈',
  '삼성 라이온즈',
  'LG 트윈스',
  '두산 베어스',
  'SSG 랜더스',
  'KT 위즈',
  '한화 이글스',
  '롯데 자이언츠',
  'NC 다이노스',
  '키움 히어로즈',
];

export const TEAMSTYLES: Record<
  string,
  { bg: { light: string; dark: string }; border: string; text: string; focus: string }
> = {
  '기아 타이거즈': {
    bg: { light: 'bg-red-100', dark: 'bg-red-700' },
    border: 'border-red-700',
    text: 'text-red-700',
    focus: 'focus-visible:ring-red-800',
  },
  '삼성 라이온즈': {
    bg: { light: 'bg-blue-100', dark: 'bg-blue-500' },
    border: 'border-blue-500',
    text: 'text-blue-500',
    focus: 'focus-visible:ring-blue-800',
  },
  'LG 트윈스': {
    bg: { light: 'bg-pink-100', dark: 'bg-pink-800' },
    border: 'border-pink-800',
    text: 'text-pink-800',
    focus: 'focus-visible:ring-pink-800',
  },
  '두산 베어스': {
    bg: { light: 'bg-indigo-100', dark: 'bg-indigo-900' },
    border: 'border-indigo-900',
    text: 'text-indigo-900',
    focus: 'focus-visible:ring-indigo-800',
  },
  'SSG 랜더스': {
    bg: { light: 'bg-red-100', dark: 'bg-red-600' },
    border: 'border-red-600',
    text: 'text-red-600',
    focus: 'focus-visible:ring-red-800',
  },
  'KT 위즈': {
    bg: { light: 'bg-neutral-100', dark: 'bg-neutral-950' },
    border: 'border-neutral-950',
    text: 'text-neutral-950',
    focus: 'focus-visible:ring-neutral-800',
  },
  '한화 이글스': {
    bg: { light: 'bg-orange-100', dark: 'bg-orange-600' },
    border: 'border-orange-600',
    text: 'text-orange-600',
    focus: 'focus-visible:ring-orange-800',
  },
  '롯데 자이언츠': {
    bg: { light: 'bg-blue-100', dark: 'bg-blue-900' },
    border: 'border-blue-900',
    text: 'border-blue-900',
    focus: 'focus-visible:ring-blue-800',
  },
  'NC 다이노스': {
    bg: { light: 'bg-sky-100', dark: 'bg-sky-700' },
    border: 'border-sky-700',
    text: 'border-sky-700',
    focus: 'focus-visible:ring-sky-800',
  },
  '키움 히어로즈': {
    bg: { light: 'bg-pink-100', dark: 'bg-pink-700' },
    border: 'border-pink-700',
    text: 'border-pink-700',
    focus: 'focus-visible:ring-pink-800',
  },
  default: {
    bg: { light: 'bg-slate-100', dark: 'bg-slate-950' },
    border: 'border-slate-950',
    text: 'border-slate-950',
    focus: 'focus-visible:ring-slate-800',
  },
};
