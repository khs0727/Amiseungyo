interface ScoreCalculatorProps {
  team1Score: number;
  team2Score: number;
}

export interface ResultWithColor {
  result: string;
  color: string;
}

export default function ScoreCaculator({
  team1Score,
  team2Score,
}: ScoreCalculatorProps): ResultWithColor {
  if (team1Score > team2Score) {
    return { result: '승', color: 'red' };
  } else if (team1Score < team2Score) {
    return { result: '패', color: 'blue' };
  } else {
    return { result: '무', color: 'black' };
  }
}
