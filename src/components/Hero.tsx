import { ArrowDownRight, Award, FileText, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile, type CertificateItem } from '../data/portfolioData';
import { HeroCardDeck } from './HeroCardDeck';

interface HeroProps {
  onOpenResume: () => void;
  onSelectCertificate?: (cert: CertificateItem) => void;
}

export function Hero({ onOpenResume, onSelectCertificate }: HeroProps) {
  return (
    <section
      id="top"
      className="border-b border-[var(--border-hairline)] pt-14 pb-16 sm:pt-20 sm:pb-22"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="order-2 md:order-1 md:col-span-7">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hairline)] bg-[var(--accent-soft)] px-3 py-1 font-mono-meta text-[11px] font-medium text-[var(--accent-ink)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {profile.availabilityBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
                <MapPin className="h-3.5 w-3.5" />
                {profile.location}
              </span>
            </div>

            <h1 className="font-serif-editorial mt-6 max-w-3xl text-4xl leading-[1.12] font-medium tracking-tight text-[var(--text-primary)] sm:text-5xl">
              {profile.name}
            </h1>

            <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-[var(--text-primary)] sm:text-lg">
              {profile.headline}
            </p>
            <p className="mt-1 max-w-3xl text-sm font-medium text-[var(--accent-ink)] sm:text-base">
              {profile.positioning}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
              {profile.heroSummary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
              >
                View Projects
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <a
                href="#certificates"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
              >
                <Award className="h-4 w-4 text-[var(--accent-ink)]" />
                Certificates
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
              >
                <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                Contact
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <FileText className="h-4 w-4" />
                Resume
              </button>
            </div>
          </div>

          <div className="order-1 md:order-2 md:col-span-5">
            <HeroCardDeck onSelectCertificate={onSelectCertificate} />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[var(--border-hairline)] pt-6 text-sm text-[var(--text-secondary)]">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
          >
            <Github className="h-4 w-4 text-[var(--text-muted)]" />
            <span>{profile.githubHandle}</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
          >
            <Linkedin className="h-4 w-4 text-[var(--text-muted)]" />
            <span>{profile.linkedinHandle}</span>
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--text-primary)]"
          >
            <Mail className="h-4 w-4 text-[var(--text-muted)]" />
            <span>{profile.email}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
