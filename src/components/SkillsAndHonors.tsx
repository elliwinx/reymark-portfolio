import { Trophy, Users } from 'lucide-react';
import { achievements, organizations, skillGroups } from '../data/portfolioData';

export function SkillsAndHonors() {
  return (
    <section id="skills" className="border-b border-[var(--border-hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
            04 · Skills, Achievements &amp; Leadership
          </p>
          <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Technical Capabilities &amp; Campus Involvement
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5"
            >
              <h3 className="font-mono-meta text-xs font-medium uppercase tracking-wider text-[var(--accent-ink)]">
                {group.category}
              </h3>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2.5 py-1 text-xs font-medium text-[var(--text-primary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-[var(--accent-ink)]" />
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Competitions &amp; Achievements
              </h3>
            </div>
            <div className="mt-4 divide-y divide-[var(--border-hairline)]">
              {achievements.map((item) => (
                <div key={item.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono-meta rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent-ink)]">
                      {item.placement}
                    </span>
                    <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.venue}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--accent-ink)]" />
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Leadership &amp; Organizations
              </h3>
            </div>
            <div className="mt-4 divide-y divide-[var(--border-hairline)]">
              {organizations.map((org) => (
                <div key={org.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[var(--accent-ink)]">{org.role}</span>
                    <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                      {org.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                    {org.organization}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
