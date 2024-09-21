'use client';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';

import ProtectedRoute from '@/components/protected-route';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import { TEAMSTYLES } from '@/constants/teams';
import Nav from '@/components/nav';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import DropdownList from '@/app/(auth)/signup/_components/dropdown-list';
import { Textarea } from '@/components/ui/textarea';
import { useGameStore } from '@/store/game-store';
import FileInput from './_components/file-input';
import { useEffect, useState } from 'react';
import ScoreCaculator, { ResultWithColor } from '@/utils/score-calculator';

const FormSchema = z.object({
  date: z.date({ message: '날짜는 필수로 선택해야합니다.' }),
  team: z.string().min(1, { message: '팀은 필수로 선택해야합니다.' }),
  score: z.object({
    team1: z.number().min(0, { message: '팀 1의 점수는 필수로 입력해야합니다.' }),
    team2: z.number().min(0, { message: '팀 2의 점수는 필수로 입력해야합니다.' }),
  }),
  picture: z.string().optional(),
  player: z.string().optional(),
  review: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddGame() {
  const [scoreResult, setScoreResult] = useState<ResultWithColor | null>(null);

  const router = useRouter();
  const { addGame } = useGameStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      team: '',
      score: { team1: 0, team2: 0 },
      picture: undefined,
      player: '',
      review: '',
    },
  });

  useEffect(() => {
    const team1Score = form.getValues('score.team1');
    const team2Score = form.getValues('score.team2');
    const result = ScoreCaculator({ team1Score, team2Score });
    setScoreResult(result);
  }, [form.watch('score.team1'), form.watch('score.team2')]);

  const userId = localStorage.getItem('userId');
  const team = userId ? useThemeStore((state) => state.team[userId]) : undefined;

  const teamStyles = team ? TEAMSTYLES[team] : TEAMSTYLES['default'];

  const onSubmit = (values: FormValues) => {
    try {
      const gameId = uuidv4();

      addGame({
        ...values,
        id: gameId,
        scoreResult,
      });

      toast.success('등록이 완료되었습니다.');
      router.push('/my-games');
    } catch {
      toast.error('등록 중 오류가 발생하였습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <ProtectedRoute>
      <Nav />
      <div
        className={`flex items-center justify-center max-w-full w-screen ${teamStyles.bg.light} px-6 py-10`}
      >
        <div className="flex flex-col items-start w-full max-w-[700px]">
          <h2 className={`text-3xl underline mb-8 ${teamStyles.text}`}>경기 추가하기</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className={`text-xl ${teamStyles.text}`}>날짜*</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[200px] pl-3 text-left font-normal text-lg',
                              !field.value && 'text-slate-400',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: ko })
                            ) : (
                              <span className="text-lg text-slate-400 hover:text-slate-900">
                                날짜를 선택해주세요
                              </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-xl ${teamStyles.text}`}>상대 팀*</FormLabel>
                    <DropdownList
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      placeholder="팀을 선택해주세요"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className={`text-xl ${teamStyles.text}`}>스코어*</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="score.team1"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          placeholder="0"
                          className="w-12 text-lg"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />

                    <span className="text-lg">:</span>
                    <Controller
                      name="score.team2"
                      control={form.control}
                      render={({ field }) => (
                        <Input
                          placeholder="0"
                          className="w-12 text-lg"
                          {...field}
                          value={field.value || ''}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      )}
                    />
                    {scoreResult && (
                      <span className="pl-3 text-xl" style={{ color: scoreResult.color }}>
                        {scoreResult.result}
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormDescription>
                  반드시 본인 팀의 스코어를 첫번째 칸에 입력해주세요.
                </FormDescription>

                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FileInput field={field} label="사진" teamStyles={teamStyles} />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="player"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-xl ${teamStyles.text}`}>수훈 선수</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="오늘 가장 잘한 선수를 입력해주세요"
                        className="text-lg"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`text-xl ${teamStyles.text}`}>리뷰</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="주요 경기 내용을 기록해주세요"
                        className="text-lg"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="lg"
                type="submit"
                className={`w-full text-lg ${teamStyles.bg.dark}`}
                disabled={form.formState.isSubmitting}
              >
                추가하기
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
