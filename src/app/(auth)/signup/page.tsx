'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import DropdownList from './_components/dropdown-list';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useThemeStore } from '@/store/theme-store';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '@/lib/firebase.js';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from '@/store/auth-store';

const FormSchema = z
  .object({
    email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
    password: z
      .string()
      .min(8, {
        message: '비밀번호는 최소 8자 이상이어야 합니다.',
      })
      .regex(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/, {
        message: '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
      }),
    passwordConfirmation: z.string(),
    team: z.string().min(1, { message: '팀을 선택해주세요.' }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

type FormValues = z.infer<typeof FormSchema>;

export default function SingupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const { setTeam } = useThemeStore();

  const router = useRouter();
  const auth = getAuth(app);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
      team: '팀을 선택해주세요.',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      setTeam(values.team);

      toast.success('회원가입에 성공하였습니다.');
      router.push('/signin');
    } catch {
      toast.error('회원가입에 실패하였습니다.');
    }
  };

  return (
    <div className="flex items-center justify-center w-screen min-h-screen px-5">
      <div className="flex flex-col items-center w-full max-w-[500px]">
        <Link href="/">
          <h1 className="text-4xl mb-8">AmISeungyo</h1>
        </Link>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="이메일을 입력해주세요."
                      className="text-lg"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 입력해주세요."
                        className="text-lg"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        asChild
                        variant="icon"
                        size="auto"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        <span className="absolute top-1.5 right-4">
                          {showPassword ? (
                            <AiFillEye color={'#9FA6B2'} size={22} className="hover:fill-[#ddd]" />
                          ) : (
                            <AiFillEyeInvisible
                              color={'#9FA6B2'}
                              size={22}
                              className="hover:fill-[#ddd]"
                            />
                          )}
                        </span>
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        placeholder="비밀번호를 다시 입력해주세요."
                        className="text-lg"
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        asChild
                        variant="icon"
                        size="auto"
                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                        type="button"
                      >
                        <span className="absolute top-1.5 right-4">
                          {showPassword ? (
                            <AiFillEye color={'#9FA6B2'} size={22} className="hover:fill-[#ddd]" />
                          ) : (
                            <AiFillEyeInvisible
                              color={'#9FA6B2'}
                              size={22}
                              className="hover:fill-[#ddd]"
                            />
                          )}
                        </span>
                      </Button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="team"
              render={({ field }) => (
                <DropdownList value={field.value} onChange={(value) => field.onChange(value)} />
              )}
            />

            <Button
              size="lg"
              type="submit"
              className="w-full text-lg"
              disabled={form.formState.isSubmitting}
            >
              가입하기
            </Button>
          </form>
        </Form>
        <span className="flex mt-5 gap-3 justify-center">
          이미 회원이십니까?
          <Link href="/signin">
            <p className="text-violet-600 underline decoration-solid cursor-pointer">로그인 하기</p>
          </Link>
        </span>
      </div>
    </div>
  );
}
