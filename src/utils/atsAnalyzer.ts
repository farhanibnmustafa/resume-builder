import type { ResumeData, AtsScoreBreakdown } from '../types/resume';

const ACTION_VERBS = [
  'architected', 'built', 'created', 'designed', 'developed', 'engineered', 'implemented',
  'launched', 'spearheaded', 'managed', 'led', 'directed', 'oversaw', 'coordinated',
  'optimized', 'accelerated', 'increased', 'boosted', 'reduced', 'cut', 'slashed',
  'automated', 'championed', 'deployed', 'expanded', 'generated', 'improved',
  'pioneered', 'transformed', 'delivered', 'established', 'streamlined'
];

export function analyzeAtsScore(data: ResumeData): AtsScoreBreakdown {
  const details: AtsScoreBreakdown['details'] = [];
  const missingKeywords: string[] = [];

  // 1. Contact Information Analysis (Max 25)
  let contactScore = 0;
  const contactMax = 25;
  const contactTips: string[] = [];

  if (data.personalInfo.fullName.trim()) contactScore += 5;
  else contactTips.push('Add your full name.');

  if (data.personalInfo.email.trim() && data.personalInfo.email.includes('@')) contactScore += 5;
  else contactTips.push('Add a professional email address.');

  if (data.personalInfo.phone.trim()) contactScore += 5;
  else contactTips.push('Add a phone number for recruiter contact.');

  if (data.personalInfo.location.trim()) contactScore += 5;
  else contactTips.push('Add your city and state/country location.');

  if (data.personalInfo.linkedin.trim() || data.personalInfo.website.trim() || data.personalInfo.github.trim()) contactScore += 5;
  else contactTips.push('Add a LinkedIn or Portfolio link to boost credibility.');

  details.push({
    category: 'Contact Information',
    score: contactScore,
    maxScore: contactMax,
    feedback: contactScore === contactMax ? 'Perfect contact detail coverage.' : 'Missing essential contact fields.',
    tips: contactTips,
  });

  // 2. Summary Quality (Max 15)
  let summaryScore = 0;
  const summaryMax = 15;
  const summaryTips: string[] = [];
  const wordCount = data.personalInfo.summary ? data.personalInfo.summary.trim().split(/\s+/).length : 0;

  if (wordCount >= 30) {
    summaryScore = 15;
  } else if (wordCount >= 10) {
    summaryScore = 8;
    summaryTips.push('Expand your summary to 30-60 words highlighting key impact.');
  } else {
    summaryTips.push('Write a compelling 2-3 sentence professional summary introducing your expertise.');
  }

  details.push({
    category: 'Professional Summary',
    score: summaryScore,
    maxScore: summaryMax,
    feedback: summaryScore === 15 ? 'Strong executive bio with great length.' : 'Summary could be more detailed.',
    tips: summaryTips,
  });

  // 3. Work Experience & Impact Bullet Points (Max 30)
  let expScore = 0;
  const expMax = 30;
  const expTips: string[] = [];
  let actionVerbCount = 0;
  let metricCount = 0;

  if (data.experiences.length === 0) {
    expTips.push('Add at least 1 work experience entry.');
  } else {
    expScore += 10; // Base score for having experience

    let totalBullets = 0;
    data.experiences.forEach((exp) => {
      exp.highlights.forEach((bullet) => {
        totalBullets++;
        const lowerBullet = bullet.toLowerCase();

        // Action verb check
        if (ACTION_VERBS.some((verb) => lowerBullet.includes(verb))) {
          actionVerbCount++;
        }

        // Metrics check (numbers, %, $, etc)
        if (/\d+%|\$\d+|\d+\+|\d+k|\d+m/i.test(bullet)) {
          metricCount++;
        }
      });
    });

    if (totalBullets >= 3) expScore += 5;
    else expTips.push('Add more detail bullets to your experience entries.');

    if (actionVerbCount >= 3) {
      expScore += 8;
    } else {
      expTips.push('Start bullet points with strong action verbs (e.g., "Architected", "Engineered", "Optimized").');
    }

    if (metricCount >= 2) {
      expScore += 7;
    } else {
      expTips.push('Include quantifiable metrics (e.g., "Increased conversion by 25%", "Reduced load time by 40%").');
    }
  }

  details.push({
    category: 'Experience & Action Verbs',
    score: expScore,
    maxScore: expMax,
    feedback: expScore >= 25 ? 'High impact experience points with strong action metrics!' : 'Needs stronger action verbs and quantifiable results.',
    tips: expTips,
  });

  // 4. Skills & Keywords (Max 15)
  let skillScore = 0;
  const skillMax = 15;
  const skillTips: string[] = [];

  const totalSkills = data.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  if (totalSkills >= 8) {
    skillScore = 15;
  } else if (totalSkills >= 4) {
    skillScore = 10;
    skillTips.push('Add a few more industry-specific technical or soft skills.');
  } else {
    skillTips.push('Add at least 6-8 relevant skills to rank higher in ATS screeners.');
  }

  if (data.skillCategories.length === 0) {
    missingKeywords.push('Frontend', 'Backend', 'Leadership', 'Agile', 'API Design');
  }

  details.push({
    category: 'Skills & Keyword Density',
    score: skillScore,
    maxScore: skillMax,
    feedback: skillScore === 15 ? 'Excellent skill section coverage!' : 'Add more target keywords to pass ATS filters.',
    tips: skillTips,
  });

  // 5. Education & Certifications (Max 15)
  let eduScore = 0;
  const eduMax = 15;
  const eduTips: string[] = [];

  if (data.education.length > 0) {
    eduScore += 10;
  } else {
    eduTips.push('Add your education history (Degree, Institution).');
  }

  if (data.certifications.length > 0 || data.projects.length > 0) {
    eduScore += 5;
  } else {
    eduTips.push('Add projects or certifications to showcase continuous learning.');
  }

  details.push({
    category: 'Education & Credentials',
    score: eduScore,
    maxScore: eduMax,
    feedback: eduScore === 15 ? 'Education & credentials complete.' : 'Missing education or certifications.',
    tips: eduTips,
  });

  // Total Score Calculation
  const totalScore = details.reduce((sum, item) => sum + item.score, 0);

  let rating: AtsScoreBreakdown['rating'] = 'Needs Work';
  if (totalScore >= 90) rating = 'Excellent';
  else if (totalScore >= 75) rating = 'Strong';
  else if (totalScore >= 60) rating = 'Good';

  return {
    score: totalScore,
    rating,
    details,
    missingKeywords,
    actionVerbCount,
  };
}
