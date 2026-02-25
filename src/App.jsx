import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #faf9f7;
    --ink: #1a1916;
    --mid: #6b6760;
    --soft: #e8e5e0;
    --accent: #c8441a;
    --serif: 'DM Serif Display', Georgia, serif;
    --mono: 'DM Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 500;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 4rem;
    background: var(--bg);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }
  nav.scrolled { border-bottom-color: var(--soft); }
  .nav-logo {
    font-family: var(--serif);
    font-size: 1.2rem;
    letter-spacing: 0.01em;
    color: var(--ink);
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .nav-links a {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--ink); }

  /* SECTIONS */
  section {
    min-height: 100vh;
    padding: 8rem 4rem 6rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* HERO */
  #hero {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100vh;
    padding-top: 6rem;
  }
  .hero-eyebrow {
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeUp 0.8s 0.2s forwards;
  }
  .hero-name {
    font-family: var(--serif);
    font-size: clamp(3.5rem, 8vw, 6.5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeUp 0.8s 0.4s forwards;
  }
  .hero-name em { font-style: italic; color: var(--mid); }
  .hero-desc {
    font-size: 1.1rem;
    color: var(--mid);
    max-width: 480px;
    line-height: 1.7;
    opacity: 0;
    animation: fadeUp 0.8s 0.6s forwards;
  }
  .hero-cta {
    margin-top: 3rem;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    opacity: 0;
    animation: fadeUp 0.8s 0.8s forwards;
  }
  .btn-primary {
    background: var(--ink);
    color: var(--bg);
    padding: 0.75rem 2rem;
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--accent); }
  .btn-ghost {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--mid);
    text-decoration: none;
    border-bottom: 1px solid var(--soft);
    padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { color: var(--ink); border-color: var(--ink); }

  /* SECTION LABELS */
  .section-label {
    font-family: var(--mono);
    font-size: 0.82rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 3rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .section-label::after {
    content: '';
    flex: 1;
    max-width: 60px;
    height: 1px;
    background: var(--soft);
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  .about-heading {
    font-family: var(--serif);
    font-size: clamp(2.5rem, 5vw, 3.75rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }
  .about-text { color: var(--mid); line-height: 1.8; font-size: 0.95rem; }
  .about-text p + p { margin-top: 1rem; }
  .tags {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .tag {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--soft);
    color: var(--mid);
  }
  .about-details { padding-top: 0.5rem; }
  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1rem 0;
    border-bottom: 1px solid var(--soft);
  }
  .detail-label {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--mid);
  }
  .detail-value {
    font-size: 0.88rem;
    color: var(--ink);
    text-align: right;
  }

  /* EDUCATION */
  #education { min-height: auto; }
  .edu-list { display: flex; flex-direction: column; margin-top: 0.5rem; }
  .edu-item {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 2rem;
    padding: 2rem 0;
    border-top: 1px solid var(--soft);
  }
  .edu-item:last-child { border-bottom: 1px solid var(--soft); }
  .edu-year {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.06em;
    color: var(--mid);
    padding-top: 0.25rem;
  }
  .edu-degree {
    font-family: var(--serif);
    font-size: 1.3rem;
    letter-spacing: -0.01em;
    margin-bottom: 0.3rem;
  }
  .edu-school {
    font-size: 0.88rem;
    color: var(--mid);
    margin-bottom: 0.5rem;
  }
  .edu-detail {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    color: var(--mid);
    line-height: 1.7;
  }

  /* SKILLS */
  #skills { min-height: auto; }
  .skills-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  .skill-groups { display: flex; flex-direction: column; gap: 2rem; }
  .skill-group-label {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--mid);
    margin-bottom: 0.75rem;
  }
  .skill-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .skill-chip {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.04em;
    padding: 0.3rem 0.7rem;
    border: 1px solid var(--soft);
    color: var(--ink);
    background: transparent;
    transition: background 0.15s, border-color 0.15s;
  }
  .skill-chip:hover { background: var(--soft); }
  .exp-list { display: flex; flex-direction: column; gap: 0; }
  .exp-item {
    display: flex;
    gap: 1rem;
    align-items: baseline;
    padding: 0.9rem 0;
    border-top: 1px solid var(--soft);
    font-size: 0.88rem;
    color: var(--mid);
    line-height: 1.5;
  }
  .exp-item:last-child { border-bottom: 1px solid var(--soft); }
  .exp-dot {
    color: var(--accent);
    font-size: 0.6rem;
    flex-shrink: 0;
    margin-top: 0.35rem;
  }
  .skills-heading {
    font-family: var(--serif);
    font-size: clamp(2.2rem, 4vw, 3.25rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
    margin-bottom: 2rem;
  }

  @media (max-width: 700px) {
    .skills-layout { grid-template-columns: 1fr; gap: 2.5rem; }
  }

  /* PROJECTS */
  .projects-list { display: flex; flex-direction: column; gap: 1px; }
  .project-card {
    padding: 2rem 0;
    border-top: 1px solid var(--soft);
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2rem;
    align-items: start;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
  }
  .project-card:last-child { border-bottom: 1px solid var(--soft); }
  .project-num {
    font-family: var(--mono);
    font-size: 0.68rem;
    color: var(--soft);
    letter-spacing: 0.05em;
    padding-top: 0.2rem;
  }
  .project-title {
    font-family: var(--serif);
    font-size: 1.4rem;
    letter-spacing: -0.01em;
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }
  .project-card:hover .project-title { color: var(--accent); }
  .project-desc { font-size: 0.88rem; color: var(--mid); line-height: 1.6; max-width: 480px; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem; }
  .project-tag {
    font-family: var(--mono);
    font-size: 0.6rem;
    letter-spacing: 0.06em;
    padding: 0.2rem 0.5rem;
    background: var(--soft);
    color: var(--mid);
  }
  .project-arrow {
    font-size: 1.2rem;
    color: var(--soft);
    transition: color 0.2s, transform 0.2s;
    padding-top: 0.2rem;
  }
  .project-card:hover .project-arrow { color: var(--ink); transform: translateX(4px); }

/* RESUME */
  #resume { min-height: auto; }
  .resume-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 2rem;
  }
  .resume-header .resume-heading {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    margin-bottom: 0;
  }
  .resume-embed {
    width: 100%;
    height: 80vh;
    border: 1px solid var(--soft);
    background: var(--soft);
  }
  .resume-fallback {
    width: 100%;
    height: 80vh;
    border: 1px solid var(--soft);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: #f5f3f0;
  }
  .resume-fallback-text {
    font-family: var(--mono);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    color: var(--mid);
  }
  /* CONTACT */
  #contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-heading {
    font-family: var(--serif);
    font-size: clamp(3rem, 6vw, 5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }
  .contact-heading em { font-style: italic; color: var(--mid); }
  .contact-sub { color: var(--mid); font-size: 0.95rem; max-width: 400px; line-height: 1.7; margin-bottom: 3rem; }
  .contact-links { display: flex; flex-direction: column; gap: 0; }
  .contact-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    border-top: 1px solid var(--soft);
    text-decoration: none;
    color: var(--ink);
    transition: padding-left 0.2s;
  }
  .contact-link:last-child { border-bottom: 1px solid var(--soft); }
  .contact-link:hover { padding-left: 0.5rem; }
  .contact-link:hover .contact-link-arrow { transform: translateX(4px); }
  .contact-link-label { font-family: var(--serif); font-size: 1.3rem; letter-spacing: -0.01em; }
  .contact-link-arrow { color: var(--mid); font-size: 1rem; transition: transform 0.2s; }

  .email-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 0;
    border-top: 1px solid var(--soft);
    border-bottom: 1px solid var(--soft);
    margin-bottom: -1px;
  }
  .email-box-label { font-family: var(--serif); font-size: 1.3rem; letter-spacing: -0.01em; }
  .email-value {
    font-family: var(--mono);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: var(--mid);
    background: var(--soft);
    padding: 0.4rem 0.9rem;
    user-select: all;
  }

  /* FOOTER */
  footer {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 4rem;
    border-top: 1px solid var(--soft);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-text {
    font-family: var(--mono);
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    color: var(--mid);
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.7s, transform 0.7s;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* RESPONSIVE */
  @media (max-width: 700px) {
    nav { padding: 1.25rem 1.5rem; }
    section { padding: 7rem 1.5rem 4rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .project-card { grid-template-columns: auto 1fr; }
    .project-arrow { display: none; }
    footer { padding: 2rem 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

const education = [
  {
    year: "2023",
    degree: "Master of Science in Data Science",
    school: "University of Virginia",
    detail: "Deep Learning, Bayesian Machine Learning, Statistical Modeling, High-Performance Computing, Big Data Systems",
  },
  {
    year: "2021",
    degree: "Bachelor of Arts in Statistics & Economics",
    school: "University of Virginia",
    detail: "International Finance & Macroeconomics, Machine Learning, Quantitative Methods, Econometrics, Applied Probability, Risk, Uncertainty & Information Economics",
  },
];

const skillGroups = [
  {
    category: "Machine Learning & AI",
    tools: ["PyTorch", "scikit-learn", "Deep Kernel Learning", "Vision-Language Models", "LLMs", "Generative AI", "Recommender Systems", "NLP", "Hugging Face Transformers", "vLLM", "LangChain", "LlamaIndex", "OpenAI API", "Custom Model Development", "Model Optimization & Deployment"],
  },
  {
    category: "Cloud & Infrastructure",
    tools: ["AWS", "SLURM", "HPC Clusters (SLURM)", "Apptainer / Singularity", "Docker", "GitHub Actions", "Kubernetes", "Terraform", "Linux", "Distributed Training & Inference Pipelines"],
  },
  {
    category: "Programming and Data Engineering",
    tools: ["Python", "Relational Databases (PostgreSQL, MySQL, Amazon RDS/Aurora, etc.)","Non-Relational Databases (MongoDB, DynamoDB)", "Dask", "Spark", "SQL", "Hadoop", "REST APIs", "Airflow", "Kafka", "Data Lakes", "Data Warehousing", "ETL/ELT Pipelines"],
  },
  {
    category: "Statistics & Analysis",
    tools: ["R", "Bayesian Methods", "Traditional Machine Learning", "Mixed Models", "Survival Analysis", "Time Series", "Causal Inference", "SciPy", "statsmodels", "Regression/GLMs", "Hypothesis Testing", "Model Interpretability"],
  },
  {
    category: "Visualization & Reporting",
    tools: ["Tableau", "Power BI", "ggplot2", "Matplotlib", "Seaborn", "React", "Plotly", "Dash", "Jupyter", "LaTeX"],
  },
];

const experiences = [
  "Built HIPAA-compliant AWS pipelines for cancer research data processing",
  "Processed 8.7 billion social media documents via MongoDB at UVA scale",
  "Extracted structured data from 1.4M historical records using vision-language models on GPU clusters",
  "Developed deep learning models for glaucoma progression prediction with clinical partners",
  "Designed multi-seed training systems and clustering analysis for ML research rebuttals",
  "Built real-time data ingestion pipelines for Bluesky social media platform",
  "Implemented missing data imputation methods for longitudinal medical research",
  "Collaborated with UVA medical school on ERCP and clinical ML applications",
];

const projects = [
  {
    title: "Glaucoma Progression Prediction",
    desc: "Deep Kernel Learning models with RNN, GRU, LSTM, and Transformer architectures for predicting glaucoma progression from longitudinal clinical data at UVA.",
    tags: ["PyTorch", "Deep Learning", "Clinical ML", "SHAP"],
    href: "https://rc.virginia.edu/project/glaucoma/",
  },
  {
    title: "ERCP Research",
    desc: "Data science and machine learning support for endoscopic retrograde cholangiopancreatography research in collaboration with UVA's medical school.",
    tags: ["Clinical ML", "Python", "Statistics"],
    href: "https://rc.virginia.edu/project/ercp/",
  },
];



function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{style}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-logo">Angela Boakye Danquah</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-eyebrow">Computational Research Scientist</div>
        <h1 className="hero-name">Angela<br /><em>Boakye Danquah</em></h1>
        <p className="hero-desc">
          Building infrastructure for large-scale research at the intersection of artificial intelligence, high-performance computing, and data infrastructure.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Work</a>
          <a href="#contact" className="btn-ghost">Get in Touch</a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <FadeIn>
          <div className="section-label">About</div>
        </FadeIn>
        <div className="about-grid">
          <FadeIn delay={100}>
            <h2 className="about-heading">Scientist. Engineer. Problem solver.</h2>
            <div className="about-text">
              <p>
                Hello, I’m Angela Boakye Danquah,a machine learning and data systems engineer focused on building production-ready AI.
              </p>
              <p>
                I design and deploy scalable data and AI solutions across cloud and high-performance computing environments. My work spans large-scale data engineering, applied machine learning, and modern generative AI, with an emphasis on reliability, security-by-design, and reproducibility. I’ve built end-to-end systems that process billions of records, engineered high-volume databases, and developed distributed training and inference pipelines that teams can run, monitor, and trust.
              </p>
              <p>
                My recent projects include cloud-native document processing and information extraction workflows, LLM-powered applications for document-heavy pipelines, and deep learning experimentation across modern architectures including transformer-based models. I regularly translate stakeholder and mission requirements into practical system designs, balancing performance, cost, operational risk, and maintainability. Please check out my project portfolio for examples of work I’ve delivered.
              </p>
              <p>
                I hold an MS in Data Science and a BS in Statistics and Economics from the University of Virginia. Currently, I am a Computational Research Scientist at the University of Virginia, where I partner with faculty and research teams across healthcare, social science, and computational research to deliver secure, scalable analytics and AI capabilities.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="about-details">
              {[
                ["Role", "Research Scientist, ITS"],
                ["Institution", "University of Virginia"],
                ["Focus", "AI (ML/DL) · HPC · Cloud · Statistics"],
                ["Location", "Woodbridge, VA"],
              ].map(([label, value]) => (
                <div key={label} className="detail-row">
                  <span className="detail-label">{label}</span>
                  <span className="detail-value">{value}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <FadeIn>
          <div className="section-label">Education</div>
        </FadeIn>
        <div className="edu-list">
          {education.map((e, i) => (
            <FadeIn key={e.degree} delay={i * 100}>
              <div className="edu-item">
                <div className="edu-year">{e.year}</div>
                <div>
                  <div className="edu-degree">{e.degree}</div>
                  <div className="edu-school">{e.school}</div>
                  <div className="edu-detail">{e.detail}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <FadeIn>
          <div className="section-label">Skills & Experience</div>
        </FadeIn>
        <div className="skills-layout">
          <FadeIn delay={100}>
            <h2 className="skills-heading">Tools of the trade.</h2>
            <div className="skill-groups">
              {skillGroups.map(group => (
                <div key={group.category}>
                  <div className="skill-group-label">{group.category}</div>
                  <div className="skill-chips">
                    {group.tools.map(t => <span key={t} className="skill-chip">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="skills-heading">What I've built.</h2>
            <div className="exp-list">
              {experiences.map(exp => (
                <div key={exp} className="exp-item">
                  <span className="exp-dot">◆</span>
                  <span>{exp}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <FadeIn>
          <div className="section-label">Projects</div>
        </FadeIn>
        <div className="projects-list">
          {projects.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <a className="project-card" href={p.href} target="_blank" rel="noreferrer" style={{textDecoration:'none',color:'inherit'}}>
                <span className="project-num">0{i + 1}</span>
                <div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="project-tag">{t}</span>)}
                  </div>
                </div>
                <span className="project-arrow">→</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>


      {/* RESUME */}
      <section id="resume">
        <FadeIn>
          <div className="section-label">Resume</div>
          <div className="resume-header">
            <h2 className="skills-heading resume-heading">Experience & background.</h2>
            <a
              href="/resume.pdf"
              download
              className="btn-primary"
              style={{whiteSpace: 'nowrap'}}
            >
              Download PDF
            </a>
          </div>
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="resume-embed"
          >
            <div className="resume-fallback">
              <span className="resume-fallback-text">PDF preview not available in this browser.</span>
              <a href="/resume.pdf" download className="btn-primary">Download Resume</a>
            </div>
          </object>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <FadeIn>
          <div className="section-label">Contact</div>
          <h2 className="contact-heading">Let's work<br /><em>together.</em></h2>
          <p className="contact-sub">
            Interested in research collaboration, consulting, or just want to connect? I'd love to hear from you.
          </p>
          <div className="contact-links">
            {[
              { label: "Email", href: null, value: "angela.bdanquah@gmail.com" },
              { label: "GitHub", href: "https://github.com/aab5zd" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/angela-boakye-danquah-a28694194/" },
            ].map(link => link.href === null ? (
              <div key={link.label} className="email-box">
                <span className="email-box-label">{link.label}</span>
                <span className="email-value">{link.value}</span>
              </div>
            ) : (
              <a key={link.label} href={link.href} className="contact-link" target="_blank" rel="noreferrer">
                <span className="contact-link-label">{link.label}</span>
                <span className="contact-link-arrow">→</span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      <footer>
        <span className="footer-text">© 2026 Angela Boakye Danquah</span>
        <span className="footer-text">Computational Research Scientist · UVA</span>
      </footer>
    </>
  );
}