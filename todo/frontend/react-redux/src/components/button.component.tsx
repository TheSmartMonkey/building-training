import React from 'react';

type ButtonComponentProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function ButtonComponent({ type = 'button', children, onClick }: ButtonComponentProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 
    px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  );
}
