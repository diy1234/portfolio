# 🚀 3D Portfolio — Kiran.dev Style

A futuristic developer portfolio with a fixed navbar, hero section, scrollable sections, and a live 3D sphere — built with React, Three.js, R3F, Tailwind CSS, and Framer Motion.

---

## 🛠 Setup

```bash
npm install
npm run dev
# Opens at http://localhost:5173
```

## 📁 Structure

```
src/
├── App.jsx
├── main.jsx
├── styles/globals.css
├── data/portfolioData.js     ← ⭐ Edit this first
├── hooks/useMouseParallax.js
└── components/
    ├── 3d/Scene3D.jsx        ← Background particles
    ├── ui/
    │   ├── Loader.jsx
    │   └── Navbar.jsx        ← Fixed top navbar
    └── sections/
        ├── HeroSection.jsx   ← Name + 3D sphere + CTA buttons
        ├── AboutSection.jsx
        ├── SkillsSection.jsx
        ├── ProjectsSection.jsx
        └── ContactSection.jsx
```

## ✏️ Personalise

Open `src/data/portfolioData.js` and update:
- `PERSONAL` — your name, bio, email, GitHub, LinkedIn
- `EDUCATION` — your degrees
- `SKILLS` — your tech stack and percentages
- `PROJECTS` — your real projects with GitHub/live links

Drop `resume.pdf` into `/public/` for the download button.

## 🌐 Deploy

```bash
npm run build   # creates /dist
npx vercel      # deploy to Vercel instantly
```
