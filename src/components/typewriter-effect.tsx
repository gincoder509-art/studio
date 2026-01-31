'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type TypewriterEffectProps = {
  staticText: string;
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delay?: number;
  className?: string;
};

export function TypewriterEffect({
  staticText,
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  delay = 2000,
  className,
}: TypewriterEffectProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      const shouldDelete = isDeleting;

      if (shouldDelete) {
        setText((current) => current.substring(0, current.length - 1));
      } else {
        setText((current) => currentWord.substring(0, current.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        // Pause at end of word
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <h2 className={cn('text-xl md:text-2xl font-medium text-foreground/90 min-h-[2.2em]', className)}>
      <span className="text-primary">{staticText}</span>{' '}
      <span className="font-bold">{text}</span>
      <span className="blinking-cursor text-primary">|</span>
    </h2>
  );
}
