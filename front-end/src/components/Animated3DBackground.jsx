import { useEffect, useState, useMemo } from 'react';

export default function Animated3DBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const elements = useMemo(() => {
    if (!isClient) return [];
    
    const dustCount = 18;
    const leafCount = 12;
    const arr = [];
    
    // Gold Dust Particles
    for (let i = 0; i < dustCount; i++) {
      arr.push({
        id: `dust-${i}`,
        type: 'dust',
        style: {
          left: `${Math.random() * 100}%`,
          width: `${3 + Math.random() * 5}px`,
          height: `${3 + Math.random() * 5}px`,
          '--x-offset': `${(Math.random() - 0.5) * 150}px`,
          '--dur': `${12 + Math.random() * 18}s`,
          '--delay': `${Math.random() * -20}s`,
          animation: 'float-dust var(--dur) infinite linear',
          animationDelay: 'var(--delay)',
          backgroundColor: 'var(--color-accent)',
          filter: 'blur(1px)',
          borderRadius: '50%',
          opacity: 0.3,
        }
      });
    }

    // Floating Leaves
    for (let i = 0; i < leafCount; i++) {
      arr.push({
        id: `leaf-${i}`,
        type: 'leaf',
        style: {
          left: `${Math.random() * 100}%`,
          width: `${15 + Math.random() * 20}px`,
          height: `${15 + Math.random() * 20}px`,
          '--x-offset': `${(Math.random() - 0.5) * 200}px`,
          '--dur': `${18 + Math.random() * 22}s`,
          '--delay': `${Math.random() * -25}s`,
          animation: 'float-leaf var(--dur) infinite linear',
          animationDelay: 'var(--delay)',
          opacity: 0.15,
        }
      });
    }

    return arr;
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-secondary">
      {/* Ambient glowing spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] rounded-full ambient-light-1"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full ambient-light-2"></div>
      
      {/* Particles and Leaves Container */}
      <div className="absolute inset-0 perspective-container">
        {elements.map((el) => {
          if (el.type === 'dust') {
            return (
              <div
                key={el.id}
                className="absolute"
                style={el.style}
              />
            );
          }
          
          return (
            <svg
              key={el.id}
              className="absolute text-primary-light"
              style={el.style}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17,8C8,8,4,16,4,16C4,16,9,14,14,14C19,14,20,10,20,10C20,10,19,8,17,8Z" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
