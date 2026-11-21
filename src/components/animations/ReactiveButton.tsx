'use client';

import React, { useRef } from 'react';
import { ClickSpark } from './ClickSpark';

export interface ReactiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  enableSpark?: boolean;
  sparkColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const ReactiveButton: React.FC<ReactiveButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  enableSpark = true,
  sparkColor,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Determine variant styling with guaranteed high contrast & crisp visibility
  let variantClasses = '';
  let defaultSparkColor = '#D95D39';

  switch (variant) {
    case 'primary':
      variantClasses =
        'bg-brand text-white border border-brand/90 shadow-sm hover:bg-brand-hover hover:shadow active:scale-[0.98] active:translate-y-0.5';
      defaultSparkColor = '#FFFFFF';
      break;
    case 'secondary':
      variantClasses =
        'bg-[#EFECE6] text-[#1E1B18] border border-[#DDD6CC] shadow-sm hover:bg-[#E5E0D8] hover:border-[#C4BCB3] active:scale-[0.98] active:translate-y-0.5';
      defaultSparkColor = '#D95D39';
      break;
    case 'outline':
      variantClasses =
        'bg-transparent text-current border border-current/30 hover:bg-white/10 active:scale-[0.98] active:translate-y-0.5';
      defaultSparkColor = '#D95D39';
      break;
    case 'ghost':
      variantClasses =
        'bg-transparent text-ink hover:bg-canvas-subtle border border-transparent active:scale-[0.98] active:translate-y-0.5';
      defaultSparkColor = '#D95D39';
      break;
    case 'danger':
      variantClasses =
        'bg-[#DC2626] text-white border border-red-700 shadow-sm hover:bg-[#B91C1C] active:scale-[0.98] active:translate-y-0.5';
      defaultSparkColor = '#FFFFFF';
      break;
  }

  // Determine size styling
  let sizeClasses = '';
  switch (size) {
    case 'sm':
      sizeClasses = 'h-[34px] px-3.5 text-xs gap-1.5';
      break;
    case 'md':
      sizeClasses = 'h-[42px] px-5 text-xs gap-2';
      break;
    case 'lg':
      sizeClasses = 'h-[48px] px-7 text-xs sm:text-sm gap-2.5';
      break;
  }

  const buttonElement = (
    <button
      ref={buttonRef}
      disabled={disabled}
      onClick={onClick}
      className={`
        relative select-none font-mono uppercase tracking-tight font-bold rounded
        transition-all duration-150 ease-out cursor-pointer
        disabled:opacity-50 disabled:pointer-events-none disabled:transform-none
        flex items-center justify-center
        ${variantClasses}
        ${sizeClasses}
        ${className}
      `.trim()}
      {...props}
    >
      {leftIcon && <span className="shrink-0 transition-transform group-hover:scale-105">{leftIcon}</span>}
      <span className="flex items-center gap-1.5 whitespace-nowrap">{children}</span>
      {rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </button>
  );

  // Wrap with ClickSpark if enabled (NO cursor-following Magnet!)
  if (enableSpark && !disabled) {
    return (
      <ClickSpark
        sparkColor={sparkColor || defaultSparkColor}
        sparkCount={8}
        sparkRadius={24}
        sparkSize={6}
      >
        {buttonElement}
      </ClickSpark>
    );
  }

  return buttonElement;
};

export default ReactiveButton;