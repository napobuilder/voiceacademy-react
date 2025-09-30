// FILE: src/components/InstructorGalleryCard.tsx

interface InstructorGalleryCardProps {
  imageUrl: string;
  name: string;
  onClick: () => void;
}

export function InstructorGalleryCard({ imageUrl, name, onClick }: InstructorGalleryCardProps) {
  return (
    <div 
      className="flex-shrink-0 w-48 text-center cursor-pointer group" 
      onClick={onClick}
    >
      <div className="relative w-full h-56 overflow-hidden rounded-lg shadow-md transition-shadow duration-300 group-hover:shadow-xl">
        <img 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={imageUrl} 
          alt={`Foto de ${name}`}
        />
      </div>
      <h5 className="mt-3 text-md font-bold text-accent-blue transition-colors duration-300 group-hover:text-accent-orange">{name}</h5>
    </div>
  );
}
