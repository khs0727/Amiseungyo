import * as React from 'react';

import { TEAMSTYLES } from '@/constants/teams';
import { TeamNames, useThemeStore } from '@/store/theme-store';
import cn from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const team = useThemeStore((state) => state.team as unknown as TeamNames);

    const teamStyles = TEAMSTYLES[team] || TEAMSTYLES.default;
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-lg ring-offset-white file:border-0 file:text-slate-400 file:bg-transparent file:text-lg file:font-medium placeholder: focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 placeholder:text-slate-400',
          teamStyles.focus,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
