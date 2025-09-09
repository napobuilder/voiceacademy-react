import React, { type FC, type ReactNode } from 'react';

interface FeatureItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  iconClassName?: string;
  titleClassName?: string;
  textClassName?: string;
  isWhite?: boolean;
}

export const FeatureItem: FC<FeatureItemProps> = ({ icon, title, description, children, iconClassName, titleClassName, textClassName, isWhite }) => {
  const iconBgClass = isWhite ? 'bg-white/15' : 'bg-accent-blue-light';
  const titleColorClass = isWhite ? 'text-white' : 'text-accent-blue';
  const textColorClass = isWhite ? 'text-white/90' : 'text-secondary';
  const iconFillClass = isWhite ? 'fill-white' : 'fill-accent-blue';

  return (
    <div className="flex items-start gap-6">
      <div className={`flex-shrink-0 w-[60px] h-[60px] rounded-full flex items-center justify-center ${iconBgClass}`}>
        {React.cloneElement(icon as React.ReactElement, { className: `${(icon as React.ReactElement).props.className || ''} ${iconFillClass}` })}
      </div>
      <div className="feature-text">
        <h3 className={`text-[1.4rem] mb-2 ${titleColorClass}`}>{title}</h3>
        <p className={`mb-0 leading-relaxed ${textColorClass}`}>{description}</p>
        {children}
      </div>
    </div>
  );
};
