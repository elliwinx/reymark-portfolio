import { Download, ExternalLink, Printer, X } from 'lucide-react';
import {
  achievements,
  education,
  experience,
  organizations,
  profile,
  projects,
  skillGroups,
} from '../data/portfolioData';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  if (!open) return null;

  const hasRenderedPages = profile.resumePages && profile.resumePages.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 shadow-xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="no-print flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
          <div>
            <p className="font-mono-meta text-xs uppercase tracking-wider text-[var(--accent-ink)]">
              Curriculum Vitae · PDF Resume
            </p>
            <h2
              id="resume-modal-title"
              className="font-serif-editorial text-xl font-medium text-[var(--text-primary)]"
            >
              {profile.name}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {profile.resumeUrl ? (
              <>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open PDF
                </a>
                <a
                  href={profile.resumeUrl}
                  download="Reymark_Levita_Resume.pdf"
                  className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download PDF
                </a>
              </>
            ) : (
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
              >
                <Printer className="h-3.5 w-3.5" />
                Print / Save PDF
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {hasRenderedPages ? (
          <div className="mt-5 space-y-5">
            {profile.resumePages.map((pageUrl, idx) => (
              <div
                key={pageUrl}
                className="overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-white shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-[var(--border-hairline)] bg-[var(--bg-page)] px-3.5 py-1.5">
                  <span className="font-mono-meta text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    Page {idx + 1} of {profile.resumePages.length}
                  </span>
                </div>
                <img
                  src={pageUrl}
                  alt={`${profile.name} Resume Page ${idx + 1}`}
                  className="w-full bg-white object-contain"
                />
              </div>
            ))}
          </div>
        ) : profile.resumeUrl ? (
          <div className="mt-5 overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-white">
            <iframe
              src={`${profile.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title={`${profile.name} Resume PDF`}
              className="h-[72vh] w-full"
            />
          </div>
        ) : (
          <div className="mt-6 space-y-6 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
            <div className="flex items-center gap-4 border-b border-[var(--border-hairline)] pb-4">
              <img
                src={profile.avatarUrl}
                alt={`${profile.name} formal portrait`}
                className="h-16 w-16 shrink-0 rounded-lg border border-[var(--border-hairline)] bg-white object-cover object-top"
              />
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{profile.name}</h3>
                <p className="font-medium text-[var(--accent-ink)]">{profile.positioning}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {profile.location} · {profile.email} · {profile.phone} · {profile.githubHandle} ·{' '}
                  {profile.linkedinHandle}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Education
              </h4>
              <div className="mt-2 space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex flex-wrap justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {edu.degree}
                        {edu.specialization ? ` (${edu.specialization})` : ''}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">{edu.institution}</p>
                    </div>
                    <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Experience
              </h4>
              {experience.map((exp) => (
                <div key={exp.id} className="mt-2">
                  <div className="flex flex-wrap justify-between gap-2">
                    <p className="font-semibold text-[var(--text-primary)]">
                      {exp.role} — {exp.organization}
                    </p>
                    <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs">
                    {exp.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Featured Projects
              </h4>
              <div className="mt-2 space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex flex-wrap justify-between gap-2">
                      <p className="font-semibold text-[var(--text-primary)]">
                        {proj.title} — {proj.subtitle}
                      </p>
                      <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                        {proj.timeframe}
                      </span>
                    </div>
                    <p className="text-xs">{proj.summary}</p>
                    <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">
                      Roles: {proj.roles.join(', ')} · Stack: {proj.techStack.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                Technical Skills
              </h4>
              <div className="mt-2 space-y-1 text-xs">
                {skillGroups.map((group) => (
                  <p key={group.category}>
                    <strong className="text-[var(--text-primary)]">{group.category}:</strong>{' '}
                    {group.items.join(', ')}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Achievements
                </h4>
                <ul className="mt-1.5 space-y-1 text-xs">
                  {achievements.map((a) => (
                    <li key={a.id}>
                      <strong className="text-[var(--text-primary)]">{a.placement}</strong> –{' '}
                      {a.title} ({a.date})
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  Organizations
                </h4>
                <ul className="mt-1.5 space-y-1 text-xs">
                  {organizations.map((o) => (
                    <li key={o.id}>
                      {o.role} – {o.organization} ({o.period})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
