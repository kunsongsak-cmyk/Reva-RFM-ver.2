import React from 'react';

interface ToastProps {
  message: string;
  subMessage?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  visible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  subMessage,
  type = 'success',
  visible,
  onClose
}) => {
  if (!visible) return null;

  const iconName = 
    type === 'success' ? 'check_circle' : 
    type === 'warning' ? 'warning' : 
    type === 'error' ? 'error' : 'info';

  const iconBg = 
    type === 'success' ? 'bg-tertiary-fixed text-tertiary' : 
    type === 'warning' ? 'bg-amber-100 text-amber-800' : 
    type === 'error' ? 'bg-error-container text-error' : 'bg-primary-fixed text-primary';

  return (
    <div className="fixed top-20 right-8 z-[100] flex items-center gap-3 bg-surface-container-lowest text-on-surface px-4 py-3 rounded-xl shadow-2xl border border-outline-variant/30 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${iconBg}`}>
        <span className="material-symbols-outlined text-[20px]">{iconName}</span>
      </div>
      <div className="flex flex-col pr-3">
        <span className="font-label-md text-label-md font-semibold text-primary">{message}</span>
        {subMessage && (
          <span className="font-caption text-caption text-on-surface-variant">{subMessage}</span>
        )}
      </div>
      <button 
        onClick={onClose}
        className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
