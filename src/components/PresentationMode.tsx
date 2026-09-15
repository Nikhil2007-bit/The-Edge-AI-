import React, { useState, useEffect } from 'react';
import { PRESENTATION_SLIDES } from '../data/proposalData';
import { ChevronLeft, ChevronRight, Maximize, Minimize, MessageSquare, X, Play, RotateCcw } from 'lucide-react';

interface PresentationModeProps {
  onExit: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ onExit }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = PRESENTATION_SLIDES[currentSlideIndex];
  const totalSlides = PRESENTATION_SLIDES.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        onExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div id="presentation-deck-view" className="fixed inset-0 z-50 bg-zinc-950 text-zinc-100 flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#059669_0%,transparent_35%)] opacity-20 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-10 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-emerald-400 font-semibold">
            NVIDIA Jetson Nano • Project Proposal Deck
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span>Slide {currentSlideIndex + 1} of {totalSlides}</span>
          <div className="h-4 w-px bg-zinc-800 mx-2" />
          <button
            id="toggle-speaker-notes-btn"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
              showSpeakerNotes
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                : 'border-zinc-800 hover:bg-zinc-900 text-zinc-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
          <button
            id="toggle-deck-fullscreen-btn"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Toggle fullscreen"
          >
            {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
          </button>
          <button
            id="exit-presentation-btn"
            onClick={onExit}
            className="p-1.5 rounded-lg border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors ml-2"
            title="Close presentation mode (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Card Content */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full my-6 z-10">
        <div className="rounded-3xl border border-zinc-800/90 bg-zinc-900/80 p-8 sm:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
            {slide.sectionNumber === 0 ? 'Proposal Overview' : `Section 0${slide.sectionNumber}`}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            {slide.title}
          </h1>
          <p className="text-base sm:text-lg text-emerald-400/90 font-medium mt-2">
            {slide.subtitle}
          </p>

          {/* Key bullets */}
          <div className="mt-8 space-y-3.5">
            {slide.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                <p className="text-base sm:text-lg text-zinc-200 leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          {/* Highlight Banner */}
          <div className="mt-8 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-sm font-medium flex items-center gap-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">
              Takeaway
            </span>
            <span>{slide.highlight}</span>
          </div>

          {/* Technical Specs Footer */}
          {slide.technicalDetails && slide.technicalDetails.length > 0 && (
            <div className="mt-6 pt-5 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-400">
              {slide.technicalDetails.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-emerald-500">▶</span>
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Speaker Notes Overlay Drawer */}
      {showSpeakerNotes && (
        <div className="fixed bottom-24 right-10 max-w-md w-full p-4 rounded-2xl bg-zinc-900 border border-emerald-500/40 shadow-2xl z-30 font-mono text-xs text-zinc-300 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-emerald-400 font-semibold">
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Presenter Speaking Notes</span>
            </div>
            <button onClick={() => setShowSpeakerNotes(false)} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="pt-2 text-zinc-300 leading-relaxed font-sans text-sm">
            {slide.speakerNotes}
          </p>
        </div>
      )}

      {/* Bottom Control Bar */}
      <div className="flex items-center justify-between z-10 pt-4 border-t border-zinc-800/80">
        <div className="flex items-center gap-1">
          {PRESENTATION_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex
                  ? 'w-8 bg-emerald-500'
                  : 'w-2 bg-zinc-800 hover:bg-zinc-700'
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            id="deck-prev-slide-btn"
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`px-4 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              currentSlideIndex === 0
                ? 'border-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            id="deck-next-slide-btn"
            onClick={nextSlide}
            disabled={currentSlideIndex === totalSlides - 1}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentSlideIndex === totalSlides - 1
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
