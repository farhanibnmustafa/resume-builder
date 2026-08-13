import type { ResumeData } from '../types/resume';

export interface BulletSuggestion {
  verb: string;
  text: string;
  category: 'Performance' | 'Architecture' | 'Leadership' | 'Security & Testing' | 'Full-Stack';
}

export function generateSmartBulletsForExperience(
  position: string,
  company: string,
  resumeData: ResumeData
): BulletSuggestion[] {
  const roleName = position.trim() || resumeData.personalInfo.jobTitle || 'Software Professional';
  const compName = company.trim() || 'the organization';

  // Extract real user skills from skill categories
  const allSkills = Array.from(
    new Set(
      resumeData.skillCategories
        .flatMap((cat) => cat.skills.map((s) => s.name.trim()))
        .filter(Boolean)
    )
  );

  const skill1 = allSkills[0] || 'modern frameworks';
  const skill2 = allSkills[1] || 'web technologies';
  const skill3 = allSkills[2] || 'automated pipelines';
  const skill4 = allSkills[3] || 'database systems';

  // Extract user projects for contextual reference (formatted to Title Case if ALL CAPS)
  const formatProjectName = (name: string) => {
    if (name === name.toUpperCase() && name.length > 4) {
      return name
        .toLowerCase()
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    return name;
  };

  const projectNames = Array.from(
    new Set(resumeData.projects.map((p) => formatProjectName(p.name.trim())).filter(Boolean))
  );
  const projRef = projectNames[0]
    ? `key initiatives including ${projectNames[0]}`
    : 'high-impact enterprise applications';

  // Contextual domain awareness
  const lowerRole = roleName.toLowerCase();
  const lowerSkills = allSkills.join(' ').toLowerCase();
  const isCyber =
    lowerRole.includes('cyber') ||
    lowerRole.includes('security') ||
    lowerRole.includes('penetration') ||
    lowerSkills.includes('security') ||
    lowerSkills.includes('penetration');

  const suggestions: BulletSuggestion[] = [];

  // 1. Architecture & Performance
  suggestions.push({
    verb: 'Architected',
    category: 'Architecture',
    text: `Architected resilient software modules at ${compName} using ${skill1} and ${skill2}, increasing API throughput by 35% and maintaining 99.9% uptime.`
  });

  // 2. High-Impact Engineering & Frontend/Backend
  suggestions.push({
    verb: 'Engineered',
    category: 'Full-Stack',
    text: `Engineered responsive, performant user workflows leveraging ${skill1}${allSkills[2] ? ` and ${allSkills[2]}` : ''}, cutting page latency by 45ms.`
  });

  // 3. Security / Quality / Testing
  if (isCyber) {
    suggestions.push({
      verb: 'Spearheaded',
      category: 'Security & Testing',
      text: `Spearheaded penetration testing and security assessment workflows, identifying and mitigating 95%+ of critical system vulnerabilities.`
    });
  } else {
    suggestions.push({
      verb: 'Automated',
      category: 'Performance',
      text: `Automated end-to-end testing and CI/CD pipelines utilizing ${skill2}, accelerating release cycles from 2 weeks to under 1 hour.`
    });
  }

  // 4. Project Delivery & Business Impact
  suggestions.push({
    verb: 'Delivered',
    category: 'Leadership',
    text: `Delivered ${projRef} at ${compName}, collaborating cross-functionally to achieve key product deliverables 15% ahead of target.`
  });

  // 5. Optimization & Scaling
  suggestions.push({
    verb: 'Optimized',
    category: 'Performance',
    text: `Optimized backend query execution and caching mechanisms using ${skill3} and ${skill4}, reducing database latency by 40% for active daily traffic.`
  });

  // 6. Systems Integration
  suggestions.push({
    verb: 'Scaled',
    category: 'Architecture',
    text: `Scaled cloud microservices and RESTful API integrations built with ${skill1}, ensuring smooth data sync across 5+ core modules.`
  });

  return suggestions;
}
