import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center p-1">
            <div className="relative h-5 w-5">
              
                <div className="absolute inset-0 rounded-full border-2 border-zinc-200 dark:border-zinc-800" />
                
              
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-blue-600 border-t-transparent border-r-transparent shadow-sm" />
            </div>
        </div>
    );
};

export default LoadingSpinner;