import app from '@/lib/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextResponse } from 'next/server';

const auth = getAuth(app);

export async function POST(req: NextResponse) {
  try {
    const { email, password } = await req.json();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    return NextResponse.json({ id: user.uid, email: user.email }, { status: 200 });
  } catch (error) {
    console.error('로그인 실패:', error);
    return NextResponse.json({ error: '로그인 중 오류가 발생하였습니다.' }, { status: 401 });
  }
}
