import React, { useState, useRef } from 'react';

export default function Dashboard() {
  // ১. নেভিগেশন স্টেট
  const [activeSection, setActiveSection] = useState('dashboard');

  // ইউজার ডাটা স্টেট (৬. প্রোফাইল আপডেট)
  const [userData, setUserData] = useState({
    name: 'Nasir Rahman Talukder',
    mobile: '+9687005282',
    username: 'nasir_talukder',
    balance: 0,
    totalJobs: 2,
    totalEarnings: 0,
    totalReferrals: 0,
  });

  // রেফারেল লিংক কপি স্টেট
  const [copyText, setCopyText] = useState('Copy Link');
  const referralLink = `https://micro-job-world.vercel.app/?ref=${userData.mobile}`;

  // ফাইল আপলোড স্টেট
  const [taskFiles, setTaskFiles] = useState({ task1: null, task2: null });

  // প্রোফাইল মডাল স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userData.name,
    mobile: userData.mobile,
    username: userData.username,
    password: '',
  });

  // ৫. স্টার্ট ওয়ার্কিং স্ক্রোল রেফারেন্স
  const jobsSectionRef = useRef(null);

  // ৪. কপি লিংক ফাংশন
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy Link'), 2000);
  };

  // ৩. প্রুফ সাবমিট ফাংশন
  const handleFileChange = (taskKey, e) => {
    if (e.target.files && e.target.files[0]) {
      setTaskFiles({ ...taskFiles, [taskKey]: e.target.files[0] });
    }
  };

  const handleSubmitProof = (taskKey, taskName) => {
    if (!taskFiles[taskKey]) {
      alert('Please choose a file first!');
      return;
    }
    alert(`Proof Submitted Successfully for: "${taskName}"!`);
    // এখানে ব্যাকএন্ড এপিআই কল করতে পারেন
  };

  // ৫. স্ক্রোল ফাংশন
  const scrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ৬. প্রোফাইল সেভ ফাংশন
  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      name: editForm.name,
      mobile: editForm.mobile,
      username: editForm.username,
    });
    setIsModalOpen(false);
    alert('Profile Updated Successfully!');
  };

  // ৭. লগআউট ফাংশন
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      // সেশন বা টোকেন ক্লিয়ার করার লজিক এখানে হবে
    }
  };

  // কমন ইনলাইন স্টাইলস (Tailwind ব্যাকআপ থিম)
  const styles = {
    primaryRed: '#D62222',
    lightRedBg: '#FFF1F1',
    textDark: '#1A1A1A',
    textMuted: '#666666',
    borderLight: '#F0F0F0',
    sidebarItem: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      backgroundColor: isActive ? '#D62222' : 'transparent',
      color: isActive ? '#FFFFFF' : '#444444',
      border: 'none',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: isActive ? '600' : '500',
      transition: 'all 0.2s ease',
    }),
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      border: '1px solid #F0F0F0',
    },
    btnRed: {
      backgroundColor: '#D62222',
      color: '#FFFFFF',
      padding: '10px 20px',
      borderRadius: '8px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAFAFA', fontFamily: 'sans-serif', color: styles.textDark }}>
      
      {/* ১. বাম পাশের নেভিগেশন মেনু (Sidebar) */}
      <aside style={{ width: '280px', backgroundColor: '#FFFFFF', borderRight: `1px solid ${styles.borderLight}`, padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h2 style={{ color: styles.primaryRed, margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>BDZOON</h2>
          <p style={{ fontSize: '11px', color: styles.textMuted, margin: '2px 0 0 0' }}>Micro Job World</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          <button onClick={() => setActiveSection('dashboard')} style={styles.sidebarItem(activeSection === 'dashboard')}>
            <span style={{ fontSize: '18px' }}>📊</span> Dashboard
          </button>
          <button onClick={() => { setActiveSection('jobs'); setTimeout(scrollToJobs, 100); }} style={styles.sidebarItem(activeSection === 'jobs')}>
            <span style={{ fontSize: '18px' }}>💼</span> Available Jobs
          </button>
          <button onClick={() => setActiveSection('submissions')} style={styles.sidebarItem(activeSection === 'submissions')}>
            <span style={{ fontSize: '18px' }}>📝</span> My Submissions
          </button>
          <button onClick={() => setActiveSection('referrals')} style={styles.sidebarItem(activeSection === 'referrals')}>
            <span style={{ fontSize: '18px' }}>👥</span> Referrals
          </button>
          <button onClick={() => setIsModalOpen(true)} style={styles.sidebarItem(false)}>
            <span style={{ fontSize: '18px' }}>⚙️</span> Profile Settings
          </button>
          <button onClick={handleLogout} style={{ ...styles.sidebarItem(false), marginTop: 'auto', color: styles.primaryRed }}>
            <span style={{ fontSize: '18px' }}>🚪</span> Logout
          </button>
        </nav>

        {/* ৪. রেফারেল লিংক বক্স */}
        <div style={{ backgroundColor: styles.lightRedBg, borderRadius: '12px', padding: '16px', border: `1px solid #FFE0E0` }}>
          <p style={{ fontSize: '11px', fontWeight: '700', color: styles.primaryRed, marginTop: 0, marginBottom: '8px', uppercase: 'true' }}>YOUR REFERRAL LINK</p>
          <div style={{ backgroundColor: '#FFFFFF', padding: '8px', borderRadius: '6px', fontSize: '11px', overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid #EFEFEF', marginBottom: '10px', color: styles.textMuted }}>
            {referralLink}
          </div>
          <button onClick={handleCopyLink} style={{ ...styles.btnRed, width: '100%', padding: '8px', fontSize: '12px' }}>
            {copyText}
          </button>
        </div>
      </aside>

      {/* ডানপাশের মূল কন্টেন্ট উইন্ডো */}
      <main style={{ flex: 1, padding: '40px', overflowY: 'auto', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* হেডার / ওয়েলকাম সেকশন */}
        <header style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '32px', width: '100%' }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0 }}>
              Welcome, <span style={{ color: styles.primaryRed }}>{userData.mobile}</span> !
            </h1>
          </div>
          
          {/* ইউজার প্রফাইল চিপ */}
          <div onClick={() => setIsModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFFFFF', padding: '8px 16px', borderRadius: '50px', border: `1px solid ${styles.borderLight}`, cursor: 'pointer' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: styles.lightRedBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: styles.primaryRed, fontWeight: '700' }}>
              {userData.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{userData.name}</div>
              <div style={{ fontSize: '11px', color: styles.textMuted }}>User</div>
            </div>
          </div>
        </header>

        {/* প্রধান ড্যাশবোর্ড ভিউ */}
        {activeSection === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* ব্যালেন্স এবং কুইক স্টার্ট গ্রিড */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
              {/* ব্যালেন্স কার্ড */}
              <div style={styles.card}>
                <p style={{ fontSize: '12px', fontWeight: '600', color: styles.textMuted, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Your Balance</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '700' }}>৳ {userData.balance}</span>
                </div>
                <button onClick={handleLogout} style={{ backgroundColor: '#F5F5F5', color: '#666', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Logout</button>
              </div>

              {/* ৫. স্টার্ট ওয়ার্কিং ব্যানার */}
              <div style={{ ...styles.card, backgroundColor: styles.primaryRed, color: '#FFFFFF', display: 'flex', justifyContent: 'between', alignItems: 'center', padding: '32px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '22px', fontWeight: '700' }}>Complete Micro Jobs</h3>
                  <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '14px' }}>Earn Money Easily — Simple tasks, instant rewards.</p>
                </div>
                <button onClick={scrollToJobs} style={{ backgroundColor: '#FFFFFF', color: styles.primaryRed, border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap' }}>
                  Start Working
                </button>
              </div>
            </div>

            {/* ২ ও ৩. অ্যাভেইলেবল জবস লিস্ট */}
            <section ref={jobsSectionRef} style={styles.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: `1px solid ${styles.borderLight}`, paddingBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>💼</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>Available Jobs</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: styles.textMuted }}>Complete the tasks below and earn rewards.</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* টাস্ক ১ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', borderRadius: '12px', border: `1px solid ${styles.borderLight}`, backgroundColor: '#FAFAFA' }}>
                  <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Like and share the BDzoon Facebook page.</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: styles.primaryRed, fontWeight: '700' }}>Reward: ৳ 5</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.btnRed, textDecoration: 'none', display: 'inline-block' }}>
                      Click here to work →
                    </a>
                    <input type="file" onChange={(e) => handleFileChange('task1', e)} style={{ fontSize: '13px' }} />
                    <button onClick={() => handleSubmitProof('task1', 'Like and share the BDzoon Facebook page')} style={{ ...styles.btnRed, backgroundColor: '#1A1A1A' }}>
                      Submit Proof
                    </button>
                  </div>
                </div>

                {/* টাস্ক ২ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', borderRadius: '12px', border: `1px solid ${styles.borderLight}`, backgroundColor: '#FAFAFA' }}>
                  <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'start', width: '100%' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600' }}>Visit the BDzoon website and take a screenshot.</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: styles.primaryRed, fontWeight: '700' }}>Reward: ৳ 10</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer" style={{ ...styles.btnRed, textDecoration: 'none', display: 'inline-block' }}>
                      Click here to work →
                    </a>
                    <input type="file" onChange={(e) => handleFileChange('task2', e)} style={{ fontSize: '13px' }} />
                    <button onClick={() => handleSubmitProof('task2', 'Visit the BDzoon website and take a screenshot')} style={{ ...styles.btnRed, backgroundColor: '#1A1A1A' }}>
                      Submit Proof
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* বটম স্ট্যাটস গ্রিড */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              <div style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
                <span style={{ fontSize: '24px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}>📁</span>
                <div>
                  <div style={{ fontSize: '12px', color: styles.textMuted }}>TOTAL JOBS</div>
                  <div style={{ fontSize: '15px', fontWeight: '700' }}>{userData.totalJobs} Available to work</div>
                </div>
              </div>
              <div style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
                <span style={{ fontSize: '24px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}>💰</span>
                <div>
                  <div style={{ fontSize: '12px', color: styles.textMuted }}>TOTAL EARNINGS</div>
                  <div style={{ fontSize: '15px', fontWeight: '700' }}>৳ {userData.totalEarnings} Keep working!</div>
                </div>
              </div>
              <div style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 24px' }}>
                <span style={{ fontSize: '24px', padding: '10px', backgroundColor: '#F5F5F5', borderRadius: '10px' }}>🔗</span>
                <div>
                  <div style={{ fontSize: '12px', color: styles.textMuted }}>TOTAL REFERRALS</div>
                  <div style={{ fontSize: '15px', fontWeight: '700' }}>{userData.totalReferrals} Invite and earn more</div>
                </div>
              </div>
            </div>

            {/* ৬. এডিট প্রোফাইল সেটিংস কুইক সেকশন */}
            <section style={styles.card}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '700' }}>Edit Profile Settings</h3>
              <button onClick={() => setIsModalOpen(true)} style={styles.btnRed}>
                Edit Profile Details
              </button>
            </section>

          </div>
        )}

        {/* অন্যান্য মেনু ভিউ ব্যাকআপ (স্টেট টেস্ট করার জন্য) */}
        {activeSection !== 'dashboard' && (
          <div style={styles.card}>
            <h3>{activeSection.toUpperCase()} Section</h3>
            <p>This panel or section is now fully connected to the sidebar routing system.</p>
            <button onClick={() => setActiveSection('dashboard')} style={styles.btnRed}>Back to Dashboard</button>
          </div>
        )}

        {/* ফুটার */}
        <footer style={{ marginTop: '48px', textAlign: 'center', fontSize: '12px', color: styles.textMuted }}>
          © 2026 BDZOON. All rights reserved.
        </footer>
      </main>

      {/* ৬. প্রোফাইল পপআপ মডাল (Edit Profile Popup Modal) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: '16px', width: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', position: 'relative' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700', color: styles.textDark }}>Edit Profile Details</h3>
            
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: styles.textMuted }}>Full Name</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '14px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: styles.textMuted }}>Mobile Number</label>
                <input type="text" value={editForm.mobile} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '14px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: styles.textMuted }}>Username ID</label>
                <input type="text" value={editForm.username} onChange={(e) => setEditForm({ ...editForm, username: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '14px' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: styles.textMuted }}>Password</label>
                <input type="password" value={editForm.password} onChange={(e) => setEditForm({ ...editForm, password: e.target.value })} placeholder="••••••••" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #CCC', fontSize: '14px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#F0F0F0', color: '#333', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={styles.btnRed}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
