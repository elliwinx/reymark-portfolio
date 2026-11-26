import { useEffect, useState } from 'react';
import { ArrowUpRight, FolderGit2, Layers, X } from 'lucide-react';
import { projects, type ProjectItem } from '../data/portfolioData';

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    if (!activeProject) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject]);

  return (
    <section id="projects" className="border-b border-[var(--border-hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
            03 · Featured Projects
          </p>
          <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Applied Systems &amp; Capstone Engineering
          </h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Production-oriented academic and municipal systems where I contributed across requirements
            analysis, technical documentation, QA testing, and web development.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="flex flex-col justify-between rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--border-strong)]"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono-meta text-xs text-[var(--accent-ink)]">
                    {project.context} · {project.timeframe}
                  </span>
                </div>

                <h3 className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                  {project.subtitle}
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Stakeholder: {project.client}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {project.summary}
                </p>

                <div className="mt-5">
                  <p className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Roles
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 text-xs text-[var(--text-secondary)]"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="font-mono-meta text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                    Stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono-meta rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent-ink)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4">
                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                >
                  <Layers className="h-3.5 w-3.5 text-[var(--accent-ink)]" />
                  View Case Study
                </button>

                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  <FolderGit2 className="h-3.5 w-3.5" />
                  Repository
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
              <div>
                <p className="font-mono-meta text-xs text-[var(--accent-ink)]">
                  {activeProject.context} · {activeProject.timeframe}
                </p>
                <h3
                  id="project-modal-title"
                  className="font-serif-editorial mt-1 text-2xl font-medium text-[var(--text-primary)]"
                >
                  {activeProject.title} — {activeProject.subtitle}
                </h3>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Stakeholder: {activeProject.client}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close case study modal"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-5 text-sm leading-relaxed text-[var(--text-secondary)]">
              <div>
                <h4 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Problem Context
                </h4>
                <p className="mt-1.5">{activeProject.caseStudy.problem}</p>
              </div>

              <div>
                <h4 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Systems Approach
                </h4>
                <p className="mt-1.5">{activeProject.caseStudy.approach}</p>
              </div>

              <div>
                <h4 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  Key Deliverables &amp; Contributions
                </h4>
                <ul className="mt-2 space-y-2">
                  {activeProject.caseStudy.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)] p-4">
                <h4 className="font-mono-meta text-xs uppercase tracking-wider text-[var(--accent-ink)]">
                  Operational Impact
                </h4>
                <p className="mt-1 text-sm text-[var(--text-primary)]">
                  {activeProject.caseStudy.impact}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4">
              <div className="flex flex-wrap gap-1.5">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-meta rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent-ink)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={activeProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
              >
                Open GitHub Repo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
