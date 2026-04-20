import React, { useState, useEffect, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?:{}|';

const TextScramble = ({ text, speed = 40, delay = 0, scrambleSpeed = 2 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            if (char === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }

      iteration += 1 / scrambleSpeed;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, scrambleSpeed]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, scramble]);

  return (
    <span className="font-mono">
      {displayText || text.split('').map(c => c === ' ' ? ' ' : '_').join('')}
    </span>
  );
};

export default TextScramble;
