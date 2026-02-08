export default {
  header: {
    home: 'Home',
    work: 'Work',
    writing: 'Writing',
    contact: 'Contact',
    toggleLanguage: 'Toggle language',
  },
  profile: {
    name: 'omelodev',
  },
  appFooter: {
    licenseLabel: 'CC License',
    licenseName: 'Creative Commons Attribution-ShareAlike 4.0 International',
    reuseWithAttribution: 'Reuse with attribution',
  },
  sections: {
    hero: {
      role: 'Senior Software Engineer',
      headline: 'I design and ship software systems that stay fast to change as products scale.',
      paragraph:
        'I focus on clear architecture, predictable delivery, and technical decisions that keep teams productive over time.',
      actions: {
        contact: 'Contact',
        resume: 'Resume / LinkedIn',
      },
    },
    howIWork: {
      title: 'How I Work',
      items: [
        'Start with constraints, success metrics, and explicit non-goals before implementation.',
        'Break delivery into vertical slices that can be shipped and measured quickly.',
        'Document tradeoffs in plain language so product and engineering can decide together.',
        'Own reliability after launch through instrumentation, incident review, and follow-up fixes.',
        'Reduce complexity aggressively when it does not create customer or business value.',
      ],
    },
    aiLeverage: {
      title: 'AI as Leverage',
      usedLabel: 'Where AI is used',
      used: 'Boilerplate generation, test scaffolding, migration planning, and first-pass docs.',
      notTrustedLabel: 'Where it is not trusted',
      notTrusted: 'Core architecture, security boundaries, and business-critical edge cases.',
      validatedLabel: 'How output is validated',
      validated: 'Code review, contract tests, profiling, and production telemetry before adoption.',
    },
    work: {
      labels: {
        impact: 'Impact',
        decisions: 'Key decisions',
      },
      deepDive: 'Deep dive ->',
      primary: {
        title: 'Primary Case Study: Multi-Region Checkout Rebuild',
        context: 'Replaced a fragile monolith flow with a service-oriented checkout path for three markets.',
        impacts: [
          'Cut checkout failure rate by 38% during peak campaigns.',
          'Reduced median release lead time from 9 days to 2 days.',
        ],
        decisions: [
          'Chose strict API contracts between services to isolate change risk.',
          'Prioritized observability work in sprint one to speed incident response.',
        ],
      },
      secondary: {
        title: 'Secondary Case Study: Internal Workflow Automation',
        context: 'Standardized deployment and QA workflows across product squads with shared tooling.',
        impacts: [
          'Saved roughly 18 engineering hours per squad each sprint.',
          'Lowered production rollback frequency by 29% in two quarters.',
        ],
        decisions: [
          'Used incremental rollout to avoid team-level delivery disruptions.',
          'Kept policy checks in CI to enforce release quality gates.',
        ],
      },
      contribution: {
        title: 'Selected Contribution: Observability Baseline',
        body: 'Owned the first end-to-end tracing and alerting baseline, giving teams a shared language for performance and reliability decisions.',
      },
    },
    skills: {
      title: 'Skills',
      frontend: {
        title: 'Frontend',
        items: ['Vue 3 + TypeScript', 'Tailwind CSS systems', 'Accessibility and interaction architecture'],
      },
      backendTooling: {
        title: 'Backend & Tooling',
        items: ['Node.js service design', 'PostgreSQL and Redis operations', 'CI/CD, observability, and release automation'],
      },
    },
    writing: {
      title: 'Writing',
      body: 'Short notes on software tradeoffs, delivery systems, and practical architecture decisions.',
      link: 'Open writing route',
    },
    contact: {
      title: 'Contact',
      body: 'If you are building a product that needs clear engineering ownership, reach out.',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    footer: {
      nameYear: 'omelodev - {year}',
      locationTimezone: 'United States / UTC-5 to UTC-4',
      links: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
  },
}
