export default {
  header: {
    home: 'Início',
    work: 'Trabalho',
    writing: 'Escritos',
    contact: 'Contato',
    toggleLanguage: 'Alternar idioma',
  },
  profile: {
    name: 'omelodev',
  },
  appFooter: {
    licenseLabel: 'Licença CC',
    licenseName: 'Creative Commons Attribution-ShareAlike 4.0 International',
    reuseWithAttribution: 'Reuso com atribuição',
  },
  sections: {
    hero: {
      role: 'Senior Software Engineer',
      headline: 'Projeto e entrego sistemas de software que continuam rápidos de evoluir conforme o produto cresce.',
      paragraph:
        'Meu foco é arquitetura clara, entrega previsível e decisões técnicas que mantêm times produtivos no longo prazo.',
      actions: {
        contact: 'Contato',
        resume: 'Currículo / LinkedIn',
      },
    },
    howIWork: {
      title: 'Como Eu Trabalho',
      items: [
        'Começo por restrições, métricas de sucesso e não objetivos explícitos antes de implementar.',
        'Quebro entrega em fatias verticais que podem ser publicadas e medidas rapidamente.',
        'Documento tradeoffs em linguagem clara para produto e engenharia decidirem juntos.',
        'Assumo confiabilidade após o lançamento com instrumentação, revisão de incidentes e correções.',
        'Reduzo complexidade com firmeza quando ela não gera valor de negócio ou para cliente.',
      ],
    },
    aiLeverage: {
      title: 'IA como Alavanca',
      usedLabel: 'Onde IA é usada',
      used: 'Geração de boilerplate, esqueleto de testes, planejamento de migrações e primeira versão de docs.',
      notTrustedLabel: 'Onde não é confiada',
      notTrusted: 'Arquitetura central, limites de segurança e casos críticos para o negócio.',
      validatedLabel: 'Como a saída é validada',
      validated: 'Code review, testes de contrato, profiling e telemetria de produção antes da adoção.',
    },
    work: {
      labels: {
        impact: 'Impacto',
        decisions: 'Decisões chave',
      },
      deepDive: 'Deep dive ->',
      primary: {
        title: 'Case Principal: Rebuild de Checkout Multi-Região',
        context: 'Substitui um fluxo monolítico frágil por um caminho de checkout orientado a serviços para três mercados.',
        impacts: [
          'Reduzi a taxa de falhas no checkout em 38% durante campanhas de pico.',
          'Diminuímos o lead time mediano de release de 9 dias para 2 dias.',
        ],
        decisions: [
          'Escolhi contratos de API estritos entre serviços para isolar risco de mudança.',
          'Priorizei observabilidade no sprint inicial para acelerar resposta a incidentes.',
        ],
      },
      secondary: {
        title: 'Case Secundário: Automação de Fluxo Interno',
        context: 'Padronizei fluxos de deploy e QA entre squads de produto com ferramental compartilhado.',
        impacts: [
          'Economia aproximada de 18 horas de engenharia por squad em cada sprint.',
          'Redução de 29% na frequência de rollback em produção em dois trimestres.',
        ],
        decisions: [
          'Usei rollout incremental para evitar interrupção de entrega nos times.',
          'Mantive checagens de política no CI para reforçar gates de qualidade.',
        ],
      },
      contribution: {
        title: 'Contribuição Selecionada: Base de Observabilidade',
        body: 'Liderei a primeira base de tracing e alertas ponta a ponta, dando um vocabulário comum para decisões de performance e confiabilidade.',
      },
    },
    skills: {
      title: 'Habilidades',
      frontend: {
        title: 'Frontend',
        items: ['Vue 3 + TypeScript', 'Sistemas com Tailwind CSS', 'Acessibilidade e arquitetura de interação'],
      },
      backendTooling: {
        title: 'Backend e Tooling',
        items: ['Design de serviços em Node.js', 'Operação com PostgreSQL e Redis', 'CI/CD, observabilidade e automação de release'],
      },
    },
    writing: {
      title: 'Escritos',
      body: 'Notas curtas sobre tradeoffs de software, sistemas de entrega e decisões práticas de arquitetura.',
      link: 'Abrir rota de escritos',
    },
    contact: {
      title: 'Contato',
      body: 'Se você está construindo um produto que precisa de ownership técnico claro, vamos conversar.',
      email: 'Email',
      linkedin: 'LinkedIn',
    },
    footer: {
      nameYear: 'omelodev - {year}',
      locationTimezone: 'Estados Unidos / UTC-5 a UTC-4',
      links: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
  },
}
