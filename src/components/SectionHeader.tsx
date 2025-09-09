// FILE: src/components/SectionHeader.tsx
import type { FC } from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  isWhite?: boolean;
}

export const SectionHeader: FC<SectionHeaderProps> = ({ title, subtitle, isWhite }) => {
  const titleColorClass = isWhite ? 'text-white' : 'text-accent-blue';
  const subtitleColorClass = isWhite ? 'text-white' : 'text-texto-secundario';

  return (
    <div className="text-center mb-[60px] max-w-4xl mx-auto">
      <h2 className={`text-4xl font-bold ${titleColorClass}`}>{title}</h2>
      <p className={`text-lg mt-2 ${subtitleColorClass}`}>{subtitle}</p>
    </div>
  );
};
