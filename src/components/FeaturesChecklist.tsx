import { useEffect, useRef, useState, type ComponentType } from "react";
import { siteContent } from "@/data/siteContent";
import { Check, MapPin, Gauge, Bell } from "lucide-react";

const { title, subtitle, items, ctaText, mockups } = siteContent.featuresChecklist;
const ctaHref = "#quote-form";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  MapPin,
  Gauge,
  Bell,
};

export default function FeaturesChecklist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

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

  return (
    <section
      ref={sectionRef}
      id="features"
      className="w-full bg-surface-dark py-16 md:py-24"
      aria-label="Features"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              className={`text-3xl font-bold text-text-inverse md:text-4xl ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-4 text-lg text-text-inverse-muted ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "100ms" }}
            >
              {subtitle}
            </p>

            <ul className="mt-8 space-y-4">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-4 ${
                    visible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success">
                    <Check className="size-4 text-surface-dark" strokeWidth={3} />
                  </span>
                  <span className="text-base text-text-inverse/90">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href={ctaHref}
              className={`inline-flex items-center justify-center rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover mt-10 ${
                visible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: "800ms" }}
            >
              {ctaText}
            </a>
          </div>

          {/* Map illustration */}
          <div
            className={`relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border-dark bg-[#0D1117] lg:aspect-[5/4] lg:max-w-full ${
              visible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <svg
              className="h-full w-full"
              viewBox="0 0 500 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 37.5}
                  x2={500}
                  y2={i * 37.5}
                  stroke="#1C1F26"
                  strokeWidth="0.5"
                />
              ))}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={i * 38.46}
                  y1={0}
                  x2={i * 38.46}
                  y2={375}
                  stroke="#1C1F26"
                  strokeWidth="0.5"
                />
              ))}

              {/* Route lines — primary */}
              <path d="M40,340 L150,200 L280,120 L420,60" stroke="#E60000" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
              <path d="M420,60 L470,80" stroke="#E60000" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />

              {/* Route lines — secondary */}
              <path d="M60,60 L180,60 L250,160 L380,140 L480,180" stroke="#2A2E39" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" opacity="0.6" />
              <path d="M180,60 L250,160" stroke="#2A2E39" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
              <path d="M30,160 L80,140 L140,240 L250,280" stroke="#2A2E39" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" opacity="0.5" />

              {/* Major roads */}
              <line x1={0} y1={200} x2={500} y2={180} stroke="#1C1F26" strokeWidth="3" />
              <line x1={180} y1={0} x2={200} y2={375} stroke="#1C1F26" strokeWidth="3" />
              <line x1={380} y1={0} x2={370} y2={375} stroke="#1C1F26" strokeWidth="2.5" />

              {/* Vehicle markers */}
              {[
                { x: 150, y: 200 }, { x: 280, y: 120 }, { x: 420, y: 60 },
                { x: 80, y: 140 }, { x: 250, y: 280 }, { x: 200, y: 90 },
                { x: 340, y: 240 }, { x: 440, y: 300 },
              ].map((pos, i) => (
                <g key={`v-${i}`}>
                  <circle cx={pos.x} cy={pos.y} r="5" fill="#E60000" opacity="0.15" />
                  <circle cx={pos.x} cy={pos.y} r="2.5" fill="#E60000" />
                  {(i === 0 || i === 1 || i === 2) && (
                    <circle cx={pos.x} cy={pos.y} r="7" fill="none" stroke="#E60000" strokeWidth="1" opacity="0.3">
                      <animate attributeName="r" from="7" to="12" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}

              {/* Destination marker */}
              <circle cx={470} cy={80} r="6" fill="none" stroke="#E60000" strokeWidth="2" />
              <circle cx={470} cy={80} r="2" fill="#E60000" />
            </svg>

            {/* Stat overlay chips */}
            <div className="absolute inset-0 z-10">
              {mockups.map((mockup, index) => {
                const Icon = iconMap[mockup.iconName] ?? MapPin;
                const style: React.CSSProperties = {};
                if (mockup.position.top) style.top = mockup.position.top;
                if (mockup.position.bottom) style.bottom = mockup.position.bottom;
                if (mockup.position.left) style.left = mockup.position.left;
                if (mockup.position.right) style.right = mockup.position.right;

                return (
                  <div
                    key={mockup.id}
                    className={`absolute rounded-xl border border-border-dark bg-surface-dark-elevated/90 px-4 py-3 backdrop-blur-sm shadow-float ${
                      visible ? "animate-fade-in-up" : "opacity-0"
                    }`}
                    style={{ ...style, animationDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10">
                        <Icon className="size-4 text-brand" />
                      </div>
                      <div>
                        <p className="text-xs text-text-inverse-muted">{mockup.label}</p>
                        <p className="text-lg font-bold text-text-inverse">{mockup.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
