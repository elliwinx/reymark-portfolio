import { useEffect, useState } from 'react';
import { AboutEducation } from './components/AboutEducation';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { ExperienceSection } from './components/ExperienceSection';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsAndHonors } from './components/SkillsAndHonors';
import { profile, type CertificateItem } from './data/portfolioData';

export function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle('dark', next);
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {
        // Ignore storage restrictions
      }
      return next;
    });
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setResumeOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main>
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onSelectCertificate={(cert) => setSelectedCertificate(cert)}
        />
        <AboutEducation />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsAndHonors />
        <CertificatesSection
          selectedCertificate={selectedCertificate}
          onSelectCertificate={setSelectedCertificate}
        />
        <ContactSection />
      </main>

      <footer className="no-print border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 px-5 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#top" className="hover:text-[var(--text-primary)]">
              Back to top
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)]"
            >
              GitHub
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text-primary)]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}

export default App;
