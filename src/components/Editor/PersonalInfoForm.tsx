import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Image, Sparkles, Upload, Trash2, Sliders, Circle, Square, LayoutGrid, X, Check, ArrowRight, Wand2, RefreshCw } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Common/SocialIcons';

export const PersonalInfoForm: React.FC = () => {
  const { resumeData, themeConfig, updatePersonalInfo, setPhotoSize, setPhotoShape } = useResume();
  const { personalInfo, experiences, skillCategories, projects, certifications } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showVerbsModal, setShowVerbsModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai-generator' | 'action-verbs'>('ai-generator');
  const [notification, setNotification] = useState<string | null>(null);
  const [isRemovingPhotoBackground, setIsRemovingPhotoBackground] = useState(false);
  const [backgroundRemovalProgress, setBackgroundRemovalProgress] = useState(0);
  const [photoProcessingError, setPhotoProcessingError] = useState<string | null>(null);

  const photoSize = themeConfig.photoSize || 105;
  const photoShape = themeConfig.photoShape || 'circle';

  // Extract clean primary job title for narrative sentence synthesis
  const fullJobTitle = personalInfo.jobTitle || 'Software Professional';
  const jobTitle = fullJobTitle.split(/[|,\/]/)[0].trim() || 'Software Professional';

  // Deduplicate and clean skills
  const allSkills = Array.from(new Set(skillCategories.flatMap((c) => c.skills.map((s) => s.name.trim())).filter(Boolean)));
  const topSkillsStr = allSkills.length > 0 ? allSkills.slice(0, 5).join(', ') : 'modern technologies and frameworks';

  // Filter tech-related experiences & companies for technical bio synthesis
  const nonTechKeywords = ['hult prize', 'youth leadership', 'event', 'coordination', 'marketing'];
  const techExperiences = experiences.filter((e) => {
    const combinedText = `${e.position || ''} ${e.company || ''}`.toLowerCase();
    return !nonTechKeywords.some((keyword) => combinedText.includes(keyword));
  });

  const targetExperiences = techExperiences.length > 0 ? techExperiences : experiences;

  // Deduplicate tech companies and format phrase cleanly
  const uniqueCompanies = Array.from(new Set(targetExperiences.map((e) => e.company?.trim()).filter(Boolean)));
  let companyPhrase = '';
  if (uniqueCompanies.length === 1) {
    companyPhrase = `at ${uniqueCompanies[0]}`;
  } else if (uniqueCompanies.length > 1) {
    const lastComp = uniqueCompanies[uniqueCompanies.length - 1];
    const otherComps = uniqueCompanies.slice(0, -1).join(', ');
    companyPhrase = `across key tech organizations including ${otherComps} and ${lastComp}`;
  }

  // Format project names cleanly (Title Case if ALL CAPS)
  const formatProjectTitle = (name: string) => {
    if (name === name.toUpperCase() && name.length > 4) {
      return name
        .toLowerCase()
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    return name;
  };

  const projectNames = Array.from(new Set(projects.map((p) => formatProjectTitle(p.name?.trim())).filter(Boolean)));
  let projectStr = '';
  if (projectNames.length > 0) {
    if (projectNames.length <= 3) {
      projectStr = `Key projects include ${projectNames.join(', ')}.`;
    } else {
      const topProjects = projectNames.slice(0, 3).join(', ');
      projectStr = `Delivered ${projectNames.length}+ impactful projects including ${topProjects}.`;
    }
  }

  const certList = Array.from(new Set(certifications.map((c) => c.title?.trim()).filter(Boolean)));
  const certStr = certList.length > 0 ? `Certified in ${certList.slice(0, 3).join(', ')}.` : '';

  // Accurate tech experience years calculation from tech roles and projects
  const calculateTechExpYearsPhrase = () => {
    const years: number[] = [];
    const currentYear = new Date().getFullYear();

    targetExperiences.forEach((exp) => {
      const startMatch = exp.startDate?.match(/\b(19|20)\d{2}\b/);
      if (startMatch) years.push(parseInt(startMatch[0], 10));

      if (exp.current) {
        years.push(currentYear);
      } else if (exp.endDate) {
        const endMatch = exp.endDate.match(/\b(19|20)\d{2}\b/);
        if (endMatch) years.push(parseInt(endMatch[0], 10));
      }
    });

    projects.forEach((proj) => {
      const roleText = proj.role || '';
      const dateMatch = roleText.match(/\b(19|20)\d{2}\b/);
      if (dateMatch) years.push(parseInt(dateMatch[0], 10));
    });

    if (years.length >= 2) {
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      const diffYears = maxYear - minYear;
      if (diffYears >= 1 && diffYears <= 15) {
        return `${diffYears}+ years of technical`;
      }
    }

    return 'hands-on technical';
  };

  const expYears = calculateTechExpYearsPhrase();
  const companySnippet = companyPhrase ? ` ${companyPhrase}` : '';

  const generatedSummaries = [
    {
      title: '🎯 Executive & ATS-Optimized Summary (Recommended)',
      badge: '100% ATS Friendly',
      text: `${jobTitle} with ${expYears} experience${companySnippet}, specializing in ${topSkillsStr}. Proven track record of building resilient web systems, optimizing performance, and collaborating cross-functionally to achieve core business objectives. ${projectStr} ${certStr}`.trim().replace(/\s+/g, ' ')
    },
    {
      title: '💻 Technical & Engineering Specialist Summary',
      badge: 'Humanized & Natural',
      text: `Versatile ${jobTitle} specializing in ${topSkillsStr}.${companySnippet ? ` Experienced in building software${companySnippet}.` : ''} Hands-on experience in architecting clean, maintainable code, streamlining automated pipelines, and driving application efficiency.`
    },
    {
      title: '🚀 Leadership & Impact Summary',
      badge: 'Executive Level',
      text: `Results-oriented ${jobTitle} combining strong technical acumen with effective project leadership.${companySnippet ? ` Proven background working${companySnippet}.` : ''} Recognized for mentoring engineers, driving continuous improvement, and delivering high-value products on schedule.`
    }
  ];

  const verbCategories = [
    {
      title: '🚀 Leadership & Management',
      verbs: ['Spearheaded', 'Orchestrated', 'Championed', 'Directed', 'Coordinated', 'Governed', 'Mentored', 'Steered', 'Empowered', 'Supervised'],
      templates: [
        'Spearheaded cross-functional team of 8 engineers delivering enterprise cloud features on schedule.',
        'Mentored and onboarded junior developers while establishing rigorous code review standards.'
      ]
    },
    {
      title: '💻 Engineering & Architecture',
      verbs: ['Architected', 'Engineered', 'Refactored', 'Deployed', 'Benchmarked', 'Automated', 'Integrated', 'Scaled', 'Optimized', 'Configured'],
      templates: [
        'Architected high-throughput microservices using React, TypeScript, Node.js, and PostgreSQL.',
        'Automated CI/CD deployment pipelines reducing release cycles from 2 weeks to under 30 minutes.'
      ]
    },
    {
      title: '📈 Impact & Performance Growth',
      verbs: ['Accelerated', 'Maximized', 'Streamlined', 'Expanded', 'Boosted', 'Pioneered', 'Delivered', 'Overhauled', 'Transformed', 'Yielded'],
      templates: [
        'Optimized critical database queries resulting in a 45% latency reduction for 1M+ active daily users.',
        'Streamlined internal workflow automation cutting operational overhead by 30% annually.'
      ]
    },
    {
      title: '🧠 Strategy & Problem Solving',
      verbs: ['Formulated', 'Diagnosed', 'Re-engineered', 'Formed', 'Conceptualized', 'Devised', 'Innovated', 'Standardized'],
      templates: [
        'Diagnosed performance bottlenecks across legacy frontend modules and executed a modern refactor.',
        'Standardized API response contracts across 12 core services ensuring seamless integration.'
      ]
    }
  ];

  const handleInsertText = (snippet: string) => {
    const currentSummary = personalInfo.summary || '';
    const updated = currentSummary ? `${currentSummary.trim()} ${snippet}` : snippet;
    updatePersonalInfo({ summary: updated });
    
    setNotification(`Inserted snippet into Bio!`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleReplaceSummary = (fullText: string) => {
    updatePersonalInfo({ summary: fullText });
    setNotification(`Bio updated with AI generated summary!`);
    setTimeout(() => setNotification(null), 2500);
    setShowVerbsModal(false);
  };

  const blobToDataUrl = (blob: Blob) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Could not read processed image.'));
    reader.onerror = () => reject(reader.error || new Error('Could not read processed image.'));
    reader.readAsDataURL(blob);
  });

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert('Please upload an image smaller than 15 MB.');
      return;
    }

    setIsRemovingPhotoBackground(true);
    setBackgroundRemovalProgress(0);
    setPhotoProcessingError(null);

    try {
      const { removeBackground } = await import('@imgly/background-removal');
      const transparentPhoto = await removeBackground(file, {
        model: 'isnet_quint8',
        device: 'cpu',
        output: {
          format: 'image/png',
          quality: 1,
        },
        progress: (_key: string, current: number, total: number) => {
          if (total > 0) setBackgroundRemovalProgress(Math.round((current / total) * 100));
        },
      });
      updatePersonalInfo({ photoUrl: await blobToDataUrl(transparentPhoto) });
      setBackgroundRemovalProgress(100);
    } catch (error) {
      console.error('Automatic photo background removal failed:', error);
      setPhotoProcessingError('Background removal failed. Check your internet connection and try again.');
    } finally {
      setIsRemovingPhotoBackground(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const formatPhoneNumber = (input: string): string => {
    if (!input) return '';
    const raw = input.trim();
    const digits = raw.replace(/\D/g, '');
    if (!digits) return raw;

    // 1. Bangladesh: 01XXXXXXXXX (11 digits) -> +880 1645-662120
    if (digits.length === 11 && digits.startsWith('01')) {
      return `+880 ${digits.slice(1, 5)}-${digits.slice(5)}`;
    }
    // 1b. Bangladesh: 8801XXXXXXXXX (13 digits) -> +880 1645-662120
    if (digits.length === 13 && digits.startsWith('8801')) {
      return `+880 ${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    // 2. North America: 10 digits (5552345678) -> +1 (555) 234-5678
    if (digits.length === 10 && !digits.startsWith('0')) {
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    if (digits.length === 11 && digits.startsWith('1')) {
      return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
    }
    // 3. Generic International
    if (raw.startsWith('+')) {
      if (digits.length > 7 && !raw.includes('-') && !raw.includes(' ')) {
        return `+${digits.slice(0, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
      }
      return raw;
    }
    return raw;
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <User className="section-icon" />
        <div>
          <h2>Personal & Contact Information</h2>
          <p>Provide your essential details so recruiters can reach you easily.</p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="fullName">Full Name *</label>
          <input
            id="fullName"
            type="text"
            className="input-field"
            placeholder="e.g. Farhan Ahmed"
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="jobTitle">Professional Job Title *</label>
          <input
            id="jobTitle"
            type="text"
            className="input-field"
            placeholder="e.g. Senior Full Stack Engineer"
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email"><Mail size={14} /> Email Address *</label>
          <input
            id="email"
            type="email"
            className="input-field"
            placeholder="farhan@example.com"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone"><Phone size={14} /> Phone Number *</label>
          <input
            id="phone"
            type="text"
            className="input-field"
            placeholder="+880 1645-662120"
            value={personalInfo.phone}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              updatePersonalInfo({ phone: formatted });
            }}
            onBlur={(e) => {
              const formatted = formatPhoneNumber(e.target.value);
              updatePersonalInfo({ phone: formatted });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location"><MapPin size={14} /> Location / City</label>
          <input
            id="location"
            type="text"
            className="input-field"
            placeholder="San Francisco, CA"
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website"><Globe size={14} /> Portfolio / Website</label>
          <input
            id="website"
            type="url"
            className="input-field"
            placeholder="https://farhan-dev.io"
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin"><LinkedinIcon size={14} /> LinkedIn URL</label>
          <input
            id="linkedin"
            type="url"
            className="input-field"
            placeholder="https://linkedin.com/in/username"
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="github"><GithubIcon size={14} /> GitHub / Portfolio URL</label>
          <input
            id="github"
            type="url"
            className="input-field"
            placeholder="https://github.com/username"
            value={personalInfo.github}
            onChange={(e) => updatePersonalInfo({ github: e.target.value })}
          />
        </div>

        {/* Profile Picture Drag & Drop, Crop / Resize Controls */}
        <div className="form-group full-width photo-manager-container">
          <label><Image size={14} /> Profile Picture Manager</label>
          
          <div 
            className="photo-dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {isRemovingPhotoBackground && (
              <div className="photo-processing-status" role="status">
                <RefreshCw size={18} className="spin" />
                <span>Removing background… {backgroundRemovalProgress > 0 ? `${backgroundRemovalProgress}%` : 'preparing model'}</span>
              </div>
            )}
            {photoProcessingError && <div className="photo-processing-error">{photoProcessingError}</div>}
            {personalInfo.photoUrl ? (
              <div className="photo-preview-bar">
                <img 
                  src={personalInfo.photoUrl} 
                  alt="Profile" 
                  className={`photo-thumb shape-${photoShape}`}
                  style={{ width: `${Math.min(photoSize, 80)}px`, height: `${Math.min(photoSize, 80)}px` }}
                />
                <div className="photo-actions">
                  <span className="photo-status-text">Photo Loaded</span>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      disabled={isRemovingPhotoBackground}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={14} /> Change Photo
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => updatePersonalInfo({ photoUrl: '' })}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="dropzone-empty" onClick={() => fileInputRef.current?.click()}>
                <Upload size={28} className="dropzone-icon" />
                <p><strong>Drag & Drop your photo here</strong> or click to browse</p>
                <span className="dropzone-sub">Supports PNG, JPG, WebP</span>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              disabled={isRemovingPhotoBackground}
              className="hidden-file-input"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
          </div>

          {/* Photo Size & Shape Controls */}
          {personalInfo.photoUrl && (
            <div className="photo-controls-row">
              <div className="photo-size-control">
                <label className="flex-align"><Sliders size={13} /> Photo Size / Zoom ({photoSize}px)</label>
                <input
                  type="range"
                  min={70}
                  max={150}
                  step={5}
                  value={photoSize}
                  onChange={(e) => setPhotoSize(Number(e.target.value))}
                  className="range-slider"
                />
              </div>

              <div className="photo-shape-control">
                <label className="flex-align"><LayoutGrid size={13} /> Shape</label>
                <div className="shape-toggle-buttons">
                  <button
                    type="button"
                    className={`shape-btn ${photoShape === 'circle' ? 'active' : ''}`}
                    onClick={() => setPhotoShape('circle')}
                    title="Circle"
                  >
                    <Circle size={14} /> Circle
                  </button>
                  <button
                    type="button"
                    className={`shape-btn ${photoShape === 'rounded' ? 'active' : ''}`}
                    onClick={() => setPhotoShape('rounded')}
                    title="Rounded Square"
                  >
                    <LayoutGrid size={14} /> Rounded
                  </button>
                  <button
                    type="button"
                    className={`shape-btn ${photoShape === 'square' ? 'active' : ''}`}
                    onClick={() => setPhotoShape('square')}
                    title="Square"
                  >
                    <Square size={14} /> Square
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Manual URL Fallback Input */}
          <div className="manual-url-fallback mt-2">
            <input
              type="text"
              className="input-field input-sm"
              placeholder="Or paste image URL (https://...)"
              value={personalInfo.photoUrl || ''}
              onChange={(e) => updatePersonalInfo({ photoUrl: e.target.value })}
            />
          </div>
        </div>

        {/* Summary & Action Verbs Assistant */}
        <div className="form-group full-width">
          <div className="label-with-badge" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <label htmlFor="summary" style={{ margin: 0 }}><Briefcase size={14} /> Professional Summary / Bio</label>
            
            <button
              type="button"
              className="badge badge-accent action-verbs-btn"
              onClick={() => setShowVerbsModal(true)}
            >
              <Sparkles size={13} /> AI Summary & Action Verbs Assistant
            </button>
          </div>

          {notification && (
            <div className="verbs-toast">
              <Check size={14} /> {notification}
            </div>
          )}

          <textarea
            id="summary"
            className="textarea-field"
            rows={5}
            placeholder="Write a concise 3-4 sentence overview highlighting your key strengths, years of experience, and notable accomplishments..."
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
          />

          <div className="ai-suggestions-box" style={{ marginTop: '10px' }}>
            <span className="suggestion-title">AI Generated Summary Snippets from Your CV Sections (Click to add):</span>
            <div className="suggestion-chips">
              {generatedSummaries.map((gen, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleInsertText(gen.text)}
                >
                  + {gen.title}: {gen.text.slice(0, 35)}...
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Verbs & AI Summary Generator Modal */}
      {showVerbsModal && (
        <div className="verbs-modal-overlay" onClick={() => setShowVerbsModal(false)}>
          <div className="verbs-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="verbs-modal-header">
              <div className="flex-align gap-2">
                <Wand2 className="modal-sparkle-icon" size={22} />
                <div>
                  <h3>AI Resume Summary & Power Verbs Assistant</h3>
                  <p>Analyzes your Experience, Skills, Projects & Certifications to synthesize impact summaries</p>
                </div>
              </div>
              <button 
                type="button" 
                className="close-modal-btn"
                onClick={() => setShowVerbsModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="verbs-modal-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'ai-generator' ? 'active' : ''}`}
                onClick={() => setActiveTab('ai-generator')}
              >
                <Wand2 size={14} /> AI Tailored Summaries (from CV Data)
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'action-verbs' ? 'active' : ''}`}
                onClick={() => setActiveTab('action-verbs')}
              >
                <Sparkles size={14} /> Action Verbs & Sentences
              </button>
            </div>

            <div className="verbs-modal-body">
              {activeTab === 'ai-generator' && (
                <div className="ai-summaries-section">
                  <div className="ai-info-banner">
                    <RefreshCw size={14} className="banner-icon" />
                    <span>Calculated using your filled CV data: <strong>{experiences.length} Experiences</strong>, <strong>{allSkills.length} Skills</strong>, <strong>{projects.length} Projects</strong>.</span>
                  </div>

                  <div className="ai-cards-list">
                    {generatedSummaries.map((gen, idx) => (
                      <div key={idx} className="ai-summary-card">
                        <div className="ai-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="ai-card-title">{gen.title}</div>
                          <span className="badge badge-accent" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                            <Check size={11} /> {gen.badge}
                          </span>
                        </div>
                        <p className="ai-card-text">{gen.text}</p>
                        <div className="ai-card-actions">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleReplaceSummary(gen.text)}
                          >
                            <Check size={14} /> Use This Entire Summary
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleInsertText(gen.text)}
                          >
                            + Append to Bio
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'action-verbs' && (
                <div className="action-verbs-section">
                  {verbCategories.map((cat, i) => (
                    <div key={i} className="verb-cat-block">
                      <h4>{cat.title}</h4>
                      
                      <div className="verb-pills-wrap">
                        {cat.verbs.map((verb, vIdx) => (
                          <button
                            key={vIdx}
                            type="button"
                            className="verb-pill"
                            onClick={() => handleInsertText(verb)}
                          >
                            + {verb}
                          </button>
                        ))}
                      </div>

                      <div className="verb-sentences-list">
                        {cat.templates.map((tmpl, tIdx) => (
                          <div 
                            key={tIdx} 
                            className="verb-sentence-item"
                            onClick={() => handleInsertText(tmpl)}
                          >
                            <ArrowRight size={13} className="tmpl-arrow" />
                            <span>{tmpl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="verbs-modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowVerbsModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
