import SkeletonLoader from "../skeleton"

interface SkeletonWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
}

export const SkeletonWrapper = ({ children, isLoading, className }: SkeletonWrapperProps) => {

  if (isLoading) {
    return <SkeletonLoader className={className} />;
  }
  
  return <>{children}</>;
}