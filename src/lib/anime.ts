'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { animate, stagger, remove, JSAnimation } from 'animejs';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Animate children elements with a buttery smooth, zero-jank staggered entrance.
 * Uses useIsomorphicLayoutEffect to eliminate FOUC (Flash of Unstyled Content) and
 * gentle 6px transform with 200ms cubic-bezier curve for instant responsiveness.
 */
export function useStaggerEntrance(
  containerRef: React.RefObject<HTMLElement | null>,
  childSelector: string,
  deps: any[] = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;
    const targets = containerRef.current.querySelectorAll(childSelector);
    if (!targets.length) return;

    remove(targets);
    animate(targets, {
      opacity: [0, 1],
      translateY: [6, 0],
      delay: stagger(16),
      duration: 200,
      ease: 'outCubic',
    });
  }, [containerRef, childSelector, ...deps]);
}

/**
 * Smooth pop / pulse animation when an item or counter updates
 */
export function animatePulse(element: HTMLElement | null) {
  if (!element) return;
  remove(element);
  animate(element, {
    scale: [1, 1.04, 1],
    duration: 200,
    ease: 'outQuad',
  });
}

/**
 * Receipt paper slide-in effect for newly added order rows
 */
export function animateReceiptSlip(element: HTMLElement | null) {
  if (!element) return;
  remove(element);
  animate(element, {
    translateX: [8, 0],
    opacity: [0, 1],
    duration: 180,
    ease: 'outCubic',
  });
}

/**
 * KDS ticket drop animation with subtle tactile bounce
 */
export function animateTicketDrop(element: HTMLElement | null) {
  if (!element) return;
  remove(element);
  animate(element, {
    translateY: [-8, 0],
    opacity: [0, 1],
    scale: [0.98, 1],
    duration: 220,
    ease: 'outCubic',
  });
}

/**
 * Voice Equalizer bars dynamic simulation
 */
export function useVoiceWave(containerRef: React.RefObject<HTMLElement | null>, active: boolean) {
  const animRef = useRef<JSAnimation | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const bars = containerRef.current.querySelectorAll('.voice-bar');
    if (!bars.length) return;

    if (active) {
      animRef.current = animate(bars, {
        scaleY: () => Math.floor(Math.random() * 80 + 20) / 100,
        duration: () => Math.floor(Math.random() * 200 + 250),
        alternate: true,
        loop: true,
        ease: 'inOutQuad',
        delay: stagger(60),
      });
    } else {
      if (animRef.current) {
        animRef.current.pause();
      }
      animate(bars, {
        scaleY: 0.15,
        duration: 200,
        ease: 'outQuad',
      });
    }

    return () => {
      if (animRef.current) animRef.current.pause();
    };
  }, [containerRef, active]);
}

export { animate, stagger, remove };
