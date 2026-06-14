import { useState, useEffect, useRef, type FormEvent } from "react";
import { siteContent } from "@/data/siteContent";
import { CheckCircle, Loader2, ChevronDown } from "lucide-react";

type FormData = Record<string, string>;

type FormErrors = Record<string, string>;

type FormStatus = "idle" | "loading" | "success";

const qf = siteContent.quoteForm;

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  qf.fields.forEach((field) => {
    const value = data[field.name];
    if (field.required && !value.trim()) {
      errors[field.name] = `${field.label} is required`;
      return;
    }
    if (field.type === "email" && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[field.name] = "Please enter a valid email address";
    }
    if (field.type === "tel" && value.trim() && !/^[\d\s+\-()]{6,}$/.test(value)) {
      errors[field.name] = "Please enter a valid phone number";
    }
  });

  return errors;
}

export default function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    const initial: FormData = {};
    qf.fields.forEach((f) => {
      initial[f.name] = "";
    });
    return initial;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleChange(name: string, value: string) {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    // Stub handler — replace with Zoho integration later
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // eslint-disable-next-line no-console
    console.log("Form submitted:", formData);

    setStatus("success");
  }

  if (status === "success") {
    return (
      <section id="quote-form" className="w-full bg-surface-muted py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-surface rounded-2xl p-12 md:p-16 shadow-float">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-success-background text-success mb-6">
              <CheckCircle className="size-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              {qf.successTitle}
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              {qf.successMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="quote-form"
      className={`w-full bg-surface-muted py-16 md:py-24 ${
        visible ? "animate-fade-in-up" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            {qf.sectionTitle}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {qf.sectionSubtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-surface rounded-2xl p-8 md:p-12 shadow-float">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {qf.fields
                .filter((f) => f.type !== "textarea" && f.type !== "select")
                .map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`field-${field.name}`}
                      className="block text-sm font-medium text-text-primary mb-1.5"
                    >
                      {field.label}
                      {field.required && (
                        <span className="text-brand ml-0.5">*</span>
                      )}
                    </label>
                    <input
                      id={`field-${field.name}`}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full rounded-lg border px-4 py-2.5 text-text-primary placeholder:text-text-muted bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand ${
                        errors[field.name] ? "border-brand" : "border-border"
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="text-sm text-brand mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
            </div>

            {qf.fields
              .filter((f) => f.type === "select")
              .map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-brand ml-0.5">*</span>
                    )}
                  </label>
                  <div className="relative">
                    <select
                      id={`field-${field.name}`}
                      value={formData[field.name]}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      className={`w-full rounded-lg border px-4 py-2.5 text-text-primary bg-surface appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand ${
                        errors[field.name] ? "border-brand" : "border-border"
                      } ${!formData[field.name] ? "text-text-muted" : ""}`}
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-text-muted" />
                  </div>
                  {errors[field.name] && (
                    <p className="text-sm text-brand mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

            {qf.fields
              .filter((f) => f.type === "textarea")
              .map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={`field-${field.name}`}
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-brand ml-0.5">*</span>
                    )}
                  </label>
                  <textarea
                    id={`field-${field.name}`}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className={`w-full rounded-lg border px-4 py-2.5 text-text-primary placeholder:text-text-muted bg-surface transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand ${
                      errors[field.name] ? "border-brand" : "border-border"
                    }`}
                  />
                  {errors[field.name] && (
                    <p className="text-sm text-brand mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full md:w-auto rounded-full bg-brand text-brand-foreground px-10 py-3 font-semibold hover:bg-brand-hover transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === "loading" && (
                  <Loader2 className="size-5 animate-spin" />
                )}
                {status === "loading" ? "Sending…" : qf.submitLabel}
              </button>
              <p className="text-sm text-text-muted mt-3">{qf.privacyNote}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
