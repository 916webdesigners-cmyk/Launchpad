import type { QuestionnaireAnswers } from "@/types";

export function buildWorkflowPrompt(answers: QuestionnaireAnswers): string {
  // Determine which specialized skill files to request based on user selections
  const skillDirectives: string[] = [];

  // Design tool specifics
  if (answers.designTools.includes("Figma")) {
    skillDirectives.push(
      `- Generate a "figma-to-code-workflow.md" skill file covering: design token extraction, auto-layout to CSS/Flexbox mapping, component-driven handoff, Figma plugin recommendations (Locofy, Anima, Figma Tokens), and a section on maintaining design-dev sync with naming conventions.`
    );
  }
  if (answers.designTools.includes("Google Stitch")) {
    skillDirectives.push(
      `- Generate a "stitch-design-system.md" skill file covering: creating and managing design systems in Stitch, importing screens, applying design tokens (color, typography, shape, appearance), generating variants, and exporting assets for frontend integration.`
    );
  }
  if (answers.designTools.includes("Framer")) {
    skillDirectives.push(
      `- Generate a "framer-motion-patterns.md" or "framer-prototyping.md" skill file covering advanced Framer animation techniques, interaction design, and code export strategies.`
    );
  }
  if (answers.designTools.includes("Webflow")) {
    skillDirectives.push(
      `- Generate a "webflow-development.md" skill file covering Webflow CMS structure, custom code injection, responsive design patterns, and deployment.`
    );
  }

  // Build tool specifics
  if (answers.buildTools.includes("Antigravity IDE")) {
    skillDirectives.push(
      `- Generate an "antigravity-ide-mastery.md" skill file covering: effective AI prompting strategies, using skills/workflows/knowledge items, browser testing workflows, multi-file editing patterns, and how to leverage the IDE's agentic capabilities for rapid prototyping. This is a CRITICAL skill file — make it extremely detailed with real prompt examples.`
    );
  }
  if (answers.buildTools.includes("VS Code")) {
    skillDirectives.push(
      `- Generate a "vscode-workspace-setup.md" skill file covering: recommended extensions for their stack, workspace settings.json configuration, debugging profiles, task runners, keyboard shortcuts for productivity, and snippets.`
    );
  }
  if (answers.buildTools.includes("Cursor")) {
    skillDirectives.push(
      `- Generate a "cursor-ai-development.md" skill file covering: effective .cursorrules files, prompt engineering for code generation, using Cursor's composer and chat modes, code review workflows, and integrating Cursor with their specific stack.`
    );
  }

  // Hosting specifics
  if (answers.hostingTools.includes("Vercel")) {
    skillDirectives.push(
      `- Generate a "vercel-deployment-pipeline.md" skill file covering: project configuration (vercel.json), environment variables, preview deployments, edge functions, ISR/SSR strategies, custom domains, and monitoring with Vercel Analytics.`
    );
  }
  if (answers.hostingTools.includes("Netlify")) {
    skillDirectives.push(
      `- Generate a "netlify-deployment.md" skill file covering: netlify.toml configuration, build plugins, serverless functions, form handling, split testing, and deploy previews.`
    );
  }
  if (answers.hostingTools.includes("Firebase")) {
    skillDirectives.push(
      `- Generate a "firebase-fullstack-setup.md" skill file covering: Firestore data modeling with security rules, Firebase Auth (email + OAuth providers), Cloud Functions for server-side logic, Firebase Hosting deployment, and real-time listeners pattern.`
    );
  }
  if (answers.hostingTools.includes("AWS")) {
    skillDirectives.push(
      `- Generate an "aws-deployment.md" skill file covering: S3 + CloudFront for static hosting, Amplify for full-stack, Route 53 for DNS, and CI/CD with CodePipeline or GitHub Actions.`
    );
  }

  // Feature-specific skill files
  if (answers.features.includes("stripe") || answers.stripeIntegration === "Yes") {
    skillDirectives.push(
      `- Generate a "stripe-integration-guide.md" skill file covering: Stripe Checkout sessions, webhook handling with signature verification, subscription lifecycle management (create, upgrade, cancel, reactivate), customer portal integration, idempotency keys, and testing with Stripe CLI. Include real code examples in their chosen stack.`
    );
  }
  if (answers.features.includes("auth")) {
    skillDirectives.push(
      `- Generate a "authentication-system.md" skill file covering: auth architecture (JWT vs session), OAuth 2.0 flow implementation, protected route patterns, role-based access control (RBAC), password hashing best practices, refresh token rotation, and CSRF/XSS protection. Tailor to their hosting/backend choices.`
    );
  }
  if (answers.features.includes("booking")) {
    skillDirectives.push(
      `- Generate a "booking-system-architecture.md" skill file covering: calendar data modeling, timezone handling, availability slots, conflict resolution, email/SMS notifications, cancellation policies, and integration with Google Calendar API.`
    );
  }
  if (answers.features.includes("seo")) {
    skillDirectives.push(
      `- Generate a "seo-optimization-checklist.md" skill file covering: meta tags and Open Graph, structured data (JSON-LD), sitemap.xml generation, robots.txt configuration, Core Web Vitals optimization, image optimization, canonical URLs, and social preview cards.`
    );
  }
  if (answers.features.includes("products")) {
    skillDirectives.push(
      `- Generate a "product-catalog-setup.md" skill file covering: product data schema design, search and filtering implementation, image optimization pipeline, inventory management patterns, and shopping cart state management.`
    );
  }
  if (answers.features.includes("admin")) {
    skillDirectives.push(
      `- Generate an "admin-dashboard-guide.md" skill file covering: dashboard layout patterns, data visualization with charts, CRUD operations, audit logging, user management, and role-based UI rendering.`
    );
  }
  if (answers.features.includes("analytics")) {
    skillDirectives.push(
      `- Generate an "analytics-tracking-setup.md" skill file covering: Google Analytics 4 (GA4) configuration, custom event tracking, conversion funnels, UTM parameter handling, privacy-compliant cookie consent (GDPR/CCPA), and optional Mixpanel/PostHog integration for product analytics.`
    );
  }
  if (answers.features.includes("email")) {
    skillDirectives.push(
      `- Generate an "email-marketing-integration.md" skill file covering: transactional email setup (Resend, SendGrid, or Postmark), newsletter subscription flows, email template design with MJML or React Email, drip campaign architecture, and unsubscribe/bounce handling.`
    );
  }
  if (answers.features.includes("cms")) {
    skillDirectives.push(
      `- Generate a "cms-content-engine.md" skill file covering: headless CMS selection (Sanity, Contentful, or Strapi), content modeling, rich text rendering, image/asset pipelines, draft/preview modes, and webhook-based revalidation for ISR.`
    );
  }
  if (answers.features.includes("i18n")) {
    skillDirectives.push(
      `- Generate an "internationalization-guide.md" skill file covering: i18n library setup (next-intl or react-i18next), locale routing strategies, translation file organization, RTL support, date/number/currency formatting with Intl API, and managing translation workflows.`
    );
  }

  // AI-assisted coding
  if (answers.aiAssisted === "Yes") {
    skillDirectives.push(
      `- Generate an "ai-assisted-development.md" skill file covering: effective prompt engineering patterns for code generation, using AI for code review and refactoring, generating tests with AI, AI-powered documentation, and guardrails to verify AI output quality.`
    );
  }

  // Backend
  if (answers.backendNeeded === "Yes") {
    skillDirectives.push(
      `- Generate an "api-architecture.md" skill file covering: REST vs GraphQL decision framework, API route structure, input validation and sanitization, error handling patterns, rate limiting, CORS configuration, and API versioning strategy. Tailor to their specific stack.`
    );
  }

  // Ensure at least a core project setup skill if nothing specific was triggered
  if (skillDirectives.length < 3) {
    skillDirectives.push(
      `- Generate a "project-setup-guide.md" skill file covering: repository initialization, folder structure best practices, dependency installation, environment variable management (.env patterns), linting/formatting setup (ESLint + Prettier), Git workflow (branching strategy, commit conventions), and pre-commit hooks.`
    );
    skillDirectives.push(
      `- Generate a "responsive-design-system.md" skill file covering: CSS custom properties for design tokens, mobile-first breakpoint strategy, component-level responsive patterns, accessible color contrast, typography scale, and spacing system.`
    );
  }

  // Cap at 4 skill files to keep response size within safe token limits and prevent truncation
  const cappedDirectives = skillDirectives.slice(0, 4);
  const skillCount = cappedDirectives.length;

  return `
You are LaunchPad — a principal systems architect used by founders, agencies, and elite indie hackers. Your job is to generate a comprehensive, production-ready infrastructure plan and set of downloadable markdown skill files based on a user's specific startup or agency constraints. Focus heavily on system-level architecture (auth, billing, multi-tenancy) while guaranteeing total creative freedom and customization in how they build their features.

You must respond ONLY with a valid JSON object matching this exact structure — no extra text, no markdown code fences, just raw JSON:

{
  "projectSummary": "2-3 sentence summary of the project, chosen architecture, and strategic approach",
  "phases": [
    {
      "phaseNumber": 1,
      "phaseName": "Phase name",
      "description": "Detailed description of what happens in this phase and why",
      "estimatedTime": "e.g. 2-3 days",
      "steps": ["Step 1 with specific action", "Step 2 with specific action", "Step 3 with specific action"],
      "tools": ["Tool 1", "Tool 2"]
    }
  ],
  "skillFiles": [
    {
      "fileName": "filename-kebab-case.md",
      "description": "One-line summary of what this skill file teaches",
      "fileContent": "Full markdown content — see formatting rules below"
    }
  ],
  "stripeGuide": "Detailed Stripe integration guide specific to their stack, or empty string if not needed",
  "recommendedStack": ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"],
  "warnings": ["Any important warnings, gotchas, version conflicts, or security considerations"]
}

PHASE GENERATION RULES:
- Generate exactly 4 to 5 workflow phases maximum.
- Each phase must contain exactly 3-4 specific steps.
- Include estimated time ranges calibrated to a high-urgency startup timeline.
- Phase ordering should follow industry-standard SDLC: Discovery → Design → Build → Integrate → Test → Deploy

SKILL FILE GENERATION RULES:
- Generate exactly ${skillCount} skill files as specified below
- Each skill file should be VERY CONCISE (400 to 600 words). Do not write extremely long documents.
- Every skill file MUST follow this structure:
  1. YAML-style frontmatter block (name, description, difficulty)
  2. Overview section explaining the "why" and context
  3. Prerequisites section listing what's needed before starting
  4. Step-by-step instructions with numbered sections
  5. Code examples with language-tagged fenced code blocks (e.g. \\\`\\\`\\\`typescript)
  6. Terminal commands where relevant (e.g. \\\`\\\`\\\`bash)
  7. Configuration snippets (package.json, tsconfig, env files, etc.)
  8. A "Common Pitfalls" or "Troubleshooting" section at the end
  9. Links to official documentation where applicable
- The content must be OPINIONATED and SPECIFIC — written as if by a senior developer who has shipped dozens of production projects
- Include real package names, version-specific advice, and proven patterns
- Never say "consider doing X" — say "do X because Y"
- Tailor complexity to a production-ready, expert-level system architecture.

SPECIFIC SKILL FILES TO GENERATE:
${cappedDirectives.join("\n")}

CRITICAL STRUCTURAL RULES (PREVENT INFINITE LOOPS):
- The "recommendedStack" array MUST contain exactly 4 to 6 string items. Do not generate massive lists.
- The "warnings" array MUST contain exactly 2 to 3 warnings.
- The "tools" array in each phase MUST contain exactly 2 to 4 tools.
- Keep the overall response as concise as possible while delivering high value.
- Do not hallucinate endless parameter definitions.

HERE IS THE USER'S PROJECT INFORMATION:

Project Description: ${answers.projectDescription}
Website Type: ${answers.websiteType}

Design Tools: ${answers.designTools.join(", ") || "Not specified"}
Build Tools: ${answers.buildTools.join(", ") || "Not specified"}
Hosting: ${answers.hostingTools.join(", ") || "Not specified"}
Other Stack Notes: ${answers.otherStack || "None"}

Required Features: ${answers.features.join(", ") || "Not specified"}
Other Features: ${answers.otherFeatures || "None"}

Timeline: ${answers.timeline}
Team Size: ${answers.teamSize}
Project Type: ${answers.projectType}
Budget: ${answers.budget}

Stripe Integration: ${answers.stripeIntegration}
Backend Needed: ${answers.backendNeeded}
AI-Assisted Coding: ${answers.aiAssisted}
Additional Notes: ${answers.additionalNotes || "None"}

Now generate the workflow and all ${skillCount} skill files.
`;
}
