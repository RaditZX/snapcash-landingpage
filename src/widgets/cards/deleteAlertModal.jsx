import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Trash2 } from 'lucide-react';

const SuccessDeleteModal = ({ 
  isOpen, 
  onClose, 
  title = "Berhasil Dihapus!", 
  message = "Data telah berhasil dihapus dari sistem.",
  itemName = "",
  autoClose = true,
  autoCloseDelay = 3000
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 50);
      
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoCloseDelay);
        
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, autoClose, autoCloseDelay]);

    const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
        setIsVisible(false);
        onClose(); // bisa async juga kalau perlu
        window.location.reload();
    }, 300);
    };


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 p-4 ${
        isAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleOverlayClick}
    >
      <div className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ${
        isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Header with Animation */}
        <div className="relative p-6 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Animated Success Icon */}
          <div className="relative mx-auto mb-4">
            <div className={`w-16 h-16 bg-green-100 rounded-full flex items-center justify-center transform transition-all duration-500 ${
              isAnimating ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
            }`}>
              <CheckCircle className={`w-8 h-8 text-green-600 transition-all duration-700 delay-200 ${
                isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`} />
            </div>
            
            {/* Animated Checkmark */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 delay-300 ${
              isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <svg className="w-16 h-16" viewBox="0 0 64 64">
                <path
                  d="M20 32 L28 40 L44 24"
                  stroke="#10B981"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-700 delay-500 ${
                    isAnimating ? 'animate-pulse' : ''
                  }`}
                  style={{
                    strokeDasharray: isAnimating ? '0' : '100',
                    strokeDashoffset: isAnimating ? '0' : '100',
                    animation: isAnimating ? 'drawCheck 0.8s ease-in-out 0.5s forwards' : 'none'
                  }}
                />
              </svg>
            </div>
            
            {/* Ripple Animation */}
            <div className={`absolute inset-0 rounded-full border-2 border-green-300 transition-all duration-1000 ${
              isAnimating ? 'scale-150 opacity-0' : 'scale-100 opacity-100'
            }`} />
            <div className={`absolute inset-0 rounded-full border-2 border-green-200 transition-all duration-1000 delay-200 ${
              isAnimating ? 'scale-200 opacity-0' : 'scale-100 opacity-100'
            }`} />
          </div>

          <h3 className={`text-xl font-bold text-gray-900 mb-2 transform transition-all duration-500 delay-700 ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {title}
          </h3>
        </div>

        {/* Body */}
        <div className="px-6 pb-6">
          <p className={`text-gray-600 text-center mb-4 transform transition-all duration-500 delay-800 ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {message}
          </p>
          
          {itemName && (
            <div className={`bg-green-50 border border-green-200 rounded-md p-3 mb-4 transform transition-all duration-500 delay-900 ${
              isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="flex items-center">
                <Trash2 className="w-4 h-4 text-green-600 mr-2" />
                <div>
                  <p className="text-sm font-medium text-green-800">Item yang dihapus:</p>
                  <p className="text-sm text-green-700 font-semibold">{itemName}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className={`text-center transform transition-all duration-500 delay-1000 ${
            isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes drawCheck {
          0% {
            stroke-dasharray: 0, 100;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 100, 0;
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessDeleteModal;