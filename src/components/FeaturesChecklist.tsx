import { useEffect, useRef, useState, type ComponentType } from "react";
import { siteContent } from "@/data/siteContent";
import { Check, MapPin, Gauge, Bell } from "lucide-react";

const { title, subtitle, items, ctaText, mockups } = siteContent.featuresChecklist;
const ctaHref = `mailto:${siteContent.global.contactEmail}?subject=Quote%20enquiry`;

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  MapPin,
  Gauge,
  Bell,
};

export default function FeaturesChecklist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

          <div className="relative mx-auto h-80 w-full max-w-md lg:h-96 lg:max-w-full">
            {mockups.map((mockup, index) => {
              const Icon = iconMap[mockup.iconName] ?? MapPin;
              const positionMap: Record<string, string> = {
                "mockup-1": "left-0 top-0 rotate-[-6deg]",
                "mockup-2": "right-4 top-16 rotate-[4deg] lg:right-8",
                "mockup-3": "left-8 bottom-0 rotate-[-3deg] lg:left-16",
              };

              return (
                <div
                  key={mockup.id}
                  className={`absolute w-56 rounded-2xl border border-border-dark bg-surface-dark-elevated p-5 shadow-float ${
                    positionMap[mockup.id] ?? ""
                  } ${visible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={{ animationDelay: `${300 + index * 150}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
                      <Icon className="size-5 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs text-text-inverse-muted">{mockup.label}</p>
                      <p className="text-xl font-bold text-text-inverse">{mockup.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
