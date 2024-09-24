import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';
import app from '@/lib/firebase';

const auth = getAuth(app);

export default async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    return NextResponse.json({ id: user.uid, email: user.email }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: '로그인 중 오류가 발생하였습니다.' }, { status: 401 });
  }
}
