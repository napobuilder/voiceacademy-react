// FILE: src/components/InfoCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string; // Made optional
  details?: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[]; // Made optional
  buttonText: string; // Kept for other cards, but will be replaced by an icon for cards with personImage
  to: string;
  variant?: 'light' | 'dark';
  className?: string;
  style?: React.CSSProperties;
  personImage?: string; // New prop for the person's image
}

// Helper function to split title for two stripes
function splitTitleForTwoStripes(title: string): [string, string] {
  const words = title.split(' ');
  if (words.length <= 1) {
    return [title, '']; // Cannot split single word or empty string
  }

  let part1Words: string[] = [];
  let part2Words: string[] = [];
  let currentLength = 0;
  const targetLength = title.length / 2;

  for (let i = 0; i < words.length; i++) {
    if (currentLength + words[i].length + (i > 0 ? 1 : 0) <= targetLength) {
      part1Words.push(words[i]);
      currentLength += words[i].length + (i > 0 ? 1 : 0);
    } else {
      part2Words.push(words[i]);
    }
  }

  // If part1 is empty, or part2 is empty, or all words went to part1, adjust
  if (part1Words.length === 0 && words.length > 0) {
    part1Words.push(words[0]);
    part2Words = words.slice(1);
  } else if (part2Words.length === 0 && words.length > 1) {
    part2Words.push(part1Words.pop()!); // Move last word from part1 to part2
  }

  return [part1Words.join(' '), part2Words.join(' ')];
}


export function InfoCard({
  title,
  description,
  details,
  buttonText,
  to,
  variant = 'light',
  className = '',
  style,
  personImage
}: InfoCardProps) {
  
  const baseClasses = 'relative overflow-hidden rounded-lg shadow-suave p-8 pt-12 text-center flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg';
  
  const variantClasses = {
    light: {
      card: 'bg-fondo-seccion border border-gray-100',
      description: 'text-xl font-semibold text-texto-secundario',
      details: 'text-texto-secundario',
      detailsIcon: 'text-accent-orange',
      detailsStrong: 'text-texto-principal',
      button: 'bg-accent-orange text-white rounded-full hover:bg-accent-orange-hover'
    },
    dark: {
      card: 'card-texture',
      description: 'text-xl font-semibold text-texto-secundario',
      details: 'text-texto-secundario',
      detailsIcon: 'text-accent-orange',
      detailsStrong: 'text-texto-principal',
      button: 'bg-accent-orange text-white rounded-full hover:bg-accent-orange-hover'
    }
  };

  const styles = variantClasses[variant];

  // Determine which title style to use
  let titleContent;
  if (title.length <= 14) { // Short titles: single blue stripe
    titleContent = (
      <div className="mb-4 h-16 relative">
        <div className="absolute bottom-0 right-0 w-full h-10 md:h-12 bg-accent-blue flex items-center justify-center transform -rotate-2 px-4 shadow-lg">
          <h3 className="text-white text-3xl font-bold text-center whitespace-nowrap">
            {title.toUpperCase()}
          </h3>
        </div>
      </div>
    );
  } else if (title.length <= 30) { // Medium titles: two stripes
    const [part1, part2] = splitTitleForTwoStripes(title.toUpperCase());
    titleContent = (
      <div className="mb-4 h-20 relative"> {/* Increased height to accommodate two stripes */}
        {/* First stripe (blue, inclined) */}
        <div className="absolute top-0 right-0 w-full h-10 bg-accent-blue flex items-center justify-center transform -rotate-2 px-4 shadow-lg">
          <h3 className="text-white text-2xl font-bold text-center whitespace-nowrap">
            {part1}
          </h3>
        </div>
        {/* Second stripe (orange, not inclined) */}
        <div className="absolute bottom-0 right-0 w-full h-10 bg-accent-orange flex items-center justify-center px-4 shadow-lg">
          <h3 className="text-white text-2xl font-bold text-center whitespace-nowrap">
            {part2}
          </h3>
        </div>
      </div>
    );
  } else { // Very long titles: simple h3
    titleContent = (
      <h3 className={`text-2xl font-bold mb-4 text-accent-blue`}>{title}</h3>
    );
  }


  return (
    <div
      className={`${baseClasses} ${styles.card} ${className} ${personImage ? 'min-h-[460px]' : ''}`}
      style={style}
    >
      {titleContent}

      {description && (
        <p className={`mb-6 flex-grow ${styles.description}`}>{description}</p>
      )}

      {details && details.length > 0 && (
        <div className={`text-left text-xl mb-6 space-y-2 ${styles.details}`}>
          {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className={styles.detailsIcon}>{detail.icon}</span>
              <span><strong className={styles.detailsStrong}>{detail.label}:</strong> {detail.value}</span>
            </div>
          ))}
        </div>
      )}

      {personImage ? (
        <Link to={to} className={`absolute bottom-6 right-6 w-14 h-14 flex items-center justify-center ${styles.button} z-10 transition-transform hover:scale-110`}>
          <ArrowRightIcon className="w-6 h-6" />
        </Link>
      ) : (
        <Link to={to} className={`mt-auto py-2 px-6 block z-10 relative ${styles.button}`}>
          {buttonText}
        </Link>
      )}

      {personImage && (
        <img
          src={personImage}
          alt={`Instructor ${title}`}
          className="absolute bottom-0 -left-4 w-full max-w-[280px] pointer-events-none z-0"
        />
      )}
    </div>
  );
}