import { useEffect, useMemo, useState } from 'react';
import {
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  LayoutGrid,
  List,
  Search,
  X,
} from 'lucide-react';
import {
  certificateCategories,
  certificates,
  type CertificateCategory,
  type CertificateItem,
  type CertificateStatus,
} from '../data/portfolioData';

interface CertificatesSectionProps {
  selectedCertificate?: CertificateItem | null;
  onSelectCertificate?: (cert: CertificateItem | null) => void;
}

export function CertificatesSection({
  selectedCertificate,
  onSelectCertificate,
}: CertificatesSectionProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CertificateCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | CertificateStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [internalPreviewCert, setInternalPreviewCert] = useState<CertificateItem | null>(null);

  const previewCert =
    selectedCertificate !== undefined ? selectedCertificate : internalPreviewCert;
  const setPreviewCert = onSelectCertificate ?? setInternalPreviewCert;

  useEffect(() => {
    if (!previewCert) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreviewCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [previewCert, setPreviewCert]);

  const verifiedCount = useMemo(
    () => certificates.filter((cert) => cert.status === 'Verified').length,
    [],
  );
  const pendingCount = certificates.length - verifiedCount;

  const filteredCertificates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return certificates.filter((cert) => {
      const matchesCategory =
        selectedCategory === 'All' || cert.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || cert.status === selectedStatus;
      const matchesQuery =
        !query ||
        cert.title.toLowerCase().includes(query) ||
        (cert.subtitle?.toLowerCase().includes(query) ?? false) ||
        cert.issuer.toLowerCase().includes(query) ||
        cert.date.toLowerCase().includes(query);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [selectedCategory, selectedStatus, searchQuery]);

  const isPdfUrl = (url: string) => url.toLowerCase().endsWith('.pdf');

  return (
    <section id="certificates" className="border-b border-[var(--border-hairline)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="font-mono-meta text-xs uppercase tracking-widest text-[var(--accent-ink)]">
              05 · Seminars, Conferences &amp; Certificates
            </p>
            <h2 className="font-serif-editorial mt-2 text-2xl font-medium tracking-tight text-[var(--text-primary)] sm:text-3xl">
              Continuous Learning &amp; Verified Credentials
            </h2>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Structured archive of trainings, conferences, and workshops. Digital certificate files
              are progressively attached as verification copies are compiled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono-meta text-xs">
            <span className="rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--text-secondary)]">
              {certificates.length} Total
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--accent-soft)] px-2.5 py-1 text-[var(--accent-ink)]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {verifiedCount} Verified
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-2.5 py-1 text-[var(--text-muted)]">
              <Clock className="h-3.5 w-3.5" />
              {pendingCount} Pending
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-col gap-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {certificateCategories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? 'bg-[var(--accent)] text-white dark:text-[#0d1619]'
                      : 'border border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 border-t border-[var(--border-hairline)] pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, issuer, or year..."
                aria-label="Filter certificates"
                className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] py-1.5 pr-3 pl-8 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="mr-1 text-[var(--text-muted)]">Status:</span>
                {(['All', 'Verified', 'Pending Upload'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setSelectedStatus(status)}
                    className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                      selectedStatus === status
                        ? 'border border-[var(--accent)] bg-[var(--accent-soft)] font-medium text-[var(--accent-ink)]'
                        : 'border border-[var(--border-hairline)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {status === 'All' ? 'All' : status}
                  </button>
                ))}
              </div>

              <div
                className="inline-flex items-center rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] p-0.5"
                role="group"
                aria-label="Certificate layout view"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-pressed={viewMode === 'list'}
                  className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                  List
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-pressed={viewMode === 'grid'}
                  className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[var(--bg-surface)] font-medium text-[var(--text-primary)] shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Grid or List */}
        {filteredCertificates.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)] p-10 text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              No certificates match the current filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-medium text-[var(--accent-ink)] underline underline-offset-4"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((cert) => {
              const isVerified = cert.status === 'Verified' && Boolean(cert.certificateUrl);
              const isPdf = cert.certificateUrl ? isPdfUrl(cert.certificateUrl) : false;
              const thumbUrl = cert.previewImageUrl ?? (isPdf ? null : cert.certificateUrl);
              return (
                <article
                  key={cert.id}
                  className="group flex flex-col overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <button
                    type="button"
                    onClick={() => setPreviewCert(cert)}
                    className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border-hairline)] bg-[var(--bg-page)] text-left focus:outline-none"
                  >
                    {isVerified && cert.certificateUrl ? (
                      thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={cert.title}
                          className="h-full w-full bg-white object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col justify-between bg-gradient-to-br from-stone-50 to-stone-100 p-4 dark:from-[#1d1e1c] dark:to-[#161715]">
                          <div className="flex items-center justify-between">
                            <span className="font-mono-meta rounded bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                              PDF DOCUMENT
                            </span>
                            <FileText className="h-4 w-4 text-[var(--text-muted)]" />
                          </div>
                          <div>
                            <p className="line-clamp-2 text-xs font-semibold text-[var(--text-primary)]">
                              {cert.title}
                            </p>
                            <p className="mt-1 font-mono-meta text-[10px] text-[var(--text-muted)]">
                              PDF Credential · Click to inspect
                            </p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-[var(--bg-page)] px-4 text-center">
                        <Award className="h-6 w-6 text-[var(--text-muted)]/60" />
                        <span className="font-mono-meta text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                          Pending Upload
                        </span>
                      </div>
                    )}
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-mono-meta text-[11px] text-[var(--text-muted)]">
                          {cert.date}
                        </span>
                        {isVerified ? (
                          <span className="inline-flex items-center gap-1 rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent-ink)]">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-[var(--text-primary)]">
                        {cert.title}
                      </h3>
                      <p className="mt-1 truncate text-xs text-[var(--text-muted)]">{cert.issuer}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[var(--border-hairline)] pt-3">
                      <span className="font-mono-meta truncate text-[10px] text-[var(--text-secondary)]">
                        {cert.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => setPreviewCert(cert)}
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--accent-ink)] hover:underline"
                      >
                        {isVerified ? 'View' : 'Details'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 divide-y divide-[var(--border-hairline)] overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)]">
            {filteredCertificates.map((cert) => {
              const isVerified = cert.status === 'Verified' && Boolean(cert.certificateUrl);
              return (
                <article
                  key={cert.id}
                  className="flex flex-col justify-between gap-4 p-4 transition-colors hover:bg-[var(--bg-page)]/60 sm:flex-row sm:items-center sm:px-6 sm:py-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-meta rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">
                        {cert.category}
                      </span>
                      <span className="font-mono-meta text-xs text-[var(--text-muted)]">
                        {cert.date}
                      </span>
                      {isVerified ? (
                        <span className="inline-flex items-center gap-1 rounded bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--accent-ink)]">
                          <CheckCircle2 className="h-3 w-3" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded border border-[var(--border-hairline)] bg-[var(--bg-page)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                          <Clock className="h-3 w-3" />
                          Certificate Pending Upload
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1.5 text-sm font-semibold text-[var(--text-primary)] sm:text-[15px]">
                      {cert.title}
                    </h3>
                    {cert.subtitle && (
                      <p className="mt-0.5 text-xs italic text-[var(--text-secondary)]">
                        “{cert.subtitle}”
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      Issuer / Organizer: {cert.issuer}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewCert(cert)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                    >
                      {isVerified ? (
                        <>
                          <FileCheck2 className="h-3.5 w-3.5 text-[var(--accent-ink)]" />
                          View Certificate
                        </>
                      ) : (
                        <>
                          <Eye className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                          Preview Slot
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-meta text-xs text-[var(--accent-ink)]">
                    {previewCert.category} · {previewCert.date}
                  </span>
                </div>
                <h3
                  id="cert-modal-title"
                  className="font-serif-editorial mt-1 text-xl font-medium text-[var(--text-primary)] sm:text-2xl"
                >
                  {previewCert.title}
                </h3>
                {previewCert.subtitle && (
                  <p className="mt-1 text-xs italic text-[var(--text-secondary)]">
                    “{previewCert.subtitle}”
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                aria-label="Close certificate preview"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 grid gap-3 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-page)] p-4 text-xs sm:grid-cols-3">
              <div>
                <p className="font-mono-meta uppercase tracking-wider text-[var(--text-muted)]">
                  Issuer
                </p>
                <p className="mt-1 font-medium text-[var(--text-primary)]">{previewCert.issuer}</p>
              </div>
              <div>
                <p className="font-mono-meta uppercase tracking-wider text-[var(--text-muted)]">
                  Date
                </p>
                <p className="mt-1 font-medium text-[var(--text-primary)]">{previewCert.date}</p>
              </div>
              <div>
                <p className="font-mono-meta uppercase tracking-wider text-[var(--text-muted)]">
                  Verification Status
                </p>
                <p className="mt-1 font-medium text-[var(--text-primary)]">
                  {previewCert.status}
                  {previewCert.credentialId ? ` · ${previewCert.credentialId}` : ''}
                </p>
              </div>
            </div>

            <div className="mt-5">
              {previewCert.certificateUrl ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-white">
                    {previewCert.previewImageUrl ? (
                      <img
                        src={previewCert.previewImageUrl}
                        alt={previewCert.title}
                        className="max-h-[480px] w-full object-contain"
                      />
                    ) : isPdfUrl(previewCert.certificateUrl) ? (
                      <iframe
                        src={`${previewCert.certificateUrl}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
                        title={previewCert.title}
                        className="h-[460px] w-full"
                      />
                    ) : (
                      <img
                        src={previewCert.certificateUrl}
                        alt={previewCert.title}
                        className="max-h-[480px] w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {previewCert.verifyUrl && (
                      <a
                        href={previewCert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-page)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-subtle)]"
                      >
                        Verify Credential
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    <a
                      href={previewCert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--accent-hover)] dark:text-[#0d1619]"
                    >
                      Open Full File
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--bg-page)] p-6 text-center">
                  <Award className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
                  <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">
                    Certificate Preview Slot — Pending Upload
                  </p>
                  <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-[var(--text-secondary)]">
                    This credential is logged from Reymark&apos;s resume and awaits digital file
                    attachment. Once compiled, place the image or PDF inside{' '}
                    <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono-meta text-[11px]">
                      public/certificates/
                    </code>{' '}
                    and update entry{' '}
                    <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono-meta text-[11px]">
                      {previewCert.id}
                    </code>{' '}
                    in{' '}
                    <code className="rounded bg-[var(--bg-subtle)] px-1.5 py-0.5 font-mono-meta text-[11px]">
                      src/data/portfolioData.ts
                    </code>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
