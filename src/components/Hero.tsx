import React, { useRef, useEffect, useState } from 'react';
import { HeroCTA } from './HeroCTA';

interface HeroProps {
  videoSrc?: string;
  posterSrc?: string;
}

export const Hero: React.FC<HeroProps> = ({
  videoSrc = `${import.meta.env.BASE_URL}hero-video.mp4`,
  posterSrc = `${import.meta.env.BASE_URL}hero-last-frame.jpg`,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasEndedRef = useRef<boolean>(false);
  const hasStartedRef = useRef<boolean>(false);
  const [ctaVisible, setCtaVisible] = useState<boolean>(true);
  const [buttonLeft, setButtonLeft] = useState<number | null>(null);

  // Dynamic alignment calculation to match video's internal text column exactly
  useEffect(() => {
    const calculateTextAlignment = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const videoAspect = 16 / 9; // 1280x720 original resolution
      const containerAspect = vw / vh;

      let renderedWidth: number;
      let renderedLeft: number;

      if (vw < 640) {
        // Mobile portrait (object-contain)
        if (containerAspect > videoAspect) {
          renderedWidth = vh * videoAspect;
          renderedLeft = (vw - renderedWidth) / 2;
        } else {
          renderedWidth = vw;
          renderedLeft = 0;
        }
      } else {
        // Desktop / Tablet (object-cover)
        if (containerAspect > videoAspect) {
          renderedWidth = vw;
          renderedLeft = 0;
        } else {
          renderedWidth = vh * videoAspect;
          renderedLeft = (vw - renderedWidth) / 2;
        }
      }

      // In the 1280x720 video, the text column leftmost pixel starts at ~8.05% of width
      const textOffset = renderedWidth * 0.0805;
      const calculatedLeft = Math.round(renderedLeft + textOffset);

      // Ensure minimum margin on smaller viewports
      setButtonLeft(Math.max(20, calculatedLeft));
    };

    calculateTextAlignment();
    window.addEventListener('resize', calculateTextAlignment);
    return () => window.removeEventListener('resize', calculateTextAlignment);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If already marked as ended, freeze at final frame
    if (hasEndedRef.current) {
      video.pause();
      if (video.duration) {
        video.currentTime = video.duration;
      }
      return;
    }

    const handleEnded = () => {
      hasEndedRef.current = true;
      setCtaVisible(true);
      if (video) {
        video.pause();
        if (video.duration && !isNaN(video.duration)) {
          video.currentTime = video.duration;
        }
      }
    };

    const handleTimeUpdate = () => {
      // Guard against browsers that halt just shy of duration
      if (video.duration && video.currentTime >= video.duration - 0.08) {
        handleEnded();
      }
    };

    // Strict one-time playback constraints
    video.loop = false;
    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    // Automatic unmuted audio playback strategy
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      video.muted = false;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks sound before any user interaction,
          // play muted initially so video runs without delay, and auto-unmute
          // upon ANY user gesture (touch, scroll, click, keydown, pointer)
          video.muted = true;
          video.play().catch(() => {});

          const autoUnmuteOnGesture = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
            }
            window.removeEventListener('pointerdown', autoUnmuteOnGesture);
            window.removeEventListener('click', autoUnmuteOnGesture);
            window.removeEventListener('keydown', autoUnmuteOnGesture);
            window.removeEventListener('scroll', autoUnmuteOnGesture);
            window.removeEventListener('touchstart', autoUnmuteOnGesture);
          };

          window.addEventListener('pointerdown', autoUnmuteOnGesture, { once: true });
          window.addEventListener('click', autoUnmuteOnGesture, { once: true });
          window.addEventListener('keydown', autoUnmuteOnGesture, { once: true });
          window.addEventListener('scroll', autoUnmuteOnGesture, { once: true });
          window.addEventListener('touchstart', autoUnmuteOnGesture, { once: true });
        });
      }
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen h-screen flex flex-col justify-end overflow-hidden bg-[#07090e]"
      aria-label="Hero Section"
    >
      {/* 
        HERO VIDEO BACKGROUND
        100% Crystal clear video rendering with zero darkening filters or blurry overlays.
        Plays once, audio supported automatically, holds final frame permanently.
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-contain sm:object-cover object-center select-none"
          style={{
            imageRendering: 'crisp-edges',
          }}
          onEnded={() => {
            hasEndedRef.current = true;
            setCtaVisible(true);
          }}
        />

        {/* Minimal subtle bottom edge blend */}
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-[#07090e] to-transparent pointer-events-none" />
      </div>

      {/* 
        HERO CTA BUTTONS
        Positioned with precision to align directly with the video's embedded text column.
        Lowered into the negative space with zero overlap on text or character.
      */}
      <div
        className="absolute bottom-6 sm:bottom-8 lg:bottom-10 z-10 transition-all duration-300"
        style={{
          left: buttonLeft !== null ? `${buttonLeft}px` : '8%',
        }}
      >
        <div className="w-full sm:max-w-md">
          <div
            className={`transition-all duration-700 ease-out transform ${
              ctaVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
          >
            <HeroCTA />
          </div>
        </div>
      </div>
    </section>
  );
};
