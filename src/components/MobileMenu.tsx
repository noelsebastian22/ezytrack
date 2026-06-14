import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navigation: NavLink[];
  loginUrl: string;
  ctaText: string;
  ctaHref: string;
}

export default function MobileMenu({
  navigation,
  loginUrl,
  ctaText,
  ctaHref,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const toggle = () => {
    if (isOpen) {
      setClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setClosing(false);
      }, 180);
    } else {
      setIsOpen(true);
    }
  };

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 180);
  };

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-md p-2 text-text-primary transition-colors hover:bg-surface-muted"
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {isOpen && (
        <div className={`fixed inset-x-0 top-[calc(4.5rem+1px)] bottom-0 z-40 border-b border-border bg-background shadow-float ${
          closing ? "opacity-0 -translate-y-2 transition-all duration-200" : "animate-slide-down"
        }`}>
          <nav className="flex flex-col gap-4 p-4">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="text-lg font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-border pt-4">
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="rounded-full px-4 py-2 text-center text-base font-medium text-text-primary transition-colors hover:bg-surface-muted"
              >
                Login
              </a>
              <a
                href={ctaHref}
                onClick={close}
                className="rounded-full bg-brand px-6 py-2.5 text-center text-base font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
              >
                {ctaText}
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
