import { GraduationCap } from 'lucide-react';
import { education, profile } from '../data/portfolioData';

export function AboutEducation() {
  return (
    <section id="about" className="border-b border-[var(--border-hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
              01 · About
            </p>
            <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Analytical thinking backed by hands-on delivery.
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[15px]">
              {profile.aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
              Education
            </p>
            <h3 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Academic Foundation
            </h3>

            <div className="mt-5 space-y-4">
              {education.map((item) => (
                <article
                  key={item.id}
                  className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-ink)]" />
                      <div>
                        <h4 className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                          {item.degree}
                        </h4>
                        {item.specialization && (
                          <p className="text-xs font-medium text-[var(--accent-ink)] sm:text-sm">
                            {item.specialization}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-mono-meta rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-2.5 text-sm text-[var(--text-secondary)]">
                    {item.institution}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{item.location}</p>

                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="mt-3 space-y-1 border-t border-[var(--border-hairline)] pt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
