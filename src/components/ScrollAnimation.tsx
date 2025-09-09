// FILE: src/components/ScrollAnimation.tsx
import type { FC, ReactNode } from 'react';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

export const ScrollAnimation: FC<ScrollAnimationProps> = ({ children, className }) => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const baseClasses = 'transition-all duration-700 ease-out';
  const initialClasses = 'opacity-0 translate-y-5';
  const finalClasses = 'opacity-100 translate-y-0';

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${isIntersecting ? finalClasses : initialClasses} ${className || ''}`}
    >
      {children}
    </div>
  );
};
