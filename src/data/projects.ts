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
    slug: "eremarket",
    title: "EreMarket",
    tagline:
      "Rebuilt an ecommerce website into a B2B retail management platform for local retailers, supermarkets and physical stores.",
    summary:
      "A full-stack B2B retail management platform that helps local retailers manage products, inventory, orders, storefront information and day-to-day store operations. Everything a merchant publishes feeds a shared marketplace their customers can order from.",
    problem:
      "Shops around me run on disconnected tools: stock counted in a notebook, orders taken over WhatsApp, prices agreed in chat and nothing agreeing with anything else. I already had a working ecommerce codebase, so the question I wanted to answer was whether a familiar shopping foundation could be turned around and pointed at the merchant instead — one place where a retailer sets up their business, lists what they actually stock, keeps the counts current and runs orders through to collection.",
    build:
      "I evolved the existing client/server monorepo into a merchant-first platform rather than starting over. The front end is Vite, React, TypeScript and Tailwind, and the merchant side of it is an onboarding flow capturing business name, type, contact details, address and logo; a dashboard for the catalogue with per-product stock levels and low-stock flags, image upload and generated product descriptions; an order view that breaks each customer order down to the line items belonging to that merchant, with fulfilment status they can move themselves; and a public storefront page per shop. Behind it, Express and TypeScript sit over a Supabase Postgres schema I designed — row-level security so a merchant only ever reaches their own rows, database triggers, and an order-finalisation endpoint that recomputes totals server-side, checks stock and commits the order transactionally. Checkout is priced in naira through Paystack, with pay-on-collection for buyers who walk in, and Resend handles receipts and fulfilment email. The structural work was re-centring the information architecture on the merchant: onboarding, catalogue, stock, orders and storefront became one workflow instead of screens bolted onto a shopping journey.",
    learnings: [
      "Designing for a business workflow is not the same as building isolated CRUD screens. Products, stock, orders and storefront details have to connect into one coherent merchant journey — editing a stock count has to mean something to an order two screens away.",
      "A dashboard earns its place by prioritising. A retailer needs the operational signals first — what is running out, what is waiting on them — not a table they have to read end to end before they know whether anything needs doing.",
      "Reworking an existing full-stack application taught me how to evolve a codebase without discarding working functionality. The schema, auth and payments stayed; the routing, naming and information architecture moved to a merchant-first shape.",
    ],
    role: "Solo build",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "Paystack",
      "Resend",
    ],
    year: 2026,
    status: "live",
    featured: true,
    liveUrl: "https://www.eremarket.store",
    repoUrl: "https://github.com/Just-joe924/Eremarket",
    cover: {
      src: "/images/projects/eremarket.png",
      alt: "The EreMarket marketplace home page",
    },
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
