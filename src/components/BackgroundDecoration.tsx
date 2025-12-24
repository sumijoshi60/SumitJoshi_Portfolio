import React from 'react';
export const BackgroundDecoration = () => {
  return <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Top-right circular pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#4A6741" d="M45,-78.1C58.3,-71.3,69.1,-58.9,77.8,-44.7C86.5,-30.4,93.2,-14.2,92.4,1.5C91.5,17.2,83.1,32.9,73.3,47.4C63.4,61.9,52.2,75.2,37.8,80.7C23.5,86.2,5.9,83.9,-10.2,79.3C-26.3,74.7,-41,67.9,-54.4,58.5C-67.8,49,-79.9,36.9,-85.5,22.2C-91,7.4,-89.9,-9.9,-83.7,-24.2C-77.5,-38.5,-66.1,-49.8,-53,-57.7C-39.8,-65.6,-24.9,-70.1,-9.3,-70.9C6.3,-71.7,31.7,-68.8,45,-78.1Z" transform="translate(100 100)" />
        </svg>
      </div>
      {/* Bottom-left wave pattern */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-5">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#2A4747" />
        </svg>
      </div>
      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 h-[400px] w-[1px] bg-sage-600/10"></div>
      <div className="absolute bottom-1/4 right-0 h-[1px] w-64 bg-sage-600/10"></div>
    </div>;
};