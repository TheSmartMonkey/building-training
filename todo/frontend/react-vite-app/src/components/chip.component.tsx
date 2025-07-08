export type ChipProps = {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function ChipComponent({ label, variant = 'default', size = 'md', className = '', onClick, disabled = false }: ChipProps) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border';

  const variantClasses = {
    default: 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600',
    success: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700',
    error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700',
    info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const interactiveClasses = onClick && !disabled ? 'cursor-pointer hover:shadow-md transition-shadow duration-200' : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClasses = [baseClasses, variantClasses[variant], sizeClasses[size], interactiveClasses, disabledClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={combinedClasses} onClick={disabled ? undefined : onClick}>
      {label}
    </span>
  );
}
