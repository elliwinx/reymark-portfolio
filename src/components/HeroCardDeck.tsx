import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  X,
} from 'lucide-react';
import { certificates, profile, type CertificateItem } from '../data/portfolioData';

interface HeroCardDeckProps {
  onSelectCertificate?: (cert: CertificateItem) => void;
}

export function HeroCardDeck({ onSelectCertificate }: HeroCardDeckProps) {
  const [activeSlide, setActiveSlide] = useState<0 | 1>(0);
  const [walletOpen, setWalletOpen] = useState(false);

  useEffect(() => {
    if (!walletOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setWalletOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [walletOpen]);

  const verifiedCertificates = useMemo(
    () => certificates.filter((c) => c.status === 'Verified' && Boolean(c.certificateUrl)),
    [],
  );

  const verifiedCountPadded = String(verifiedCertificates.length).padStart(2, '0');

  // Pick up to 3 verified image certificates + Red Hat PDF for the wallet pocket peek
  const peekCertificates = useMemo(() => {
    const converge = verifiedCertificates.find((c) => c.id === 'convergeit-2026');
    const redhat = verifiedCertificates.find((c) => c.id === 'redhat-javaee-2026');
    const b4y = verifiedCertificates.find((c) => c.id === 'b4y-web3-2026');
    return [redhat, converge, b4y].filter((c): c is CertificateItem => Boolean(c));
  }, [verifiedCertificates]);

  const handlePrev = () => setActiveSlide((prev) => (prev === 0 ? 1 : 0));
  const handleNext = () => setActiveSlide((prev) => (prev === 1 ? 0 : 1));

  const openCertificateFromWallet = (cert: CertificateItem) => {
    setWalletOpen(false);
    if (onSelectCertificate) {
      onSelectCertificate(cert);
    }
  };

  return (
    <div className="flex flex-col items-center md:items-end">
      <div className="w-full max-w-[320px]">
        {/* Card Viewport */}
        <div className="relative">
          {activeSlide === 0 ? (
            /* Slide 1: Executive Profile & Portrait Card */
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-sm transition-all duration-300">
              <div className="flex items-center justify-between border-b border-[var(--border-hairline)] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono-meta inline-flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent-soft)] text-[11px] font-semibold text-[var(--accent-ink)]">
                    RL
                  </span>
                  <span className="font-mono-meta text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    OJT Candidate ID
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono-meta text-[10px] text-[var(--accent-ink)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  ACTIVE
                </span>
              </div>

              <div className="mt-3.5 overflow-hidden rounded-xl border border-[var(--border-hairline)] bg-white dark:bg-[#f4f4f1]">
                <img
                  src={profile.avatarUrl}
                  alt={`${profile.name} formal portrait`}
                  className="aspect-[4/4] w-full object-cover object-top"
                />
              </div>

              <div className="mt-3.5 flex items-end justify-between gap-2">
                <div>
                  <p className="font-mono-meta text-[10px] uppercase tracking-wider text-[var(--accent-ink)]">
                    Data · Systems · Web Dev
                  </p>
                  <p className="mt-0.5 text-sm font-semibold tracking-tight text-[var(--text-primary)]">
                    {profile.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    BSIT · Business Analytics
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveSlide(1)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2.5 py-1.5 font-mono-meta text-[10px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  Wallet ({verifiedCountPadded})
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ) : (
            /* Slide 2: Credential Wallet */
            <div className="relative pt-14">
              {/* Peeking Certificates Layer */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 top-0 flex items-end justify-center"
              >
                {peekCertificates.map((cert, index) => {
                  const transforms = [
                    '-rotate-6 -translate-x-10 translate-y-3',
                    'rotate-0 z-10 translate-y-0',
                    'rotate-6 translate-x-10 translate-y-3',
                  ];
                  const isPdf = cert.certificateUrl?.toLowerCase().endsWith('.pdf');
                  const thumbUrl = cert.previewImageUrl ?? (isPdf ? null : cert.certificateUrl);
                  return (
                    <div
                      key={cert.id}
                      className={`h-24 w-36 overflow-hidden rounded-lg border border-black/10 bg-white shadow-md transition-transform duration-300 ${transforms[index] ?? ''}`}
                    >
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt=""
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full flex-col justify-between bg-gradient-to-br from-white to-stone-100 p-2.5 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-meta rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-semibold text-white">
                              PDF
                            </span>
                          </div>
                          <div>
                            <p className="line-clamp-2 text-[9px] font-bold leading-tight text-stone-900">
                              {cert.title}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Wallet Body */}
              <button
                type="button"
                onClick={() => setWalletOpen(true)}
                className="group relative z-20 block w-full overflow-hidden rounded-2xl border border-[#2c2a27] bg-gradient-to-br from-[#1b1a18] via-[#151513] to-[#23201c] p-5 text-left text-[#f4f2ec] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {/* Subtle stitched inner frame */}
                <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-white/15" />

                {/* Subtle watermark monogram */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 bottom-3 font-serif-editorial text-6xl font-semibold tracking-tight text-white/[0.04]"
                >
                  RL
                </span>

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-meta inline-flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-[#c5b08a]/40 text-xs font-medium text-[#d8c7a8]">
                      RL
                    </span>
                    <div>
                      <p className="font-mono-meta text-[10px] uppercase tracking-[0.2em] text-[#c5b08a]">
                        Credential Wallet
                      </p>
                      <p className="mt-0.5 text-sm font-semibold tracking-wide text-white">
                        {profile.name.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Subtle metallic rivet */}
                  <span
                    aria-hidden="true"
                    className="mt-1 h-3 w-3 rounded-full border border-[#f5e7c9]/40 bg-gradient-to-br from-[#e7d6b4] to-[#9b8459] shadow-inner"
                  />
                </div>

                <div className="relative mt-7 flex items-end gap-3">
                  <span className="font-mono-meta text-4xl leading-none font-semibold tracking-tight text-white">
                    {verifiedCountPadded}
                  </span>
                  <div className="pb-0.5">
                    <p className="font-mono-meta text-[10px] uppercase tracking-widest text-white/80">
                      Verified Certificates
                    </p>
                    <p className="font-mono-meta text-[10px] text-white/50">
                      {certificates.length} Total Logged
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-3">
                  <span className="inline-flex items-center gap-1.5 font-mono-meta text-[11px] font-medium uppercase tracking-wider text-[#d8c7a8] transition-transform group-hover:translate-x-0.5">
                    Tap to Open
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <span className="font-mono-meta text-[10px] uppercase tracking-wider text-white/45">
                    Since 2023
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Carousel Switcher Controls */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous card"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Hero card slides">
            <button
              type="button"
              role="tab"
              aria-selected={activeSlide === 0}
              aria-label="Profile card"
              onClick={() => setActiveSlide(0)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === 0
                  ? 'w-5 bg-[var(--text-primary)]'
                  : 'w-2 border border-[var(--border-strong)] bg-transparent'
              }`}
            />
            <button
              type="button"
              role="tab"
              aria-selected={activeSlide === 1}
              aria-label="Credential wallet"
              onClick={() => setActiveSlide(1)}
              className={`h-2 rounded-full transition-all ${
                activeSlide === 1
                  ? 'w-5 bg-[var(--text-primary)]'
                  : 'w-2 border border-[var(--border-strong)] bg-transparent'
              }`}
            />
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next card"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center font-mono-meta text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
          {activeSlide === 0 ? 'Profile ID · Slide 1 of 2' : 'Credential Wallet · Slide 2 of 2'}
        </p>
      </div>

      {/* Credential Wallet Gallery Modal */}
      {walletOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-modal-title"
          onClick={() => setWalletOpen(false)}
        >
          <div
            className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
              <div>
                <div className="flex items-center gap-2 font-mono-meta text-xs uppercase tracking-wider text-[var(--accent-ink)]">
                  <Award className="h-3.5 w-3.5" />
                  <span>Credential Wallet · {verifiedCertificates.length} Verified</span>
                </div>
                <h2
                  id="wallet-modal-title"
                  className="font-serif-editorial mt-1 text-2xl font-medium text-[var(--text-primary)]"
                >
                  Verified Certificates &amp; Trainings
                </h2>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Select any certificate to inspect the full document, credential ID, or verification
                  link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWalletOpen(false)}
                aria-label="Close credential wallet"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedCertificates.map((cert) => {
                const isPdf = cert.certificateUrl?.toLowerCase().endsWith('.pdf');
                const thumbUrl = cert.previewImageUrl ?? (isPdf ? null : cert.certificateUrl);
                return (
                  <button
                    key={cert.id}
                    type="button"
                    onClick={() => openCertificateFromWallet(cert)}
                    className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)] text-left transition-colors hover:border-[var(--border-strong)]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border-hairline)] bg-white">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={cert.title}
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-stone-50 to-stone-100 p-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-meta rounded bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                              PDF DOCUMENT
                            </span>
                            <FileText className="h-4 w-4 text-stone-400" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-stone-900">
                              {cert.title}
                            </p>
                            <p className="mt-0.5 font-mono-meta text-[10px] text-stone-500">
                              PDF Certificate · {cert.date}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-3.5">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-meta text-[10px] text-[var(--accent-ink)]">
                            {cert.date}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono-meta text-[10px] text-[var(--accent-ink)]">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </span>
                        </div>
                        <h3 className="mt-1 line-clamp-2 text-xs font-semibold leading-snug text-[var(--text-primary)]">
                          {cert.title}
                        </h3>
                        <p className="mt-1 truncate text-[11px] text-[var(--text-muted)]">
                          {cert.issuer}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-hairline)] pt-4">
              <p className="text-xs text-[var(--text-muted)]">
                Showing {verifiedCertificates.length} verified certificates out of{' '}
                {certificates.length} total trainings logged.
              </p>
              <a
                href="#certificates"
                onClick={() => setWalletOpen(false)}
                className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
              >
                Browse Full Archive
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
