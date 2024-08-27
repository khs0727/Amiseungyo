import { TEAMCOLORS } from '@/constants/teams';
import { TeamNames, useThemeStore } from '@/store/theme-store';

//임시 데이터
const userData = {
  totalGames: 25,
  teamWinningPercentage: 0.68,
  recentGames: [
    { date: '2024-08-20', teams: '롯데 vs 한화', score: '3-5', isWin: true },
    { date: '2024-08-15', teams: '삼성 vs 한화', score: '4-2', isWin: false },
    { date: '2024-08-10', teams: '한화 vs 두산', score: '3-1', isWin: true },
  ],
  highlightMoments: [
    { game: '두산 vs 한화', moment: '역전승', date: '2024-08-20' },
    { game: '롯데 vs 한화', moment: 'No-hitter', date: '2024-08-10' },
  ],
};

export default function StatusSummary() {
  const team = useThemeStore((state) => state.team as TeamNames);

  const navClass = TEAMCOLORS[team] || TEAMCOLORS['default'];
  return (
    <main className={`max-w-full w-screen ${navClass}`}>
      <div>AmISeungyo?</div>

      {/*총 경기수*/}
      <div className="mb-4">
        <h3>총 직관 경기 수</h3>
        <p>{userData.totalGames}</p>
      </div>

      {/*응원하는 팀의 승률*/}
      <div className="mb-4">
        <h3>나의 승률</h3>
        <p>{(userData.teamWinningPercentage * 100).toFixed(2)}%</p>
      </div>

      {/*최근 기록한 경기*/}
      <div className="mb-4">
        <h3>최근 직관 경기</h3>
        <ul>
          {userData.recentGames.map((game, index) => (
            <li key={index}>
              <strong>{game.date}:</strong> {game.teams} - {game.score} (
              {game.isWin ? 'Win' : 'Lose'})
            </li>
          ))}
        </ul>
      </div>

      {/*하이라이트 경기*/}
      <div className="mb-4">
        <h3>Highlight Moments</h3>
        <ul>
          {userData.highlightMoments.map((moment, index) => (
            <li key={index}>
              <strong>{moment.date}:</strong> {moment.game} - {moment.moment}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
