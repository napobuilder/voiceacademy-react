import type { FC, ReactElement } from 'react';

interface FeatureItemProps {
  icon: ReactElement;
  title: string;
  description: string;
  isWhite?: boolean;
}

export const FeatureItem: FC<FeatureItemProps> = ({ icon, title, description, isWhite }) => {
  const titleColor = isWhite ? 'text-white' : 'text-texto-principal';
  const descriptionColor = isWhite ? 'text-white' : 'text-texto-secundario';
  const iconBgColor = isWhite ? 'bg-white/20' : 'bg-gray-100';
  const shadowClass = isWhite ? 'drop-shadow-md' : '';

  return (
    <div className="flex items-start gap-6">
      <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${iconBgColor}`}>
        {isWhite ? <div className="text-white">{icon}</div> : icon}
      </div>
      <div className={`feature-text ${shadowClass}`}>
        <h3 className={`text-xl font-bold mb-2 ${titleColor}`}>{title}</h3>
        <p className={`${descriptionColor} leading-relaxed`}>{description}</p>
      </div>
    </div>
  );
};