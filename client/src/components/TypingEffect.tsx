import { useEffect, useState, useCallback } from 'react';

/**
 * Design System: Liquid Glass Futurism
 * Typing Effect Component - Dynamic text animation for hero section
 * - Supports single string OR array of strings (cycling mode)
 * - Smooth character-by-character reveal with blinking cursor
 * - Delete animation when cycling between strings
 * - Configurable speed, delete speed, and pause duration
 */

interface TypingEffectProps {
  /** Single string or array of strings to cycle through */
  text: string | string[];
  /** Typing speed in ms per character */
  speed?: number;
  /** Delete speed in ms per character (only used in cycling mode) */
  deleteSpeed?: number;
  /** Pause duration in ms before deleting (only used in cycling mode) */
  pauseDuration?: number;
  className?: string;
}

export function TypingEffect({
  text,
  speed = 50,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className = '',
}: TypingEffectProps) {
  const texts = Array.isArray(text) ? text : [text];
  const isCycling = texts.length > 1;

  const [displayedText, setDisplayedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'done'>('typing');

  const currentFullText = texts[textIndex];

  // Reset when text prop changes
  useEffect(() => {
    setDisplayedText('');
    setTextIndex(0);
    setPhase('typing');
  }, [text]);

  const advanceToNextText = useCallback(() => {
    setTextIndex((prev) => (prev + 1) % texts.length);
    setPhase('typing');
  }, [texts.length]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing':
        if (displayedText.length < currentFullText.length) {
          timer = setTimeout(() => {
            setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
          }, speed);
        } else if (isCycling) {
          setPhase('pausing');
        } else {
          setPhase('done');
        }
        break;

      case 'pausing':
        timer = setTimeout(() => {
          setPhase('deleting');
        }, pauseDuration);
        break;

      case 'deleting':
        if (displayedText.length > 0) {
          timer = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, deleteSpeed);
        } else {
          advanceToNextText();
        }
        break;

      case 'done':
        // Single string completed — no more animation
        break;
    }

    return () => clearTimeout(timer);
  }, [displayedText, currentFullText, phase, speed, deleteSpeed, pauseDuration, isCycling, advanceToNextText]);

  const showCursor = phase !== 'done';

  return (
    <span className={className}>
      {displayedText}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] bg-indigo-500 ml-0.5 align-middle"
          style={{
            animation: 'cursor-blink 1s step-end infinite',
          }}
        />
      )}
    </span>
  );
}
