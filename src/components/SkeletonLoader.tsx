// FILE: src/components/SkeletonLoader.tsx
import type { FC } from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`} />
  );
};
