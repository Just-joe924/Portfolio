import type { Project } from "@/types/project";

/**
 * Your projects, written up from your CV.
 *
 * ── WHAT STILL NEEDS YOU ──────────────────────────────────────────────────
 *  Cover images — drop a file at the path in each `cover.src` and it appears
 *  on the next build. Until then the card renders a typographic fallback.
 *
 *  An empty liveUrl or repoUrl hides its button rather than shipping a dead
 *  link, so leaving one blank is always safe.
 *
 * Adding a project later is one object in this array. No markup to touch.
 */
export const projects: Project[] = [
  {
    slug: "cara",
    title: "Cara",
    tagline: "A static fashion template rebuilt as a real full-stack store.",
    summary:
      "A complete e-commerce application for a fashion retailer: browsing, search, filtering, cart, checkout and order handling, backed by a real database rather than hardcoded products.",
    problem:
      "Cara started life as a static HTML template — attractive, but every product was hardcoded and nothing could actually be bought. I wanted to find out what it really takes to turn a page that looks like a shop into a shop, which is mostly the parts a template leaves out: persistence, validation, and what happens after someone clicks Pay.",
    build:
      "A client/server monorepo. The front end is Vite, React, TypeScript and Tailwind, with pages for Home, Shop, Product, Cart, Checkout, Blog, About and Contact built from reusable components. The server is Express and TypeScript over a Supabase Postgres database whose schema I designed myself — row-level security policies, database triggers, and a seeding script for the product catalogue. Shopping is fully wired: product browsing, search, brand and category filtering, sorting, live cart totals, checkout validation, order summaries, and an Express order-finalisation endpoint that commits the order transactionally.",
    learnings: [
      "Row-level security is a design decision, not a setting. Getting the policies right meant thinking about who owns each row before writing any queries.",
      "Checkout is where a project stops being a UI exercise. Validation, totals and order state have to agree with each other on the server, because the client cannot be trusted with any of them.",
      "A monorepo only pays off if the shared types are genuinely shared — duplicating the product type on both sides defeats the point.",
    ],
    role: "Solo build",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Express.js", "Supabase", "PostgreSQL"],
    year: 2026,
    status: "live",
    featured: true,
    liveUrl: "https://responsive-e-commerce-website-six.vercel.app",
    repoUrl: "https://github.com/Just-joe924/Cara",
    cover: { src: "/images/projects/cara.png", alt: "The Cara storefront" },
  },
  {
    slug: "admission-letter-automation",
    title: "University Admission Letter Automation",
    tagline: "Turning a manual admissions workflow into a verified, automated pipeline.",
    summary:
      "A full-stack system for Caleb University that verifies student data, generates personalised admission letters as PDFs, and delivers them by email — replacing a process that was previously done by hand, one letter at a time.",
    problem:
      "Issuing admission letters manually does not scale. Each one has to be produced from a template, checked against the student's record, and sent individually — slow during peak admissions, and every step is somewhere a mistake can be introduced. The administrators also had no view of what had actually gone out.",
    build:
      "Verified student data intake feeding a templated document pipeline that generates admission letters as PDFs with Puppeteer. Nodemailer handles automated delivery with the letter attached, and access is protected with JWT-based authentication. I also built an admin analytics and monitoring dashboard so staff can oversee the workflow rather than trust it blindly.",
    learnings: [
      "PDF generation is deceptively hard. Headless Chrome renders reliably, but only once you stop fighting it over fonts, page breaks and print styles.",
      "Automated email needs to be observable. Fire-and-forget delivery is worthless to an administrator who needs to answer 'did this student get their letter?'",
      "The dashboard turned out to matter as much as the automation. People will not trust a pipeline they cannot see into.",
    ],
    role: "Solo build",
    stack: ["React", "Node.js", "Express.js", "Puppeteer", "Nodemailer", "JWT"],
    year: 2026,
    status: "live",
    featured: true,
    liveUrl: "https://university-admission-letter-automat.vercel.app",
    repoUrl: "https://github.com/Just-joe924/university-admission-letter-automation",
    cover: {
      src: "/images/projects/admission-letter-automation.png",
      alt: "The admission letter admin dashboard",
    },
  },
  {
    slug: "nacos-aul-platform",
    title: "NACOS AUL Web Platform",
    tagline: "Departmental dues and student records for 200+ users.",
    summary:
      "The web platform for the NACOS chapter at Anchor University, serving over 200 students. I built the student portfolio pages and the administrative payments dashboard that centralises departmental dues.",
    problem:
      "Departmental dues were tracked informally, which meant administrators had no single place to see who had paid and students had no way to check their own record. Academic information was scattered across whatever channel it had been announced on.",
    build:
      "A payments dashboard giving administrators a structured interface for monitoring student payment records in one place, and a student portfolio page that organises and displays each student's academic and activity information dynamically. Both are wired to backend APIs supplying live data for payments, SIWES applications and academic resources.",
    learnings: [
      "Building for 200 real classmates is different from building for yourself — people find every unclear label within a day.",
      "An admin interface is a product with its own users. Designing it as an afterthought means someone does data entry badly for a year.",
      "Consuming an API you did not design teaches you what makes one pleasant to consume.",
    ],
    role: "Frontend — student portfolio and payments dashboard",
    stack: ["React", "JavaScript", "Tailwind CSS", "REST APIs"],
    year: 2025,
    status: "live",
    featured: false,
    liveUrl: "https://nacos-frontend.vercel.app",
    repoUrl: "https://github.com/NACOS-ANCHOR-UNIVERSITY/Nacos-Anchor-Platform-frontend",
    cover: { src: "/images/projects/nacos-aul-platform.png", alt: "The NACOS AUL payments dashboard" },
  },
];
