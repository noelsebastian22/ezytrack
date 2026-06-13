import { useEffect, useRef, useState, useCallback } from "react";
import { siteContent } from "@/data/siteContent";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const { title, subtitle, images } = siteContent.gallery;

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.onload = () => setLoaded((prev) => new Set(prev).add(image.src));
      img.onerror = () => {
        setLoaded((prev) => new Set(prev).add(image.src));
        setErrors((prev) => new Set(prev).add(image.src));
      };
      img.src = image.src;
    });
  }, []);

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    requestAnimationFrame(() => {
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    });
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "Tab") {
        const lightbox = lightboxRef.current;
        if (!lightbox) return;

        const focusable = lightbox.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const closeButton = lightboxRef.current?.querySelector("button");
    closeButton?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="w-full bg-surface py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <h2
            className={`text-3xl font-bold text-text-primary md:text-4xl ${
              visible ? "animate-fade-in-up" : "opacity-0"
            }`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 text-lg text-text-secondary ${
              visible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            {subtitle}
          </p>
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg text-text-muted">No gallery images available yet.</p>
          </div>
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => openLightbox(index)}
                className={`group mb-6 block w-full cursor-pointer overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 ${
                  visible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
                aria-label={`View ${image.alt}`}
              >
                <div className="relative overflow-hidden rounded-2xl bg-surface-muted">
                  {errors.has(image.src) ? (
                    <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-muted">
                      <span className="text-sm text-text-muted">Image unavailable</span>
                    </div>
                  ) : loaded.has(image.src) ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-muted border-t-brand" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-text-inverse">{image.alt}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          onClick={handleBackdropClick}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-text-inverse transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Close"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={goPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-text-inverse transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-text-inverse transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>

          {errors.has(images[lightboxIndex].src) ? (
            <div className="flex items-center justify-center rounded-lg bg-white/5 px-8 py-12 text-text-inverse-muted">
              Image unavailable
            </div>
          ) : (
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-full max-w-full rounded-lg object-contain"
              onError={() => setErrors((prev) => new Set(prev).add(images[lightboxIndex].src))}
            />
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-text-inverse">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
