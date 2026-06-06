import { useState, useRef, useEffect } from 'react';
import AuthModal from '../components/AuthModal';

export default function Dashboard() {
  // সেশন স্টেট: ইউজার লগইন আছে কি না (ওল্ড ইউজারদের জন্য ডিফল্ট true রাখা হয়েছে)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [activeSection, setActiveSection] = useState('dashboard');
  const [copied, setCopied] = useState(false);
  
  // প্রোফাইল ডাটা স্টেট
  const [profile, setProfile] = useState({
    name: 'Nasir Rahman Talukder',
    mobile: '+9687005282',
    username: 'nasir700',
    password: '••••••••'
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ ...profile });
  const [files, setFiles] = useState({ job1: null, job2: null });

  const jobsRef = useRef(null);
  const referralLink = "https://micro-job-world.vercel.app/?ref=9687005282";

  // ফাংশন এবং হ্যান্ডলারসমূহ
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  const handleScrollToJobs = () => {
    jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection('jobs');
  };

  const handleFileChange = (jobId, e) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [jobId]: e.target.files[0] }));
    }
  };

  const handleSubmitProof = (jobId, taskName) => {
    if (!files[jobId]) {
      alert("Please choose a file first before submitting proof!");
      return;
    }
    alert(`Proof Submitted Successfully for: "${taskName}"`);
    setFiles(prev => ({ ...prev, [jobId]: null }));
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({ ...modalData });
    setIsModalOpen(false);
    alert("Profile Updated Successfully!");
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      setIsLoggedIn(false); // লগআউট করলে আবার লগইন পপআপ স্ক্রিন সামনে আসবে
      alert("Logged out successfully!");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'sans-serif', color: '#333', position: 'relative' }}>
      
      {/* ১. কন্ডিশনাল পপআপ: ইউজার লগইন না থাকলে সুন্দর লাল-সাদা মডালটি ওপেন হবে */}
      {!isLoggedIn && (
        <AuthModal onLoginSuccess={() => setIsLoggedIn(true)} />
      )}

      {/* নেভিগেশন মেনু (Sidebar Menu) */}
      <aside style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h1 style={{ color: '#e53e3e', fontSize: '22px', fontWeight: 'bold', margin: 0, letterSpacing: '0.5px' }}>BDZOON</h1>
          <span style={{ color: '#718096', fontSize: '11px' }}>Micro Job World</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'jobs', label: 'Available Jobs', icon: '💼' },
            { id: 'submissions', label: 'My Submissions', icon: '📄' },
            { id: 'referrals', label: 'Referrals', icon: '👥' },
            { id: 'profile', label: 'Profile Settings', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                backgroundColor: activeSection === item.id ? '#e53e3e' : 'transparent',
                color: activeSection === item.id ? '#ffffff' : '#4a5568',
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={handleLogout} 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textAlign: 'left', backgroundColor: 'transparent', color: '#4a5568' }}
          >
            <span>🚪 Logout</span>
          </button>
        </nav>

        {/* রেফারেল কার্ড */}
        <div style={{ marginTop: 'auto', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#e53e3e' }}>YOUR REFERRAL LINK</span>
          <div style={{ backgroundColor: '#e53e3e', color: '#fff', padding: '8px', borderRadius: '6px', fontSize: '11px', wordBreak: 'break-all', fontFamily: 'monospace' }}>
            {referralLink}
          </div>
          <button 
            onClick={handleCopyLink} 
            style={{ backgroundColor: '#ffffff', color: '#e53e3e', border: '1px solid #e53e3e', padding: '8px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </aside>

      {/* মেইন কন্টেন্ট উইন্ডো */}
      <main style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* হেডার এবং স্বাগতম মেসেজ */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
              Welcome, <span style={{ color: '#e53e3e' }}>{profile.mobile}</span> !
            </h2>
          </div>
          <div 
            onClick={() => { setModalData({ ...profile }); setIsModalOpen(true); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#ffffff', padding: '8px 16px', borderRadius: '30px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
          >
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e53e3e' }}>👤</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '13px', fontWeight: '600' }}>{profile.name}</span>
              <span style={{ fontSize: '10px', color: '#718096' }}>User</span>
            </div>
          </div>
        </div>

        {/* মেইন ড্যাশবোর্ড সেকশন */}
        {activeSection === 'dashboard' && (
          <>
            {/* ব্যালেন্স কার্ড */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', maxWidth: '400px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#a0aec0', fontWeight: 'bold' }}>YOUR BALANCE</span>
                <span style={{ fontSize: '32px', fontWeight: 'bold' }}>৳ 0</span>
                <button onClick={handleLogout} style={{ backgroundColor: '#e53e3e', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}>Logout</button>
              </div>
              <div style={{ fontSize: '24px', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '12px', height: 'fit-content' }}>💳</div>
            </div>

            {/* মাইক্রো জবস ব্যানার */}
            <div style={{ backgroundColor: '#e53e3e', borderRadius: '16px', padding: '24px', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Complete Micro Jobs</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px' }}>Earn Money Easily</p>
                <span style={{ fontSize: '12px', opacity: 0.9, display: 'block', marginTop: '4px' }}>Simple tasks, instant rewards.</span>
              </div>
              <button 
                onClick={handleScrollToJobs} 
                style={{ backgroundColor: '#ffffff', color: '#e53e3e', border: 'none', padding: '12px 24px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Start Working
              </button>
            </div>

            {/* জব লিস্ট এরিয়া */}
            <div ref={jobsRef} style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '20px' }}>💼</span>
                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Available Jobs</h4>
              </div>
              
              {/* টাস্ক ১ */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h5 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Like and share the BDzoon Facebook page.</h5>
                <span style={{ fontSize: '12px', color: '#e53e3e', fontWeight: 'bold' }}>Reward: ৳ 5</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                  <a href="https://www.facebook.com/BDzoon.official" target="_blank" rel="noreferrer">
                    <button style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Click here to work →</button>
                  </a>
                  <input type="file" onChange={(e) => handleFileChange('job1', e)} style={{ fontSize: '12px' }} />
                  <button onClick={() => handleSubmitProof('job1', 'BDzoon Facebook Page Like')} style={{ backgroundColor: '#ffffff', color: '#e53e3e', border: '1px solid #e53e3e', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Submit Proof</button>
                </div>
              </div>

              {/* টাস্ক ২ */}
              <div style={{ border: '1px solid #edf2f7', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h5 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Visit the BDzoon website and take a screenshot.</h5>
                <span style={{ fontSize: '12px', color: '#e53e3e', fontWeight: 'bold' }}>Reward: ৳ 10</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                  <a href="https://www.bdzoon.com" target="_blank" rel="noreferrer">
                    <button style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Click here to work →</button>
                  </a>
                  <input type="file" onChange={(e) => handleFileChange('job2', e)} style={{ fontSize: '12px' }} />
                  <button onClick={() => handleSubmitProof('job2', 'BDzoon Website Visit')} style={{ backgroundColor: '#ffffff', color: '#e53e3e', border: '1px solid #e53e3e', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Submit Proof</button>
                </div>
              </div>
            </div>

            {/* স্ট্যাটাস গ্রিড বক্সসমূহ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>🗑️</span>
                <div>
                  <span style={{ fontSize: '10px', color: '#a0aec0', fontWeight: 'bold' }}>TOTAL JOBS</span>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>2 Available to work</p>
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>💰</span>
                <div>
                  <span style={{ fontSize: '10px', color: '#a0aec0', fontWeight: 'bold' }}>TOTAL EARNINGS</span>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>৳ 0 Keep working!</p>
                </div>
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>👥</span>
                <div>
                  <span style={{ fontSize: '10px', color: '#a0aec0', fontWeight: 'bold' }}>TOTAL REFERRALS</span>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>0 Invite and earn more</p>
                </div>
              </div>
            </div>

            {/* প্রোফাইল সেটিংস সেকশন */}
            <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>Edit Profile Settings</h4>
              <button 
                onClick={() => { setModalData({ ...profile }); setIsModalOpen(true); }}
                style={{ backgroundColor: '#e53e3e', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
              >
                Edit Profile Details
              </button>
            </div>
          </>
        )}

        {/* অন্যান্য সাব-মেনুগুলোর জন্য কন্টেন্ট হোল্ডার */}
        {activeSection !== 'dashboard' && (
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ textTransform: 'capitalize', fontSize: '20px', marginBottom: '10px' }}>{activeSection.replace('-', ' ')} Section</h3>
            <p style={{ color: '#718096' }}>Content for {activeSection} is fully active.</p>
            <button onClick={() => setActiveSection('dashboard')} style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', marginTop: '15px', cursor: 'pointer' }}>Back to Dashboard</button>
          </div>
        )}

        <footer style={{ marginTop: 'auto', textAlign: 'center', padding: '20px 0', fontSize: '11px', color: '#a0aec0' }}>
          © 2026 BDZOON. All rights reserved.
        </footer>
      </main>

      {/* প্রোফাইল পপআপ মডাল ফর্ম */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '28px', width: '90%', maxWidth: '450px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Update Profile Details</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#a0aec0' }}>&times;</button>
            </div>
            
            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Full Name</label>
                <input type="text" value={modalData.name} onChange={(e) => setModalData({ ...modalData, name: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Mobile Number</label>
                <input type="text" value={modalData.mobile} onChange={(e) => setModalData({ ...modalData, mobile: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Username ID</label>
                <input type="text" value={modalData.username} onChange={(e) => setModalData({ ...modalData, username: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#4a5568' }}>Password</label>
                <input type="password" value={modalData.password} onChange={(e) => setModalData({ ...modalData, password: e.target.value })} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ backgroundColor: '#edf2f7', color: '#4a5568', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" style={{ backgroundColor: '#e53e3e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
