import Link from 'next/link';
import { Button } from './ui/button';

export default function HeroBanner() {
  return (
    <div className="bg-slate-950 max-w-full w-screen h-screen overflow-x-hidden">
      <div className="flex flex-col items-center py-40">
        <h2 className="text-white text-7xl animate-slide-in-left" style={{ animationDelay: '0ms' }}>
          Amiseungyo에 오신 것을 환영합니다!
        </h2>
        <p
          className="text-white text-3xl pt-7 pb-[60px] animate-slide-in-left opacity-0"
          style={{ animationDelay: '1.5s' }}
        >
          잊지 못할 야구 직관의 추억을 기록하고, 내가 진정한 승요인지 확인해보세요.
        </p>
        <div
          className="flex flex-col gap-8 animate-jump-in animate-once"
          style={{
            animationDelay: '4s',
          }}
        >
          <Link href="/signup" passHref>
            <Button size="lg" variant="outline" className="text-lg w-full">
              회원가입하기
            </Button>
          </Link>
          <Link href="/signin" passHref>
            <Button size="lg" variant="outline" className="text-lg w-full">
              로그인하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
