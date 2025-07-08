import { ChipComponent, ChipProps } from './chip.component';

type CardProps = {
  title: string;
  description: string;
  completed: boolean;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  chips?: ChipProps[];
};

export function CardComponent({ title, description, completed, className = '', onClick, hover = true, chips }: CardProps) {
  const baseClasses = 'bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-300' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  const combinedClasses = `${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`.trim();

  const defaultChips: ChipProps[] = [
    {
      label: completed ? 'Completed' : 'Pending',
      variant: completed ? 'success' : 'warning',
      size: 'sm',
    },
  ];

  const displayChips = chips || defaultChips;

  return (
    <div className={combinedClasses} onClick={onClick}>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {displayChips.map((chip, index) => (
            <ChipComponent key={index} label={chip.label} variant={chip.variant} size={chip.size} onClick={chip.onClick} />
          ))}
        </div>
      </div>
    </div>
  );
}
