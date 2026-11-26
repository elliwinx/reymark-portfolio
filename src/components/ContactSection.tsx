import { useState, type FormEvent } from 'react';
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { profile } from '../data/portfolioData';

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [name, setName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('OJT / Internship Inquiry');
  const [message, setMessage] = useState('');
  const [submittedNote, setSubmittedNote] = useState<string | null>(null);

  const handleCopy = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Fallback ignored if clipboard permission is unavailable
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bodyLines = [
      `Hello Reymark,`,
      '',
      message.trim(),
      '',
      `From: ${name.trim()} (${senderEmail.trim()})`,
    ];
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject.trim() || 'OJT / Internship Inquiry',
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailtoUrl;
    setSubmittedNote(
      `Your email client has been opened with a pre-filled draft to ${profile.email}.`,
    );
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
              06 · Contact
            </p>
            <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Open for OJT &amp; Internship Opportunities
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
              Interested in connecting regarding Data Analysis, Systems Analysis, QA, or
              Web Development internships? Reach out directly via email, phone, or
              LinkedIn.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex min-w-0 items-center gap-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-ink)]"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[var(--accent-ink)]" />
                  <span className="truncate">{profile.email}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(profile.email, 'email')}
                  aria-label="Copy email address"
                  className="inline-flex shrink-0 items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="h-3 w-3 text-[var(--accent-ink)]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3">
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="flex items-center gap-3 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-ink)]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[var(--accent-ink)]" />
                  <span>{profile.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  aria-label="Copy phone number"
                  className="inline-flex shrink-0 items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2 py-1 text-[11px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="h-3 w-3 text-[var(--accent-ink)]" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                <MapPin className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                <span>{profile.location}</span>
              </div>

              <div className="flex gap-3 pt-1">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-7"
            >
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Send a Message
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Compose an OJT inquiry directly to {profile.email}.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Dela Cruz"
                    className="mt-1.5 w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="recruiter@company.com"
                    className="mt-1.5 w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--text-secondary)]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share internship role details, schedule, or interview availability..."
                  className="mt-1.5 w-full resize-y rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                />
              </div>

              {submittedNote && (
                <p className="mt-3 rounded-md border border-[var(--border-hairline)] bg-[var(--accent-soft)] px-3 py-2 text-xs text-[var(--accent-ink)]">
                  {submittedNote}
                </p>
              )}

              <div className="mt-5 flex items-center justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
                >
                  <Send className="h-4 w-4" />
                  Compose Email
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
