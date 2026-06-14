import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";
import { Check } from "lucide-react";

const { title, tabs } = siteContent.useCases;
const ctaHref = `mailto:${siteContent.global.contactEmail}?subject=Quote%20enquiry`;

export default function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const [isImageReady, setIsImageReady] = useState(true);
  const [imageError, setImageError] = useState(false);
  const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  // Preload all tab images so switching tabs never causes a layout jump
  useEffect(() => {
    tabs.forEach((tab) => {
      const img = new Image();
      img.src = tab.imageSrc;
    });
  }, []);

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
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Smoothly fade the image while the new tab image is confirmed cached
  useEffect(() => {
    if (!activeTab) return;

    setIsImageReady(false);
    setImageError(false);

    const img = new Image();
    img.src = activeTab.imageSrc;

    const handleLoad = () => setIsImageReady(true);
    const handleError = () => {
      setImageError(true);
      setIsImageReady(true);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.addEventListener("load", handleLoad);
      img.addEventListener("error", handleError);
    }

    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="w-full bg-surface-muted py-16 md:py-24"
      aria-label="Use cases"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2
          className={`text-center text-3xl font-bold text-text-primary md:text-4xl ${visible ? "animate-fade-in-up" : "opacity-0"
            }`}
        >
          {title}
        </h2>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 ${visible ? "animate-fade-in-up" : "opacity-0"
            }`}
          style={{ animationDelay: "100ms" }}
          role="tablist"
          aria-label="Industry use cases"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`usecase-panel-${tab.id}`}
                onClick={() => setActiveTabId(tab.id)}
                className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${isActive
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface text-text-secondary hover:bg-border"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          className={`relative mt-12 min-h-[420px] ${visible ? "animate-fade-in-up" : "opacity-0"}`}
          style={{ animationDelay: "200ms" }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              role="tabpanel"
              id={`usecase-panel-${tab.id}`}
              aria-labelledby={`usecase-tab-${tab.id}`}
              className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 transition-opacity duration-300 ease-in-out ${tab.id === activeTabId ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
                }`}
            >
              <div className="order-2 flex flex-col lg:order-1 lg:min-h-[420px]">
                <h3 className="text-2xl font-bold text-text-primary md:text-3xl">
                  {tab.headline}
                </h3>
                <p className="mt-4 text-lg text-text-secondary">
                  {tab.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {tab.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
                        <Check className="size-3 text-surface-dark" strokeWidth={3} />
                      </span>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={ctaHref}
                  className="mt-8 inline-flex items-center justify-center self-start rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
                >
                  {tab.ctaText}
                </a>
              </div>

              <div className="order-1 lg:order-2">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-float">
                  {imageError && tab.id === activeTabId ? (
                    <div className="flex h-full w-full items-center justify-center bg-surface-muted text-text-muted text-sm">
                      Image unavailable
                    </div>
                  ) : (
                    <img
                      src={tab.imageSrc}
                      alt={`${tab.label} example`}
                      className={`h-full w-full object-cover transition-opacity duration-500 ${tab.id === activeTabId && isImageReady ? "opacity-100" : "opacity-0"
                        }`}
                      loading="eager"
                      decoding="async"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
