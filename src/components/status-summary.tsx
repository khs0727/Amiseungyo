import { TEAMSTYLES } from '@/constants/teams';
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

  const teamStyles = TEAMSTYLES[team] || TEAMSTYLES['default'];

  return (
    <main
      className={`flex justify-center items-start max-w-full w-screen h-screen ${teamStyles.bg.light}`}
    >
      <div className={`w-[1200px] mt-20 mx-10 p-5 border-4 border-dashed ${teamStyles.border}`}>
        {/*총 경기수*/}
        <div className="mb-4">
          <h3 className="text-3xl text-zinc-600 underline">총 직관 경기 수</h3>
          <p className="text-xl text-zinc-500">{userData.totalGames}</p>
        </div>

        {/*응원하는 팀의 승률*/}
        <div className="mb-4">
          <h3 className="text-3xl text-zinc-600 underline">나의 승률</h3>
          <p className="text-xl text-zinc-500">
            {(userData.teamWinningPercentage * 100).toFixed(2)}%
          </p>
        </div>

        {/*최근 기록한 경기*/}
        <div className="mb-4">
          <h3 className="text-3xl text-zinc-600 underline">최근 직관 경기</h3>
          <ul className="text-xl text-zinc-500">
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
          <h3 className="text-3xl text-zinc-600 underline">Highlight Moments</h3>
          <ul className="text-xl text-zinc-500">
            {userData.highlightMoments.map((moment, index) => (
              <li key={index}>
                <strong>{moment.date}:</strong> {moment.game} - {moment.moment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
