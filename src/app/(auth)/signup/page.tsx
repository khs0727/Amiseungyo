'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { toast } from 'sonner';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormSchema = z
  .object({
    username: z
      .string()
      .min(2, {
        message: '유저 이름은 최소 2글자 이상이여야 합니다',
      })
      .max(10, { message: '유저 이름은 최대 10자 이하이어야 합니다.' }),
    password: z
      .string()
      .min(8, {
        message: '비밀번호는 최소 8자 이상이어야 합니다.',
      })
      .regex(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}/, {
        message: '비밀번호는 영어, 숫자, 특수문자를 모두 포함해야 합니다.',
      }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

type FormValues = z.infer<typeof FormSchema>;

export default function SingupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    toast.success('회원가입에 성공하였습니다.');
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen px-5">
      <div className="flex flex-col items-center w-full max-w-[500px]">
        <h1 className="text-4xl mb-8">AmISeungyo</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="사용할 이름을 입력해주세요."
                      className="text-lg"
                      autoComplete="username"
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
                        type={showPassword ? 'text' : 'password'}
                        placeholder="비밀번호를 다시 입력해주세요."
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
      </div>
    </div>
  );
}
