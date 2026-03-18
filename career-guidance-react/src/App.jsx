import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { careerData, courseGraph } from './data/careerData';
import './App.css';

// Fuzzy Matching Algorithm
function fuzzyScore(query, keyword) {
  if (keyword === query) return 100;
  if (query.includes(keyword)) return 90;
  if (keyword.includes(query)) return 80;
  const queryWords = query.split(/[\s.,\-/]+/).filter(w => w.length > 1);
  const kwWords = keyword.split(/[\s.,\-/]+/).filter(w => w.length > 1);
  let matchCount = 0;
  for (const qw of queryWords) {
    for (const kw of kwWords) {
      if (kw.includes(qw) || qw.includes(kw)) {
        matchCount++;
        break;
      }
    }
  }
  if (matchCount > 0) return 30 + (matchCount / queryWords.length) * 50;
  for (const kw of kwWords) {
    for (const qw of queryWords) {
      if (qw.length >= 3 && kw.length >= 3) {
        let common = 0;
        for (let i = 0; i < Math.min(qw.length, kw.length); i++) {
          if (qw[i] === kw[i]) common++;
        }
        if (common / Math.max(qw.length, kw.length) > 0.6) return 25;
      }
    }
  }
  return 0;
}

function BentoCard({ title, icon, colorClass, isWide, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bento-card ${isWide ? 'bento-wide' : ''}`}
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
    >
      <div className="bento-card-head">
        <span className={`bento-icon ${colorClass}`}><i className={icon}></i></span>
        <h3>{title}</h3>
      </div>
      <div className="bento-body">
        {children}
      </div>
    </motion.div>
  );
}

function App() {
  const [studentName, setStudentName] = useState('');
  const [completedStudy, setCompletedStudy] = useState('');
  const [searchType, setSearchType] = useState('course');
  const [selectedKey, setSelectedKey] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [currentPath, setCurrentPath] = useState(null);

  // AI-LIKE SMART SEARCH
  const searchResults = useMemo(() => {
    const query = completedStudy.toLowerCase().trim();
    if (query.length < 2) return [];

    const results = [];
    for (const item of courseGraph) {
      if (item.type !== searchType) continue;
      let bestScore = 0;
      for (const kw of item.afterKeywords) {
        const score = fuzzyScore(query, kw);
        if (score > bestScore) bestScore = score;
      }
      const labelScore = fuzzyScore(query, item.label.toLowerCase());
      if (labelScore > bestScore) bestScore = labelScore;

      if (bestScore > 20) {
        results.push({ ...item, score: bestScore });
      }
    }
    return results.sort((a, b) => b.score - a.score);
  }, [completedStudy, searchType]);

  // Reset selection when search results change
  useEffect(() => {
    setSelectedKey('');
  }, [searchResults]);

  const handleExplore = (e) => {
    e.preventDefault();
    const data = careerData[selectedKey];
    if (data) {
      setCurrentPath(data);
      setShowResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <main className="app-container">
      {/* Background Decorations */}
      <div className="bg-mesh" aria-hidden="true">
        <div className="mesh-ball ball-1"></div>
        <div className="mesh-ball ball-2"></div>
        <div className="mesh-ball ball-3"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo-icon"><i className="ri-compass-3-fill"></i></div>
          <div>
            <span className="nav-logo-text">FuturePath</span>
            <span className="nav-logo-sub"> Career Guide</span>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key="input-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="fade-in"
          >
            {/* Hero */}
            <header className="hero">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hero-content"
              >
                <div className="hero-chip">
                  <i className="ri-rocket-2-fill"></i>
                  <span> Future Success Path</span>
                </div>
                <h1 className="hero-title">
                  Your Personalized <span className="hero-gradient-text">FuturePath</span>
                </h1>
                <p className="hero-desc">
                  Discover over 200+ courses, exams, and career options tailored to your background.
                </p>
              </motion.div>
            </header>

            {/* Input Section */}
            <section className="glass-card">
              <div className="card-header">
                <div className="card-header-icon"><i className="ri-sparkling-2-line"></i></div>
                <div>
                  <h2>Start Your Journey</h2>
                  <p>Our analyzes Your Next Qualification</p>
                </div>
              </div>

              <form id="guidanceForm" onSubmit={handleExplore}>
                <div className="form-group">
                  <label><i className="ri-user-smile-line"></i> Your Name</label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      placeholder="e.g. Nikitha..."
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                    />
                    <div className="input-glow"></div>
                  </div>
                </div>

                <div className="form-group">
                  <label><i className="ri-graduation-cap-line"></i> What have you completed?</label>
                  <div className="input-wrap">
                    <input
                      type="text"
                      placeholder="e.g. 10th, B.Tech, Inter bipc..."
                      required
                      value={completedStudy}
                      onChange={(e) => setCompletedStudy(e.target.value)}
                    />
                    <div className="input-glow"></div>
                  </div>
                  <span className="input-hint" style={{ paddingTop: '10px' }}><i className="ri-search-line"></i> We will find related next steps!</span>
                </div>

                <div className="form-group">
                  <label><i className="ri-filter-3-line"></i> Show me:</label>
                  <div className="toggle-group">
                    <input
                      type="radio"
                      id="typeCourse"
                      name="searchType"
                      value="course"
                      checked={searchType === 'course'}
                      onChange={() => setSearchType('course')}
                    />
                    <label htmlFor="typeCourse" className="toggle-btn">
                      <i className="ri-book-2-fill"></i><span>Courses</span>
                    </label>
                    <input
                      type="radio"
                      id="typeExam"
                      name="searchType"
                      value="exam"
                      checked={searchType === 'exam'}
                      onChange={() => setSearchType('exam')}
                    />
                    <label htmlFor="typeExam" className="toggle-btn">
                      <i className="ri-medal-fill"></i><span>Exams</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label><i className="ri-list-check-3"></i> Select your Next Step</label>

                  {searchResults.length > 0 && (
                    <div className="recommendations-list" style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <p style={{ width: '100%', fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: '600' }}>
                        <i className="ri-sparkling-fill"></i> Top Recommendations:
                      </p>
                      {searchResults.slice(0, 3).map(res => (
                        <button
                          key={res.key}
                          type="button"
                          className="pill"
                          onClick={() => setSelectedKey(res.key)}
                          style={{
                            cursor: 'pointer',
                            background: selectedKey === res.key ? 'var(--grad-1)' : 'rgba(255,255,255,0.06)',
                            color: '#fff',
                            border: selectedKey === res.key ? '1px solid transparent' : '1px solid rgba(255,255,255,0.1)'
                          }}
                        >
                          {res.label}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="select-wrap">
                    <select
                      required
                      value={selectedKey}
                      onChange={(e) => setSelectedKey(e.target.value)}
                    >
                      {completedStudy.length < 2 ? (
                        <option value="" disabled>-- Type your study first --</option>
                      ) : searchResults.length === 0 ? (
                        <option value="" disabled>No results found. Try other keywords.</option>
                      ) : (
                        <>
                          <option value="" disabled>Found {searchResults.length} options — Select one:</option>
                          {searchResults.map(res => (
                            <option className='bg-color-options' key={res.key} value={res.key}>{res.label}</option>
                          ))}
                        </>
                      )}
                    </select>
                    <i className="ri-arrow-down-s-line select-arrow"></i>
                  </div>
                </div>

                <button type="submit" className="btn-primary" disabled={!selectedKey}>
                  <i className="ri-magic-fill"></i>
                  <span>Show Me Details</span>
                  <div className="btn-shine"></div>
                </button>
              </form>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="results-view"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="results-section"
          >
            <div className="results-header">
              <button className="btn-back" onClick={handleBack}>
                <i className="ri-arrow-left-line"></i> Back
              </button>
              <div className="results-title-area">
                <p className="results-greeting">
                  Hello, <strong>{studentName}</strong>! Our suggests the following path after <em>{completedStudy}</em>:
                </p>
                <h2 className="results-stream">
                  {currentPath.title}
                  <span style={{ fontSize: '0.9rem', marginLeft: '1rem', color: 'var(--cyan)', verticalAlign: 'middle' }}>
                    <i className="ri-shield-check-fill"></i> Confidence: {Math.round(searchResults.find(r => r.key === selectedKey)?.score || 95)}%
                  </span>
                </h2>
              </div>
            </div>

            <div className="bento-grid">
              <BentoCard title="What is it?" icon="ri-lightbulb-flash-fill" colorClass="blue" isWide={true} delay={0.1}>
                <p>{currentPath.overview}</p>
              </BentoCard>

              <BentoCard title="Subjects to Study" icon="ri-book-open-fill" colorClass="purple" delay={0.2}>
                <ul className="subject-list">
                  {currentPath.subjects.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </BentoCard>

              <BentoCard title="Top Institutions" icon="ri-community-fill" colorClass="orange" delay={0.3}>
                <div className="pill-container">
                  {currentPath.topInstitutions?.map((inst, i) => (
                    <span key={i} className="pill" style={{ borderColor: 'var(--orange)', color: 'var(--text)' }}>
                      <i className="ri-building-4-line"></i> {inst}
                    </span>
                  )) || <span className="pill">Reputed Universities/Colleges</span>}
                </div>
              </BentoCard>

              <BentoCard title="Career Roles & Jobs" icon="ri-briefcase-fill" colorClass="green" isWide={true} delay={0.4}>
                <div className="career-grid">
                  {currentPath.careers.map((c, i) => (
                    <div key={i} className="career-item">
                      <h4>{c.role}</h4>
                      <span>{c.desc}</span>
                    </div>
                  ))}
                </div>
              </BentoCard>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bento-card bento-wide tip-card"
              >
                <div className="tip-content">
                  <div className="tip-icon"><i className="ri-trophy-fill"></i></div>
                  <div>
                    <h4>💡 AI Expert Insight</h4>
                    <p>{currentPath.tip}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer" style={{ marginTop: '3rem', padding: '2rem', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
        <p>Made with ❤️ for students across India &nbsp;|&nbsp; FuturePath &copy; 2026</p>
      </footer>
    </main>
  );
}

export default App;
