import { useState } from 'react';

export default function Dashboard() {
  const [profile, setProfile] = useState({
    fullName: "Nasir Rahman Talukder",
    phone: "+9687005282",
    username: "nasir98",
    password: "••••••••"
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://micro-job-world.vercel.app/?ref=${profile.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    setIsEditModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', margin: 0, padding: 0 }} className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'between', flexShrink: 0 }} className="w-full md:w-64 bg-white border-r border-gray-200 p-5 flex flex-col shrink-0">
        <div>
          {/* Logo */}
          <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
            <div style={{ color: '#dc2626', fontWeight: '900', fontSize: '24px', letterSpacing: '-0.5px' }}>
              BDZOON
              <span style={{ display: 'block', fontSize: '10px', uppercase: 'true', letterSpacing: '1.5px', color: '#9ca3af', fontWeight: '700', marginTop: '-2px' }}>Micro Job World</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '600', borderRadius: '12px', backgroundColor: '#dc2626', color: '#ffffff', textDecoration: 'none' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
              Dashboard
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '12px', color: '#4b5563', textDecoration: 'none' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Available Jobs
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '12px', color: '#4b5563', textDecoration: 'none' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              My Submissions
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '12px', color: '#4b5563', textDecoration: 'none' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Referrals
            </a>
            <button onClick={() => setIsEditModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '12px', color: '#4b5563', border: 'none', backgroundColor: 'transparent', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile Settings
            </button>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', fontSize: '14px', fontWeight: '500', borderRadius: '12px', color: '#4b5563', textDecoration: 'none' }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </a>
          </nav>
        </div>

        {/* Referral Card Side Container */}
        <div style={{ marginTop: '24px' }}>
          <div style={{ backgroundColor: '#dc2626', color: '#ffffff', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0', opacity: 0.9 }}>Your Referral Link</h4>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.1)', fontSize: '11px', padding: '8px', borderRadius: '8px', wordBreak: 'break-all', fontFamily: 'monospace', marginBottom: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {`https://micro-job-world.vercel.app/?ref=${profile.phone}`}
            </div>
            <button onClick={handleCopy} style={{ width: '100%', backgroundColor: '#ffffff', color: '#dc2626', fontWeight: '700', padding: '8px 0', borderRadius: '12px', fontSize: '12px', border: 'none', cursor: 'pointer' }}>
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div style={{ backgroundColor: '#fef2f2', borderRadius: '16px', padding: '16px', border: '1px solid #fee2e2', textAlign: 'center' }}>
            <h5 style={{ fontSize: '11px', fontWeight: '700', color: '#b91c1c', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Share & Earn More</h5>
            <p style={{ fontSize: '11px', color: '#4b5563', margin: '0 0 8px 0' }}>Share your link and earn ৳5 - ৳10 per task!</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyAxial: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#dc2626' }}>f</span>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyAxial: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#dc2626' }}>t</span>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyAxial: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#dc2626' }}>w</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, padding: '32px', maxWidth: '1200px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* HEADER BAR */}
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', margin: 0 }}>
              Welcome, <span style={{ color: '#dc2626' }}>{profile.phone}</span> !
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#ffffff', padding: '8px 16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#111827', margin: 0 }}>{profile.fullName}</p>
              <p style={{ fontSize: '11px', color: '#9ca3af', margin: '2px 0 0 0' }}>User</p>
            </div>
          </div>
        </header>

        {/* TOP CARDS SECTION */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Balance Card */}
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', margin: '0 0 4px 0' }}>Your Balance</p>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', margin: 0 }}>
                <span style={{ color: '#dc2626' }}>৳</span> 0
              </h2>
              <button style={{ marginTop: '16px', backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700', fontSize: '12px', padding: '8px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
            <div style={{ width: '56px', height: '56px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
          </div>

          {/* Promo Action Card */}
          <div style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', borderRadius: '24px', padding: '24px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gridColumn: 'span 2' }}>
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '900', margin: 0, letterSpacing: '-0.3px' }}>Complete Micro Jobs</h3>
              <p style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0', opacity: 0.9 }}>Earn Money Easily</p>
              <p style={{ fontSize: '12px', margin: '8px 0 0 0', opacity: 0.8 }}>Simple tasks, instant rewards.</p>
            </div>
            <button style={{ backgroundColor: '#ffffff', color: '#dc2626', fontWeight: '800', fontSize: '14px', padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
              Start Working
            </button>
          </div>
        </section>

        {/* JOBS SECTION */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '24px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '40px', height: '40px', backgroundColor: '#fee2e2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>Available Jobs</h3>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0 0' }}>Complete the tasks below and earn rewards.</p>
            </div>
          </div>

          {/* Job Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Job 1 */}
            <div style={{ border: '1px solid #f3f4f6', backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>f</div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>Like and share the BDzoon Facebook page.</h4>
                  <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>Reward: ৳ 5</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://www.facebook.com/BDzoon.official" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700', fontSize: '12px', padding: '10px 16px', borderRadius: '12px', textDecoration: 'none' }}>
                  Click here to work →
                </a>
                <input type="file" style={{ fontSize: '12px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '12px', backgroundColor: '#f9fafb' }} />
                <button style={{ backgroundColor: '#ffffff', color: '#dc2626', border: '1px solid #dc2626', fontWeight: '700', fontSize: '12px', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>
                  Submit Proof
                </button>
              </div>
            </div>

            {/* Job 2 */}
            <div style={{ border: '1px solid #f3f4f6', backgroundColor: '#ffffff', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>Visit the BDzoon website and take a screenshot.</h4>
                  <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '700', marginTop: '4px' }}>Reward: ৳ 10</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a href="https://www.bdzoon.com" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700', fontSize: '12px', padding: '10px 16px', borderRadius: '12px', textDecoration: 'none' }}>
                  Click here to work →
                </a>
                <input type="file" style={{ fontSize: '12px', border: '1px solid #e5e7eb', padding: '6px', borderRadius: '12px', backgroundColor: '#f9fafb' }} />
                <button style={{ backgroundColor: '#ffffff', color: '#dc2626', border: '1px solid #dc2626', fontWeight: '700', fontSize: '12px', padding: '10px 16px', borderRadius: '12px', cursor: 'pointer' }}>
                  Submit Proof
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* BOTTOM MATRIX */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Total Jobs</p>
              <p style={{ fontSize: '14px', fontWeight: '800', color: '#111827', margin: '2px 0 0 0' }}>2 Available to work</p>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Total Earnings</p>
              <p style={{ fontSize: '14px', fontWeight: '800', color: '#111827', margin: '2px 0 0 0' }}>৳ 0 Keep working!</p>
            </div>
          </div>

          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', margin: 0 }}>Total Referrals</p>
              <p style={{ fontSize: '14px', fontWeight: '800', color: '#111827', margin: '2px 0 0 0' }}>0 Invite and earn more</p>
            </div>
          </div>
        </section>

        {/* ACCOUNT SETTINGS LINK */}
        <section style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>Edit Profile Settings</h3>
          <button onClick={() => { setTempProfile({ ...profile }); setIsEditModalOpen(true); }} style={{ backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700', fontSize: '12px', padding: '12px 20px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>
            Edit Profile Details
          </button>
        </section>

        {/* FOOTER */}
        <footer style={{ marginTop: '48px', textAlign: 'center', fontSize: '11px', color: '#9ca3af', fontWeight: '500' }}>
          © 2024 BDZOON. All rights reserved.
        </footer>
      </main>

      {/* INTERACTIVE POPUP MODAL */}
      {isEditModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', width: '100%', maxWidth: '400px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ backgroundColor: '#dc2626', padding: '16px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>Update Settings</h3>
              <button onClick={() => setIsEditModalOpen(false)} style={{ backgroundColor: 'transparent', color: '#ffffff', border: 'none', fontWeight: '700', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleProfileSave} style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280', marginBottom: '4px' }}>Full Name</label>
                <input type="text" required value={tempProfile.fullName} onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280', marginBottom: '4px' }}>Mobile Number</label>
                <input type="text" required value={tempProfile.phone} onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280', marginBottom: '4px' }}>Username ID</label>
                <input type="text" required value={tempProfile.username} onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#6b7280', marginBottom: '4px' }}>Password</label>
                <input type="password" required value={tempProfile.password} onChange={(e) => setTempProfile({ ...tempProfile, password: e.target.value })} style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '10px', fontSize: '14px' }} />
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} style={{ flex: 1, backgroundColor: '#f3f4f6', color: '#4b5563', fontWeight: '700', fontSize: '12px', padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, backgroundColor: '#dc2626', color: '#ffffff', fontWeight: '700', fontSize: '12px', padding: '10px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
