
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            // A simple way to toggle visibility, you might want a more robust solution
            if (navLinks.classList.contains('hidden')) {
                navLinks.classList.remove('hidden');
                navLinks.classList.add('flex-col', 'absolute', 'top-16', 'left-0', 'w-full', 'bg-white', 'p-4', 'shadow-lg');
            } else {
                navLinks.classList.add('hidden');
            }
        });
    }

  }, []);

  const handleGetStarted = () => {
      router.push('/dashboard');
  }

  return (
    <>
      <style jsx global>{`
        /* This is a temporary solution to inject styles. Ideally this would be in a separate CSS file. */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            color: #111827;
            overflow-x: hidden;
            background: #FFFFFF;
        }

        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1.2rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            animation: slideDown 0.5s ease;
        }

        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #6366F1;
            text-decoration: none;
        }

        .logo svg {
            width: 32px;
            height: 32px;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        .nav-links a {
            text-decoration: none;
            color: #6B7280;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: #6366F1;
        }

        .btn-primary {
            background: linear-gradient(135deg, #6366F1, #8B5CF6);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* Hero Section */
        .hero {
            padding: 8rem 2rem 4rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
            animation: moveBackground 20s linear infinite;
        }

        @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(100px, 100px); }
        }

        .hero-content {
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            z-index: 1;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            animation: fadeInUp 0.8s ease;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
            animation: fadeInUp 0.8s ease 0.2s backwards;
        }

        .hero-buttons {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            animation: fadeInUp 0.8s ease 0.4s backwards;
        }

        .btn-large {
            padding: 1rem 2.5rem;
            border-radius: 16px;
            font-size: 1.1rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            border: none;
        }

        .btn-white {
            background: white;
            color: #6366F1;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .btn-white:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 25px rgba(0,0,0,0.15);
        }

        .btn-outline {
            background: transparent;
            color: white;
            border: 2px solid white;
        }

        .btn-outline:hover {
            background: white;
            color: #6366F1;
        }

        .hero-image {
            margin-top: 4rem;
            animation: fadeInUp 0.8s ease 0.6s backwards;
        }

        .browser-mockup {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            animation: floatBrowser 3s ease-in-out infinite;
        }

        @keyframes floatBrowser {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        .browser-header {
            background: #f3f4f6;
            padding: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            border-bottom: 1px solid #e5e7eb;
        }

        .browser-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ef4444;
        }

        .browser-dot:nth-child(2) { background: #f59e0b; }
        .browser-dot:nth-child(3) { background: #10b981; }

        .browser-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 4rem;
        }

        /* Features Section */
        .features {
            padding: 6rem 2rem;
            background: #F9FAFB;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: #111827;
        }

        .section-header p {
            font-size: 1.1rem;
            color: #6B7280;
            max-width: 600px;
            margin: 0 auto;
        }

        .features-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            animation: fadeInUp 0.6s ease backwards;
        }

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .feature-card h3 {
            font-size: 1.5rem;
            margin-bottom: 0.75rem;
            color: #111827;
        }

        .feature-card p {
            color: #6B7280;
            line-height: 1.6;
        }

        /* Stats Section */
        .stats {
            padding: 4rem 2rem;
            background: linear-gradient(135deg, #6366F1, #8B5CF6);
            color: white;
        }

        .stats-grid {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 3rem;
            text-align: center;
        }

        .stat-item h3 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .stat-item p {
            font-size: 1.1rem;
            opacity: 0.9;
        }

        /* How It Works */
        .how-it-works {
            padding: 6rem 2rem;
            background: white;
        }

        .steps {
            max-width: 1000px;
            margin: 0 auto;
            display: grid;
            gap: 3rem;
        }

        .step {
            display: flex;
            gap: 2rem;
            align-items: center;
            animation: fadeInUp 0.6s ease backwards;
        }

        .step:nth-child(1) { animation-delay: 0.1s; }
        .step:nth-child(2) { animation-delay: 0.2s; }
        .step:nth-child(3) { animation-delay: 0.3s; }

        .step-number {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            font-weight: 800;
            flex-shrink: 0;
        }

        .step-content h3 {
            font-size: 1.75rem;
            margin-bottom: 0.5rem;
            color: #111827;
        }

        .step-content p {
            color: #6B7280;
            line-height: 1.6;
        }

        /* Testimonials */
        .testimonials {
            padding: 6rem 2rem;
            background: #F9FAFB;
        }

        .testimonials-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            animation: fadeInUp 0.6s ease backwards;
        }

        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }

        .stars {
            color: #F59E0B;
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            color: #6B7280;
            line-height: 1.6;
            margin-bottom: 1.5rem;
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 1.25rem;
        }

        .author-info h4 {
            font-size: 1rem;
            color: #111827;
            margin-bottom: 0.25rem;
        }

        .author-info p {
            font-size: 0.875rem;
            color: #6B7280;
        }

        /* CTA Section */
        .cta {
            padding: 6rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }

        .cta h2 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1rem;
        }

        .cta p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }

        .cta-features {
            max-width: 600px;
            margin: 0 auto 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-align: left;
        }

        .cta-feature {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.1rem;
        }

        .cta-feature::before {
            content: '✓';
            background: rgba(255,255,255,0.2);
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        /* Footer */
        footer {
            background: #111827;
            color: #9CA3AF;
            padding: 3rem 2rem 1rem;
        }

        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h4 {
            color: white;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            margin-bottom: 0.5rem;
        }

        .footer-section a {
            color: #9CA3AF;
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-section a:hover {
            color: #6366F1;
        }

        .footer-bottom {
            max-width: 1200px;
            margin: 0 auto;
            padding-top: 2rem;
            border-top: 1px solid #374151;
            text-align: center;
        }

        /* Mobile Menu */
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #6366F1;
            cursor: pointer;
        }

        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .mobile-menu-btn {
                display: block;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .hero p {
                font-size: 1.1rem;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .cta h2 {
                font-size: 2rem;
            }

            .step {
                flex-direction: column;
                text-align: center;
            }

            .browser-content {
                height: 300px;
                font-size: 3rem;
            }
        }

        /* Scroll Animations */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s, transform 0.6s;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
      `}</style>
      <nav>
        <div className="nav-container">
          <a href="#" className="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7h-4v14h-8v-14h-4l8-5 8 5z" />
              <path d="M9 12h6" />
              <path d="M9 16h6" />
            </svg>
            EduFinance
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#testimonials">Reviews</a>
            <button onClick={handleGetStarted} className="btn-primary">Get Started</button>
          </div>
          <button className="mobile-menu-btn">☰</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Money,<br />Focus on Your Future</h1>
          <p>The smart finance web app designed specifically for students. Track expenses, save smarter, and discover scholarships—all in your browser.</p>
          <div className="hero-buttons">
            <button onClick={handleGetStarted} className="btn-large btn-white">
              <span>🚀</span> Launch App
            </button>
            <a href="#features" className="btn-large btn-outline">
              Learn More
            </a>
          </div>
          <div className="hero-image">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="browser-dot"></div>
                <div className="browser-dot"></div>
                <div className="browser-dot"></div>
              </div>
              <div className="browser-content">
                💰
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-header fade-in">
          <h2>Everything You Need to Succeed Financially</h2>
          <p>Powerful features designed to help students take control of their finances and build healthy money habits.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Expense Tracking</h3>
            <p>Effortlessly log expenses in seconds with our intuitive interface. Categorize spending and see where your money goes.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Budget Goals</h3>
            <p>Set monthly budgets and savings goals. Track your progress with beautiful visualizations and stay motivated.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Visual Analytics</h3>
            <p>Understand your spending patterns with interactive charts and insights. Make data-driven financial decisions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI-Powered Tips</h3>
            <p>Get personalized saving suggestions based on your spending habits. Let AI help you save smarter.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎓</div>
            <h3>Scholarship Finder</h3>
            <p>Discover financial aid opportunities tailored to your profile. Filter by state, income, and category.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Smart Alerts</h3>
            <p>Stay on track with intelligent notifications when you're approaching budget limits. Never overspend again.</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-item">
            <h3>₹10Cr+</h3>
            <p>Money Saved</p>
          </div>
          <div className="stat-item">
            <h3>5K+</h3>
            <p>Scholarships Listed</p>
          </div>
          <div className="stat-item">
            <h3>4.8⭐</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="section-header fade-in">
          <h2>Get Started in 3 Simple Steps</h2>
          <p>Start your journey to financial wellness in minutes</p>
        </div>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Sign Up Securely</h3>
              <p>Create your account using just your phone number and OTP verification. No lengthy forms, no hassle. Access from any device, anywhere.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Set Your Budget</h3>
              <p>Tell us your monthly budget and financial goals. Our smart system will help you stay on track and suggest realistic savings targets.</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Track & Save</h3>
              <p>Start logging expenses with a single click. Watch your savings grow as our AI provides personalized tips to help you spend smarter.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="section-header fade-in">
          <h2>Loved by Students Everywhere</h2>
          <p>See what students are saying about EduFinance</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"EduFinance completely changed how I manage my money. I saved ₹15,000 in just 3 months! The AI suggestions are spot-on."</p>
            <div className="testimonial-author">
              <div className="author-avatar">P</div>
              <div className="author-info">
                <h4>Priya Sharma</h4>
                <p>IIT Delhi</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"The scholarship finder is a game-changer! I found 3 scholarships I qualified for but never knew existed. Amazing web app!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">A</div>
              <div className="author-info">
                <h4>Arjun Patel</h4>
                <p>NIT Trichy</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">"Beautiful interface and so easy to use! Works perfectly on my laptop and phone. Finally, a finance app that doesn't feel like homework."</p>
            <div className="testimonial-author">
              <div className="author-avatar">S</div>
              <div className="author-info">
                <h4>Sneha Reddy</h4>
                <p>BITS Pilani</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta" id="start">
        <h2>Ready to Take Control of Your Finances?</h2>
        <p>Join thousands of students who are already saving smarter with EduFinance</p>
        <div className="cta-features">
          <div className="cta-feature">No download required - works in your browser</div>
          <div className="cta-feature">Access from any device, anywhere</div>
          <div className="cta-feature">Secure and private - your data is protected</div>
          <div className="cta-feature">Free to use - start tracking today</div>
        </div>
        <div className="hero-buttons">
          <button onClick={handleGetStarted} className="btn-large btn-white">
            <span>🚀</span> Get Started Now
          </button>
          <button className="btn-large btn-outline">
            <span>▶️</span> Watch Demo
          </button>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>EduFinance</h4>
            <p>Your personal guide to financial wellness in college. Accessible from anywhere, on any device.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><button onClick={handleGetStarted}>Get Started</button></li>
              <li><a href="#">Demo</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 EduFinance. All rights reserved. Made with 💜 for students.</p>
        </div>
      </footer>
    </>
  );
}
