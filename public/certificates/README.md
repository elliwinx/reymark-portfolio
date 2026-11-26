# Certificates & Credentials Directory

Drop your compiled certificate images (`.png`, `.jpg`, `.webp`) or PDFs (`.pdf`) inside this folder (`public/certificates/`).

## How to Link a Certificate in the Portfolio

1. Place your file in this directory, using a clean, URL-safe filename:
   - Example: `public/certificates/convergeit-2026.pdf`
   - Example: `public/certificates/databiz-2025.png`

2. Open `src/data/portfolioData.ts` and locate the matching item in the `certificates` array.

3. Update its `certificateUrl`, `status`, and optionally `credentialId`:

```ts
{
  id: 'convergeit-2026',
  title: 'ConvergeIT 2026 Technology Conference',
  // ...
  certificateUrl: '/certificates/convergeit-2026.pdf',
  status: 'Verified', // Change from 'Pending Upload' to 'Verified'
  credentialId: 'CERT-2026-XXXX', // Optional
}
```

4. Save the file — the portfolio card will automatically switch to **Verified** and enable the **Preview Certificate** modal and download link.

## Optional: Printable Resume

If you also export a PDF resume (e.g., `Reymark_Levita_Resume.pdf`), drop it into `public/` as `public/Reymark_Levita_Resume.pdf` and update `profile.resumeUrl` in `src/data/portfolioData.ts`.
