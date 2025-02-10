"use client";

interface LanguageBadgeProps {
  name: string;
  type?: 'frontend' | 'backend' | 'database' | 'devops';
}

const BADGE_CONFIGS = {
  // Frontend
  React: {
    color: '61DAFB',
    logo: 'react',
    logoColor: 'black'
  },
  'Next.js': {
    color: '000000',
    logo: 'next.js',
    logoColor: 'white'
  },
  'Tailwind CSS': {
    color: '38B2AC',
    logo: 'tailwind-css',
    logoColor: 'white'
  },
  TypeScript: {
    color: '3178C6',
    logo: 'typescript',
    logoColor: 'white'
  },
  
  // Backend
  'Node.js': {
    color: '339933',
    logo: 'node.js',
    logoColor: 'white'
  },
  Python: {
    color: '14354C',
    logo: 'python',
    logoColor: 'white'
  },
  FastAPI: {
    color: '13988a',
    logo: 'fastapi',
    logoColor: 'white'
  },
  Django: {
    color: '092E20',
    logo: 'django',
    logoColor: 'white'
  },
  
  // Database
  MongoDB: {
    color: '4ea94b',
    logo: 'mongodb',
    logoColor: 'white'
  },
  PostgreSQL: {
    color: '316192',
    logo: 'postgresql',
    logoColor: 'white'
  },
  MySQL: {
    color: '4479A1',
    logo: 'mysql',
    logoColor: 'white'
  },
  
  // DevOps
  Docker: {
    color: '2496ED',
    logo: 'docker',
    logoColor: 'white'
  },
  Kubernetes: {
    color: '326ce5',
    logo: 'kubernetes',
    logoColor: 'white'
  },
  AWS: {
    color: 'FF9900',
    logo: 'amazon-aws',
    logoColor: 'white'
  }
};

export function LanguageBadge({ name, type }: LanguageBadgeProps) {
  const config = BADGE_CONFIGS[name as keyof typeof BADGE_CONFIGS];
  if (!config) return null;

  const badgeUrl = `https://img.shields.io/badge/${encodeURIComponent(name)}-%23${config.color}.svg?style=for-the-badge&logo=${config.logo}&logoColor=${config.logoColor}`;

  return (
    <img 
      src={badgeUrl} 
      alt={`${name} badge`}
      className="h-8 transition-transform hover:scale-105"
    />
  );
}
