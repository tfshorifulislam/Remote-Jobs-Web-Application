import React from 'react';

const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative h-6 w-6">
              
                <div className="absolute inset-0 rounded-full border-[2.5px] border-zinc-200 dark:border-zinc-800" />
                
              
                <div className="absolute inset-0 animate-spin rounded-full border-[2.5px] border-primary border-t-transparent border-r-transparent" />
            </div>
        </div>
    );
};

export default Spinner;