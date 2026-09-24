/*
 * Muted, looping background-style video that costs nothing until it is
 * about to be seen.
 *
 * - No src until half the video is on screen, so the page load never
 *   downloads it (these clips are 3-8 MB, a lot on mobile data).
 * - Pauses when scrolled out of view and resumes when back, saving battery.
 * - Shows the poster image until the first frame is ready.
 * - Mute toggle has a 44px tap target for phones.
 */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  /** Size of the speaker icon inside the mute button. */
  iconSize?: number;
}

export default function LazyVideo({ src, poster, className = "", iconSize = 18 }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (typeof IntersectionObserver === "undefined") {
      video.src = src;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.src = src;
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      // Start only once half the video is on screen. Videos that begin just
      // below the first screen on phones would otherwise download on page load.
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <>
      <video
        ref={videoRef}
        poster={poster}
        muted={isMuted}
        loop
        playsInline
        preload="none"
        className={className}
      />
      <button
        type="button"
        onClick={() => {
          const next = !isMuted;
          setIsMuted(next);
          if (videoRef.current) videoRef.current.muted = next;
        }}
        className="absolute bottom-3 right-3 w-11 h-11 flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-all duration-300 shadow-lg"
        style={{ zIndex: 2 }}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
      </button>
    </>
  );
}
