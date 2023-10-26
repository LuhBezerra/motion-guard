import React from 'react';
import { twMerge } from 'tailwind-merge';

interface SkeletonLoaderProps {
  className?: string;
}
const SkeletonLoader = ({ className }: SkeletonLoaderProps) => {
  const skeletonClasses = `animate-pulse bg-gray-300 dark:bg-gray-600 mb-1`;
  return (
    <div className={className}>
      <div  className={twMerge('w-1/5 h-5',skeletonClasses)}/>
      <div  className={twMerge('w-full h-5',skeletonClasses)}/>
      <div  className={twMerge('w-3/4 h-5',skeletonClasses)}/>
      <div  className={twMerge('w-4/5 h-5',skeletonClasses)}/>
    </div>
  );
};

export default SkeletonLoader;
