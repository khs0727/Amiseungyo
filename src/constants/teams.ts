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

export type TeamNames =
  | '기아 타이거즈'
  | '삼성 라이온즈'
  | 'LG 트윈스'
  | '두산 베어스'
  | 'SSG 랜더스'
  | 'KT 위즈'
  | '한화 이글스'
  | '롯데 자이언츠'
  | 'NC 다이노스'
  | '키움 히어로즈';

export const TEAMCOLORS: Record<TeamNames, string> = {
  '기아 타이거즈': 'team-기아 타이거즈-background',
  '삼성 라이온즈': 'team-삼성 라이온즈-background',
  'LG 트윈스': 'team-LG 트윈스-background',
  '두산 베어스': 'team-두산 베어스-background',
  'SSG 랜더스': 'team-SSG 랜더스-background',
  'KT 위즈': 'team-KT 위즈-background',
  '한화 이글스': 'team-한화 이글스-background',
  '롯데 자이언츠': 'team-롯데 자이언츠-background',
  'NC 다이노스': 'team-NC 다이노스-background',
  '키움 히어로즈': 'team-키움 히어로즈-background',
};
