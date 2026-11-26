# Reymark A. Levita — OJT & Developer Portfolio

Minimalist, editorial portfolio web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

## Project Structure

- `src/data/portfolioData.ts` — Centralized resume profile, education, SPES experience, projects, skills, achievements, organizations, and structured certificates list.
- `src/components/` — Modular UI sections (`Navbar`, `Hero`, `AboutEducation`, `ExperienceSection`, `ProjectsSection`, `SkillsAndHonors`, `CertificatesSection`, `ContactSection`, `ResumeModal`).
- `public/certificates/` — Directory for compiled certificate images (`.png`, `.jpg`, `.webp`) and PDFs (`.pdf`).

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
npm run preview
```

## Adding Compiled Certificates

1. Drop your certificate file inside `public/certificates/` (e.g., `public/certificates/databiz-2025.pdf`).
2. Open `src/data/portfolioData.ts` and find the matching entry in `certificates`.
3. Update `certificateUrl` and `status`:

```ts
{
  id: 'databiz-2025',
  // ...
  certificateUrl: '/certificates/databiz-2025.pdf',
  status: 'Verified',
}
```
