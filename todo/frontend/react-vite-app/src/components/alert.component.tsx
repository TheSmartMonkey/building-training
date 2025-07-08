type AlertProps = {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

export function AlertComponent({ type, message }: AlertProps) {
  const getAlertStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-100 border-red-400 text-red-700';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-700';
      case 'warning':
        return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      case 'info':
        return 'bg-blue-100 border-blue-400 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-700';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  return (
    <div className={`border rounded px-4 py-3 mb-4 ${getAlertStyles()}`} role="alert">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2">{getIcon()}</span>
          <span className="font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
}
