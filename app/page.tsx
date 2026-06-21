"use client";

import { useEffect } from "react";

export default function Home() {
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
          <a href="#" className="btn-ghost">Sign In</a>
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

        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">Clinical Intelligence Platform</div>

            <h1 className="hero-headline">
              Route every wound to its <em>optimal</em> outcome
            </h1>

            <p className="hero-sub">
              DermaRoute unifies benefits verification, insurance routing, healing tracking, and product ordering across your Wound Care, Lymphedema, and Ocular service lines — one portal, zero silos.
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
            <div className="mock-tooltip">3 patients need routing ↓</div>
            <div className="dashboard-mock">
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
            <div className="stat-number"><span className="count-target" data-target="200">0</span><span>+</span></div>
            <div className="stat-label">Wound protocols built-in</div>
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
              <p className="feature-desc">Submit and track BV requests with a guided multi-step workflow. Know coverage before treatment begins — no claim surprises at checkout.</p>
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
              <p className="feature-desc">Automatically match patients to the right payer pathways. Manage insurance carriers, track policy status, and streamline pre-authorization in one view.</p>
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
              <h3 className="feature-title">Healing Tracker</h3>
              <p className="feature-desc">Longitudinal wound measurement tracking with photo timelines. Log dimensions, tissue type, and exudate week-over-week to prove healing progress to payers.</p>
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
              <h3 className="feature-title">Product Ordering</h3>
              <p className="feature-desc">Browse full Lymphedema and Ocular product catalogs, generate order PDFs, and track reorders — all from the same dashboard your clinical team already uses.</p>
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
              <h3 className="feature-title">Multi-Track Platform</h3>
              <p className="feature-desc">Run Wound Care, Lymphedema, and Ocular service lines from a single portal. Each track has tailored workflows, catalogs, and order management built in.</p>
            </div>

            <div className="feature-card feature-card-gold">
              <div className="feature-icon icon-gold">
                <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 3C7.13 3 4 6.13 4 10V17H18V10C18 6.13 14.87 3 11 3Z" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9 17V19H13V17" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 10L10 12L14 8" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Analytics & Compliance</h3>
              <p className="feature-desc">Practice-wide analytics, audit logs, BAA management, and role-based access control — everything needed for HIPAA compliance and QA reporting baked in.</p>
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
              <h2 className="section-headline">Three steps from assessment to treatment</h2>
            </div>
            <p className="section-sub" style={{ maxWidth: '320px', fontSize: '15px' }}>A clinical workflow engineered for speed without sacrificing precision or safety.</p>
          </div>

          <div className="steps-track reveal-group">
            <div className="step">
              <div className="step-number">01</div>
              <h3 className="step-title">Assess & Classify</h3>
              <p className="step-desc">Clinicians enter wound characteristics — type, dimensions, depth, exudate, and peri-wound status. DermaRoute classifies severity and flags risk factors instantly.</p>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <h3 className="step-title">Route to Protocol</h3>
              <p className="step-desc">The engine matches each case to evidence-based treatment protocols, checks formulary coverage, and routes to the appropriate specialist or care setting.</p>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <h3 className="step-title">Track & Optimize</h3>
              <p className="step-desc">Longitudinal tracking measures healing week-over-week. AI flags stalled cases, suggests escalation, and generates outcome reports for payers and QA.</p>
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
            <a href="mailto:team@nvzn.ai" className="btn-outline-lg">
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
            <li><a href="#">Privacy</a></li>
            <li><a href="#">HIPAA</a></li>
            <li><a href="mailto:team@nvzn.ai">Contact</a></li>
          </ul>

          <p className="footer-copy">© 2026 DermaRoute. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
