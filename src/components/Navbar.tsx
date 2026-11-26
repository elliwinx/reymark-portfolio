import { useState } from 'react';
import { FileText, Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/portfolioData';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ isDark, onToggleTheme, onOpenResume }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-page)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="group flex items-baseline gap-2.5 text-sm font-semibold tracking-tight text-[var(--text-primary)]"
        >
          <span className="font-serif-editorial text-lg font-medium tracking-normal">
            {profile.name}
          </span>
          <span className="hidden font-mono-meta text-[11px] font-normal text-[var(--text-muted)] sm:inline">
            OJT Portfolio
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)] sm:inline-flex"
          >
            <FileText className="h-3.5 w-3.5 text-[var(--accent-ink)]" />
            Resume
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border-hairline)] bg-[var(--bg-page)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
            >
              <FileText className="h-3.5 w-3.5 text-[var(--accent-ink)]" />
              View Resume Summary
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
