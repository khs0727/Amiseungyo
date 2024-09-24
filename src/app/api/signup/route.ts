import { NextRequest, NextResponse } from 'next/server';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '@/lib/firebase';

const auth = getAuth(app);

// eslint-disable-next-line import/prefer-default-export
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    return NextResponse.json({ id: user.uid, email: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '회원가입 중 오류가 발생하였습니다.' }, { status: 400 });
  }
}
