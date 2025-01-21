import React from 'react';

// Utility function to combine classNames
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const AlertIcon = () => (
  <svg 
    className="w-5 h-5" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CloseIcon = () => (
  <svg 
    className="w-4 h-4" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Alert = React.forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  onClose,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-blue-50 text-blue-700 border-blue-200',
    error: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    success: 'bg-green-50 text-green-700 border-green-200'
  };

  return (
    <div
      ref={ref}
      role="alert"
      className={classNames(
        'relative flex items-start p-4 mb-4 rounded-lg border',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex-shrink-0 mr-3">
        <AlertIcon />
      </div>
      <div className="flex-1">
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-3 -mt-1 -mr-1 p-1 rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

const AlertTitle = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <h5
    ref={ref}
    className={classNames('text-base font-medium mb-1', className)}
    {...props}
  >
    {children}
  </h5>
));

const AlertDescription = React.forwardRef(({ className = '', children, ...props }, ref) => (
  <div
    ref={ref}
    className={classNames('text-sm opacity-90', className)}
    {...props}
  >
    {children}
  </div>
));

Alert.displayName = 'Alert';
AlertTitle.displayName = 'AlertTitle';
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };