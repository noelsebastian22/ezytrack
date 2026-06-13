import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/data/siteContent";

const { title, description, tabs } = siteContent.softwareShowcase;

export default function SoftwareShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const preloadRef = useRef<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const [isImageReady, setIsImageReady] = useState(false);

  // Preload all tab images so first tab switch doesn't flash
  useEffect(() => {
    tabs.forEach((tab) => {
      if (preloadRef.current.has(tab.imageSrc)) return;
      preloadRef.current.add(tab.imageSrc);
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

  // Fade the image while confirming the new tab image is cached
  useEffect(() => {
    const activeTab = tabs.find((t) => t.id === activeTabId);
    if (!activeTab) return;
    setIsImageReady(false);

    const img = new Image();
    img.src = activeTab.imageSrc;

    const handleDone = () => setIsImageReady(true);
    if (img.complete) {
      handleDone();
    } else {
      img.addEventListener("load", handleDone);
      img.addEventListener("error", handleDone);
    }
    return () => {
      img.removeEventListener("load", handleDone);
      img.removeEventListener("error", handleDone);
    };
  }, [activeTabId]);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="w-full bg-background py-16 md:py-24"
      aria-label="Software showcase"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl">
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
            {description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            className={`lg:col-span-4 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "200ms" }}
            role="tablist"
            aria-label="Software features"
          >
            <div className="space-y-2">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`w-full rounded-xl border-l-4 px-5 py-4 text-left transition-colors ${
                      isActive
                        ? "border-brand bg-surface-muted"
                        : "border-transparent hover:bg-surface-muted/50"
                    }`}
                  >
                    <span
                      className={`block text-base ${
                        isActive ? "font-bold text-text-primary" : "font-medium text-text-secondary"
                      }`}
                    >
                      {tab.label}
                    </span>
                    <span
                      className={`mt-1 block text-sm text-text-muted ${
                        isActive ? "block" : "hidden sm:block"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`relative lg:col-span-8 ${visible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-muted shadow-float">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  id={`panel-${tab.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${tab.id}`}
                  className={`absolute inset-0 transition-opacity duration-300 ease-in-out ${
                    tab.id === activeTabId ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={tab.imageSrc}
                    alt={`${tab.label} dashboard preview`}
                    className={`h-full w-full object-cover transition-opacity duration-300 ${
                      isImageReady ? "opacity-100" : "opacity-0"
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
