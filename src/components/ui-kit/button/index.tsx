import { MouseEvent, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Spin } from "../spin";

export type onClickEvent = MouseEvent<HTMLButtonElement>
interface ButtonProps {
  className?: string;
  text: string;
  type?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: onClickEvent) => void
}
export const Button = ({ text, className, disabled, isLoading, type = 'primary', onClick }: ButtonProps) => {
  const style = useMemo(() => {
    switch (type) {
      case 'primary':
        return 'bg-violet-900 text-white'
      case 'secondary':
        return 'bg-transparent text-neutral-900'
      case 'tertiary':
        return 'bg-green-600 text-black'
      default:
        return ''
    }
  }, [type])
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(`h-fit flex items-center justify-center p-2 px-4 rounded-xl ${style} disabled:opacity-50 disabled:cursor-not-allowed`, className)}
    >{isLoading && <Spin />}{text}</button>
  )
}

export default Button