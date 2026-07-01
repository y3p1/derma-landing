"use client";

import { useEffect, useState } from "react";
import { FloatingPaths } from "@/components/ui/background-paths";

type ModalType = "privacy" | "hipaa" | null;

const PRIVACY_CONTENT = {
  title: "Privacy Policy",
  lastUpdated: "June 1, 2026",
  sections: [
    {
      heading: "1. Information We Collect",
      body: "DermaRoute collects information you provide directly, including clinic name, contact details, and account credentials. We also collect usage data, device information, and log data when you interact with our platform. Patient data entered by authorized clinic personnel is processed solely on behalf of the covered entity and is subject to our Business Associate Agreement (BAA).",
    },
    {
      heading: "2. How We Use Your Information",
      body: "We use the information we collect to provide, maintain, and improve the DermaRoute platform; to process benefits verification requests and supplier orders; to send administrative communications; and to comply with applicable legal obligations. We do not sell or rent your personal information to third parties.",
    },
    {
      heading: "3. Data Sharing & Disclosure",
      body: "We may share your information with trusted service providers who assist in operating our platform (e.g., cloud infrastructure, email delivery) under confidentiality agreements. We may also disclose information when required by law, to enforce our terms, or to protect the rights, property, or safety of DermaRoute, our users, or the public.",
    },
    {
      heading: "4. Data Retention",
      body: "We retain account and usage data for as long as your account is active or as needed to provide services. Upon account termination, data is purged within 90 days unless longer retention is required by applicable law or our BAA obligations.",
    },
    {
      heading: "5. Security",
      body: "We implement industry-standard administrative, technical, and physical safeguards — including AES-256 encryption at rest, TLS 1.2+ in transit, role-based access controls, and automated audit logging — to protect your information from unauthorized access, disclosure, alteration, or destruction.",
    },
    {
      heading: "6. Your Rights",
      body: "Depending on your jurisdiction, you may have the right to access, correct, or delete personal information we hold about you. To exercise any of these rights, contact us at privacy@dermaroute.com. We will respond within 30 days.",
    },
    {
      heading: "7. Changes to This Policy",
      body: "We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website and, where appropriate, by email. Continued use of the platform after changes become effective constitutes acceptance of the revised policy.",
    },
    {
      heading: "8. Contact",
      body: "If you have questions about this Privacy Policy, contact DermaRoute at: privacy@dermaroute.com | DermaRoute, Inc., 1234 Health Way, Suite 500, San Diego, CA 92101.",
    },
  ],
};

const HIPAA_CONTENT = {
  title: "HIPAA Compliance Notice",
  lastUpdated: "June 1, 2026",
  sections: [
    {
      heading: "Our Role as a Business Associate",
      body: "DermaRoute operates as a Business Associate (BA) under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and its implementing regulations. When your clinic (the Covered Entity) uses our platform to process Protected Health Information (PHI), DermaRoute acts solely on your behalf pursuant to a signed Business Associate Agreement (BAA).",
    },
    {
      heading: "What Is Protected Health Information?",
      body: "PHI includes any individually identifiable health information transmitted or maintained in any form — electronic, paper, or oral — that relates to a patient's past, present, or future health condition; the provision of health care; or the payment for health care. On DermaRoute, PHI primarily includes patient demographics, wound documentation, ICD-10 codes, and insurance identifiers.",
    },
    {
      heading: "HIPAA-Compliant Safeguards",
      body: "DermaRoute maintains comprehensive Administrative, Physical, and Technical Safeguards as required by the HIPAA Security Rule (45 CFR §§ 164.308–164.312). Key measures include: role-based access control (RBAC) limiting PHI access to authorized personnel; AES-256 encryption for PHI at rest; TLS 1.2+ encryption for all data in transit; automatic session timeouts; detailed audit logs capturing all PHI access and modifications; and annual workforce security training.",
    },
    {
      heading: "Business Associate Agreement (BAA)",
      body: "A HIPAA-compliant BAA must be executed before any PHI is transmitted through DermaRoute. The platform enforces this requirement at the account level — PHI-bearing features are locked until a signed BAA is on file. BAA templates are available in the portal under Settings → BAA Management, and digital signatures are captured in-platform with a full audit trail.",
    },
    {
      heading: "Breach Notification",
      body: "In the event of a breach of unsecured PHI, DermaRoute will notify affected Covered Entities without unreasonable delay and no later than 60 days from discovery, consistent with 45 CFR § 164.410. Our incident response team is available 24/7. Covered Entities remain responsible for notifying affected individuals and the U.S. Department of Health & Human Services (HHS) as required under the Breach Notification Rule.",
    },
    {
      heading: "Data Subprocessors",
      body: "DermaRoute uses a limited number of vetted subprocessors (e.g., cloud hosting, backup services) that also execute BAAs and maintain HIPAA-compliant controls. A current list of authorized subprocessors is available upon request at compliance@dermaroute.com.",
    },
    {
      heading: "Patient Rights",
      body: "As a Business Associate, DermaRoute supports Covered Entities in honoring patient rights under HIPAA, including rights of access, amendment, and accounting of disclosures. Patients should direct rights requests to their clinic (the Covered Entity); DermaRoute will cooperate with the clinic to fulfill such requests.",
    },
    {
      heading: "Contact Our Privacy Officer",
      body: "For HIPAA-related inquiries, to report a potential incident, or to request our BAA template or subprocessor list, contact: compliance@dermaroute.com | HIPAA Privacy Officer, DermaRoute, Inc., 1234 Health Way, Suite 500, San Diego, CA 92101. Phone: (800) 555-0199.",
    },
  ],
};

export default function Home() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const openModal = (type: ModalType) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal, .reveal-group").forEach((el) => io.observe(el));

    const countIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.target!, 10);
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target).toString();
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          countIO.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll<HTMLElement>(".count-target").forEach((el) => countIO.observe(el));

    const navbar = document.getElementById("navbar");
    const handleScroll = () => {
      if (navbar) {
        navbar.style.background =
          window.scrollY > 40
            ? "rgba(7, 8, 12, 0.92)"
            : "rgba(7, 8, 12, 0.72)";
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      io.disconnect();
      countIO.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav id="navbar">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L14 6V12L9 16L4 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
              <path d="M6 9H12M9 6V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="nav-logo-text">DermaRoute</span>
        </a>

        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it Works</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-cta">
          <a href="https://derma-route.vercel.app/" className="btn-primary" target="_blank" rel="noopener">
            View Demo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="hero-contours"></div>

        {/* ANIMATED BACKGROUND PATHS */}
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">B2B Healthcare Provider Portal</div>

            <h1 className="hero-headline">
              Route every wound to its <em>optimal</em> outcome
            </h1>

            <p className="hero-sub">
              DermaRoute is the B2B portal built for specialty clinics — manage BV requests, insurance routing, supplier orders, BAA agreements, and healing outcomes across Tissue &amp; Biologics, Medical Devices, and Ocular service lines from a single, role-based dashboard.
            </p>

            <div className="hero-actions">
              <a href="https://derma-route.vercel.app/" className="btn-primary-lg" target="_blank" rel="noopener">
                See Live Demo
                <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#how-it-works" className="btn-outline-lg">
                How it Works
                <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="hero-trust">
              <div className="trust-avatars">
                <div className="trust-avatar">SR</div>
                <div className="trust-avatar">MK</div>
                <div className="trust-avatar">JL</div>
                <div className="trust-avatar">AP</div>
              </div>
              <p className="hero-trust-text">Trusted by wound care specialists across 40+ clinics</p>
            </div>
          </div>

          {/* DASHBOARD MOCKUP */}
          <div className="hero-visual">
            <div className="dashboard-mock" style={{ position: 'relative', overflow: 'visible' }}>
              <div className="mock-tooltip">3 patients need routing ↓</div>
              <div className="mock-topbar">
                <div className="mock-dots">
                  <div className="mock-dot mock-dot-r"></div>
                  <div className="mock-dot mock-dot-y"></div>
                  <div className="mock-dot mock-dot-g"></div>
                </div>
                <div className="mock-title-bar">DermaRoute — Wound Queue</div>
                <div className="mock-badge">● Live</div>
              </div>

              <div className="mock-patient-list">
                <div className="mock-patient-row active">
                  <div className="mock-avatar mock-avatar-a">RG</div>
                  <div className="mock-patient-info">
                    <div className="mock-patient-name">R. Garcia</div>
                    <div className="mock-patient-detail">Diabetic foot ulcer · Stage III</div>
                  </div>
                  <div className="mock-severity sev-high">High</div>
                </div>
                <div className="mock-patient-row">
                  <div className="mock-avatar mock-avatar-b">MT</div>
                  <div className="mock-patient-info">
                    <div className="mock-patient-name">M. Thompson</div>
                    <div className="mock-patient-detail">Venous leg ulcer · Week 3</div>
                  </div>
                  <div className="mock-severity sev-med">Med</div>
                </div>
                <div className="mock-patient-row">
                  <div className="mock-avatar mock-avatar-c">AL</div>
                  <div className="mock-patient-info">
                    <div className="mock-patient-name">A. Lee</div>
                    <div className="mock-patient-detail">Pressure injury · Grade II</div>
                  </div>
                  <div className="mock-severity sev-low">Low</div>
                </div>
              </div>

              <div className="mock-stats-row">
                <div className="mock-stat-card">
                  <div className="mock-stat-label">Closure Rate</div>
                  <div className="mock-stat-value">87<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>%</span></div>
                  <div className="mock-stat-trend">↑ 12% vs last mo.</div>
                </div>
                <div className="mock-stat-card">
                  <div className="mock-stat-label">Avg. Heal Time</div>
                  <div className="mock-stat-value">18<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}> days</span></div>
                  <div className="mock-stat-trend">↓ 4 days faster</div>
                </div>
                <div className="mock-stat-card">
                  <div className="mock-stat-label">Active Cases</div>
                  <div className="mock-stat-value">34</div>
                  <div className="mock-stat-trend" style={{ color: 'var(--text-muted)' }}>3 routed today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAND */}
      <div className="stats-band">
        <div className="stats-inner reveal-group">
          <div className="stat-item">
            <div className="stat-number"><span className="count-target" data-target="87">0</span><span>%</span></div>
            <div className="stat-label">Average wound closure rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number"><span className="count-target" data-target="40">0</span><span>+</span></div>
            <div className="stat-label">Partner clinics nationwide</div>
          </div>
          <div className="stat-item">
            <div className="stat-number"><span className="count-target" data-target="3">0</span></div>
            <div className="stat-label">Integrated service lines</div>
          </div>
          <div className="stat-item">
            <div className="stat-number"><span className="count-target" data-target="31">0</span><span>%</span></div>
            <div className="stat-label">Reduction in time-to-closure</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section id="features">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">Platform Features</div>
            <h2 className="section-headline">Every tool your practice needs, in one place</h2>
            <p className="section-sub">Purpose-built for multi-specialty wound care — BV, routing, tracking, ordering, and compliance all in a single integrated platform.</p>
          </div>

          <div className="features-grid reveal-group">
            <div className="feature-card feature-card-primary">
              <div className="feature-icon icon-primary">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 9" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="3" y="4" width="16" height="14" rx="2" stroke="#E8724A" strokeWidth="1.5" />
                  <path d="M7 4V3M15 4V3" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 8H19" stroke="#E8724A" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="feature-title">Benefits Verification</h3>
              <p className="feature-desc">Submit BV requests with patient info, wound type, ICD-10 codes, wound dimensions, and insurance details. Track approval status, upload proof documents, and gate product orders until coverage is confirmed.</p>
            </div>

            <div className="feature-card feature-card-teal">
              <div className="feature-icon icon-teal">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 11C3 7.13 6.13 4 10 4H12" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 11C19 14.87 15.87 18 12 18H10" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M14 2L12 4L14 6" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="7" cy="11" r="2.5" stroke="#2EC4B6" strokeWidth="1.5" />
                  <circle cx="15" cy="11" r="2.5" stroke="#2EC4B6" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="feature-title">Insurance Routing</h3>
              <p className="feature-desc">Admin-managed routing tables map each insurance plan to approved manufacturers. Coverage plans, formulary rules, and payer-to-manufacturer approvals live in one place — no manual lookups, no routing errors.</p>
            </div>

            <div className="feature-card feature-card-gold">
              <div className="feature-icon icon-gold">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="3,16 7,11 11,13 15,7 19,4" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 19H19" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="11" cy="13" r="1.5" fill="#C9963A" />
                  <circle cx="7" cy="11" r="1.5" fill="#C9963A" />
                </svg>
              </div>
              <h3 className="feature-title">Wound Healing Tracker</h3>
              <p className="feature-desc">Log wound measurements in cm² with date and clinical notes per BV request. Track size reduction week-over-week and surface the data clinicians need to demonstrate healing progress to payers.</p>
            </div>

            <div className="feature-card feature-card-primary">
              <div className="feature-icon icon-primary">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 4H5L7 14H17L19 7H7" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="18" r="1.5" stroke="#E8724A" strokeWidth="1.5" />
                  <circle cx="15" cy="18" r="1.5" stroke="#E8724A" strokeWidth="1.5" />
                  <path d="M11 10H14M12.5 8.5V11.5" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="feature-title">Tissue &amp; Biologics Ordering</h3>
              <p className="feature-desc">Browse the wound care product catalog organized by manufacturer, Q-code, pay rate, and compatible wound sizes. Orders are tied directly to approved BV requests — no orphan orders, full traceability.</p>
            </div>

            <div className="feature-card feature-card-teal">
              <div className="feature-icon icon-teal">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="6" height="16" rx="2" stroke="#2EC4B6" strokeWidth="1.5" />
                  <rect x="10" y="7" width="6" height="12" rx="2" stroke="#2EC4B6" strokeWidth="1.5" />
                  <rect x="18" y="11" width="2" height="8" rx="1" stroke="#2EC4B6" strokeWidth="1.5" />
                  <path d="M5 8H5.01M13 12H13.01" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="feature-title">Medical Devices &amp; Ocular</h3>
              <p className="feature-desc">Submit AIROS compression pump and lymphedema garment orders with HCPCS codes, limb measurements, and pressure settings. Order VisiDisc® amniotic membrane discs (Skye Biologics) by variant (45μm/200μm), size (8–18mm), and SKU — shipping tiers auto-calculated at checkout.</p>
            </div>

            <div className="feature-card feature-card-gold">
              <div className="feature-icon icon-gold">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H18L16 14H6L4 6Z" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 6L3 3H1" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="8" cy="19" r="1" fill="#C9963A" />
                  <circle cx="14" cy="19" r="1" fill="#C9963A" />
                </svg>
              </div>
              <h3 className="feature-title">Supplier Distribution</h3>
              <p className="feature-desc">DR Representatives send formatted order packages directly to distributors from inside the portal — one click dispatches a structured email to the configured supplier. Supplier addresses are set per service line in System Settings, with automatic CC to the ITS rep on every new submission.</p>
            </div>

            <div className="feature-card feature-card-primary">
              <div className="feature-icon icon-primary">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3H6C4.9 3 4 3.9 4 5V17C4 18.1 4.9 19 6 19H16C17.1 19 18 18.1 18 17V7L14 3Z" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 3V7H18" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 13L10 15L14 11" stroke="#E8724A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">BAA Management</h3>
              <p className="feature-desc">Digital Business Associate Agreements with in-portal signature capture per provider. Track signing status — pending, signed, approved, or cancelled — across all accounts with a full admin audit trail.</p>
            </div>

            <div className="feature-card feature-card-teal">
              <div className="feature-icon icon-teal">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="7" r="3" stroke="#2EC4B6" strokeWidth="1.5" />
                  <path d="M5 19C5 16.24 7.69 14 11 14C14.31 14 17 16.24 17 19" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M17 5L19 7L17 9" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5 5L3 7L5 9" stroke="#2EC4B6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Role-Based Access</h3>
              <p className="feature-desc">Providers see only their own submissions on enabled tracks (Tissue, Medical Devices, or Ocular). DR Representatives manage all assigned clinic accounts in a unified queue. Admins control the entire system — users, practice tracks, routing rules, and system settings — from one dashboard.</p>
            </div>

            <div className="feature-card feature-card-gold">
              <div className="feature-icon icon-gold">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3C7.13 3 4 6.13 4 10V17H18V10C18 6.13 14.87 3 11 3Z" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 17V19H13V17" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 10L10 12L14 8" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Analytics, Policy Assistant &amp; Audit</h3>
              <p className="feature-desc">Track outcome metrics, commission data, and success rates per service line. Ask the AI Policy Assistant natural language questions about CMS coverage policies — powered by Gemini embeddings over ingested PDF documents. Every database change is audit-logged with old and new values for full compliance traceability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-inner">
          <div className="how-header reveal">
            <div>
              <div className="section-tag">The Process</div>
              <h2 className="section-headline">Three steps from intake to fulfillment</h2>
            </div>
            <p className="section-sub" style={{ maxWidth: '320px', fontSize: '15px' }}>A B2B ordering workflow built for specialty clinics — structured, verified, and fully traceable.</p>
          </div>

          <div className="steps-track reveal-group">
            <div className="step">
              <div className="step-number">01</div>
              <h3 className="step-title">Submit &amp; Request</h3>
              <p className="step-desc">Providers complete guided intake forms for BV requests or product orders. Patient demographics, wound details, ICD-10 codes, and insurance information are captured in one structured flow. OTP-based login (no passwords) keeps access secure and fast.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3 className="step-title">Review &amp; Verify</h3>
              <p className="step-desc">DR Representatives review all submissions in their unified dashboard across all service lines. They verify insurance coverage, confirm manufacturer routing via insurance routing tables, and approve or deny BV requests. Nothing ships without a verified sign-off.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3 className="step-title">Fulfill &amp; Track</h3>
              <p className="step-desc">Approved orders are dispatched to distributors via one-click formatted supplier emails — SendGrid delivers structured order packages directly to the configured supplier address. Wound healing progress is logged in cm² week-over-week, outcomes are recorded, and admins access the full audit trail and analytics in real time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-tag">From Clinicians</div>
            <h2 className="section-headline">Built with wound care specialists</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card reveal">
              <span className="quote-mark">&quot;</span>
              <p className="testimonial-text">DermaRoute cut our average time-to-closure by nearly a month. The protocol engine surfaces options I might not have prioritized, and the outcome data helps me have much better conversations with payers.</p>
              <div className="testimonial-author">
                <div className="author-avatar">SR</div>
                <div>
                  <div className="author-name">Dr. Sarah R.</div>
                  <div className="author-role">Wound Care Medical Director, Regional Medical Center</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card reveal">
              <span className="quote-mark">&quot;</span>
              <p className="testimonial-text">The benefits verification piece alone saves our front desk two hours a day. Patients no longer get surprised by uncovered treatments. It&apos;s changed how we run the entire intake flow.</p>
              <div className="testimonial-author">
                <div className="author-avatar author-avatar-b">MK</div>
                <div>
                  <div className="author-name">Maureen K., RN, CWON</div>
                  <div className="author-role">Clinic Administrator, Advanced Wound Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-inner reveal">
          <div className="section-tag" style={{ justifyContent: 'center' }}>Get Started</div>
          <h2 className="cta-headline">See DermaRoute in your clinic</h2>
          <p className="cta-sub">Walk through the full platform with a clinical specialist — no sales pressure, just a real look at how DermaRoute fits your workflow.</p>

          <div className="cta-actions">
            <a href="https://derma-route.vercel.app/" className="btn-primary-lg" target="_blank" rel="noopener">
              Launch Demo
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=shawn.druzali04@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-outline-lg">
              Contact Sales
            </a>
          </div>

          <p className="cta-footnote">No credit card. HIPAA-compliant environment. Setup in 24 hours.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <a href="#" className="footer-brand">
            <div className="footer-logo-mark">
              <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2L14 6V12L9 16L4 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M6 9H12M9 6V12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span className="footer-brand-text">DermaRoute</span>
          </a>

          <ul className="footer-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How it Works</a></li>
            <li><button className="footer-link-btn" onClick={() => openModal("privacy")}>Privacy</button></li>
            <li><button className="footer-link-btn" onClick={() => openModal("hipaa")}>HIPAA</button></li>
            <li><a href="mailto:team@nvzn.ai">Contact</a></li>
          </ul>

          <p className="footer-copy">© 2026 DermaRoute. All rights reserved.</p>
        </div>
      </footer>

      {/* POLICY MODALS */}
      {activeModal && (() => {
        const content = activeModal === "privacy" ? PRIVACY_CONTENT : HIPAA_CONTENT;
        const accentColor = activeModal === "privacy" ? "var(--teal)" : "var(--primary)";
        const iconPath = activeModal === "privacy"
          ? "M12 2C9.24 2 7 4.24 7 7c0 1.85 1 3.47 2.5 4.33V13h1v1h-1v1h3v-1h-1v-1h1v-1.67C14 11.47 15 9.85 15 8c0-2.76-2.24-5-5-5Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"
          : "M9 12l2 2 4-4M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9Z";
        return (
          <div
            id={`modal-${activeModal}`}
            className="modal-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
            role="dialog"
            aria-modal="true"
            aria-label={content.title}
          >
            <div className="modal-panel">
              <div className="modal-header">
                <div className="modal-icon" style={{ background: `color-mix(in srgb, ${accentColor} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${accentColor} 28%, transparent)` }}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: accentColor }}>
                    <path d={iconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h2 className="modal-title">{content.title}</h2>
                  <p className="modal-meta">Last updated: {content.lastUpdated}</p>
                </div>
                <button
                  id={`close-modal-${activeModal}`}
                  className="modal-close"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                {content.sections.map((sec, i) => (
                  <div key={i} className="modal-section">
                    <h3 className="modal-section-heading" style={{ color: accentColor }}>{sec.heading}</h3>
                    <p className="modal-section-body">{sec.body}</p>
                  </div>
                ))}
              </div>

              <div className="modal-footer">
                <p className="modal-disclaimer">This document is provided for informational purposes. It does not constitute legal advice. For questions, contact us at <a href="mailto:team@nvzn.ai">team@nvzn.ai</a>.</p>
                <button id={`modal-${activeModal}-done`} className="modal-done-btn" onClick={closeModal}>Got it</button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
