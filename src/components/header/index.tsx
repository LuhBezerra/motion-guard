import { ReactElement, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <div className='h-64 w-full bg-violet-900 flex flex-col items-center pt-5 md:pt-10'>
    {children}
  </div>
)