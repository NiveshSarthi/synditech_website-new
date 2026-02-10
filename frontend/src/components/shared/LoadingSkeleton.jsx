import React from 'react';

const LoadingSkeleton = ({ 
  variant = 'card', 
  count = 1,
  className = '' 
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`card animate-pulse ${className}`}>
            <div className="w-16 h-16 bg-orange-500/20 rounded-xl mb-6" />
            <div className="h-6 bg-orange-500/20 rounded w-3/4 mb-4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-orange-500/10 rounded w-full" />
              <div className="h-4 bg-orange-500/10 rounded w-5/6" />
            </div>
            <div className="h-4 bg-orange-500/20 rounded w-1/3" />
          </div>
        );
      
      case 'text':
        return (
          <div className={`space-y-3 animate-pulse ${className}`}>
            <div className="h-4 bg-orange-500/20 rounded w-full" />
            <div className="h-4 bg-orange-500/20 rounded w-5/6" />
            <div className="h-4 bg-orange-500/20 rounded w-4/6" />
          </div>
        );
      
      case 'avatar':
        return (
          <div className={`flex items-center space-x-4 animate-pulse ${className}`}>
            <div className="w-12 h-12 bg-orange-500/20 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-orange-500/20 rounded w-1/2" />
              <div className="h-3 bg-orange-500/10 rounded w-1/3" />
            </div>
          </div>
        );
      
      case 'image':
        return (
          <div className={`w-full h-64 bg-orange-500/20 rounded-2xl animate-pulse ${className}`} />
        );
      
      default:
        return (
          <div className={`h-8 bg-orange-500/20 rounded animate-pulse ${className}`} />
        );
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
