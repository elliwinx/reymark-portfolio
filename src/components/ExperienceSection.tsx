import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { experience } from '../data/portfolioData';

export function ExperienceSection() {
  return (
    <section id="experience" className="border-b border-[var(--border-hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
            02 · Experience
          </p>
          <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Government &amp; Data Operations Experience
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          {experience.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-7"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-[var(--border-hairline)] pb-5 sm:flex-row sm:items-start">
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent-ink)]">
                    <Briefcase className="h-3.5 w-3.5" />
                    <span>{item.program}</span>
                  </div>
                  <h3 className="mt-1.5 text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                    {item.role}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[var(--text-secondary)]">
                    {item.organization}
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-xs text-[var(--text-muted)] sm:items-end">
                  <span className="inline-flex items-center gap-1.5 font-mono-meta text-[var(--text-secondary)]">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.summary}
              </p>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {item.responsibilities.map((task) => (
                  <li
                    key={task}
                    className="flex items-start gap-2.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3.5 py-2.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
