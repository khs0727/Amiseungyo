'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useAuthStore from '@/store/auth-store';

const FormSchema = z.object({
  email: z.string().email({ message: '유효한 이메일 주소를 입력해주세요.' }),
  password: z
    .string()
    .min(8, {
      message: '비밀번호는 최소 8자 이상이어야 합니다.',
    })
    .regex(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/, {
      message: '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
    }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post('/api/login', {
        email: values.email,
        password: values.password,
      });

      const user = response.data;

      login({ id: user.id, email: user.email });
      localStorage.setItem('userId', user.id);

      toast.success('로그인에 성공하였습니다.');
      router.push('/');
    } catch {
      toast.error('로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen px-5">
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
                            <AiFillEye color="#9FA6B2" size={22} className="hover:fill-[#ddd]" />
                          ) : (
                            <AiFillEyeInvisible
                              color="#9FA6B2"
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

            <Button
              size="lg"
              type="submit"
              className="w-full text-lg"
              disabled={form.formState.isSubmitting}
            >
              로그인하기
            </Button>
          </form>
        </Form>
        <span className="flex mt-5 gap-3 justify-center">
          아직 회원이 아니십니까?
          <Link href="/signup">
            <p className="text-violet-600 underline decoration-solid cursor-pointer">
              회원가입 하기
            </p>
          </Link>
        </span>
      </div>
    </div>
  );
}
