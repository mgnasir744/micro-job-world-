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
    <div className="min-h-screen bg-[#f8f9fa] text-[#333] font-sans antialiased flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-3 mb-6">
            <div className="text-[#dc2626] font-black text-2xl tracking-tight">
              BDZOON <span className="block text-[10px] uppercase tracking-widest text-gray-400 font-bold -mt-1">Micro Job World</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-[#dc2626] text-white transition-all">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Available Jobs
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              My Submissions
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Referrals
            </a>
            <button onClick={() => setIsEditModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all text-left">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile Settings
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </a>
          </nav>
        </div>

        {/* Referral Card Side Container */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#dc2626] text-white rounded-2xl p-4 shadow-sm">
            <h4 className="text-[11px] font-bold uppercase tracking-wider opacity-90 mb-2">Your Referral Link</h4>
            <div className="bg-black/10 text-[11px] p-2 rounded-lg font-mono break-all mb-3 border border-white/10">
              {`https://micro-job-world.vercel.app/?ref=${profile.phone}`}
            </div>
            <button onClick={handleCopy} className="w-full bg-white text-[#dc2626] font-bold py-2 rounded-xl text-xs hover:bg-gray-50 transition-all">
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-center">
            <h5 className="text-[11px] font-bold text-red-700 uppercase tracking-wider mb-1">Share & Earn More</h5>
            <p className="text-[11px] text-gray-600 mb-2">Earn ৳5 - ৳10 per task!</p>
            <div className="flex justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer">f</span>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer">t</span>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer">w</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN LAYOUT CONTENT */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* HEADER BAR */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome, <span className="text-[#dc2626]">{profile.phone}</span> !
            </h1>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-left pr-4">
              <p className="text-xs font-bold text-gray-900 leading-none">{profile.fullName}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">User</p>
            </div>
          </div>
        </header>

        {/* TOP INTERACTIVE CARDS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Your Balance</p>
              <h2 className="text-4xl font-black text-gray-900 flex items-center gap-1">
                <span className="text-[#dc2626]">৳</span> 0
              </h2>
              <button className="mt-4 bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-700 transition-all">
                Logout
              </button>
            </div>
            <div className="w-14 h-14 bg-red-100 text-[#dc2626] rounded-2xl flex items-center justify-center shrink-0">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md">
            <div className="space-y-1">
              <h3 className="text-xl font-black tracking-tight">Complete Micro Jobs</h3>
              <p className="text-lg font-bold opacity-90">Earn Money Easily</p>
              <p className="text-xs text-white/80 font-medium pt-1">Simple tasks, instant rewards.</p>
            </div>
            <button className="bg-white text-[#dc2626] font-extrabold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shrink-0">
              Start Working
            </button>
          </div>
        </section>

        {/* JOBS CONTAINER LIST */}
        <section className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#dc2626] shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Available Jobs</h3>
              <p className="text-xs text-gray-400 font-medium">Complete the tasks below and earn rewards.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Job 1 */}
            <div className="border border-gray-100 bg-white rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.38c.02-.1.03-.2.03-.31 0-.41-.17-.79-.44-1.06L14.17 2 7.59 8.59C7.22 8.95 7 9.45 7 10v9c0 1.1.9 2 2 2h9c.75 0 1.41-.41 1.76-1.02l2.89-6.74c.11-.25.18-.54.18-.36z"/></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Like and share the BDzoon Facebook page.</h4>
                  <div className="text-xs text-[#dc2626] font-bold mt-1">Reward: ৳ 5</div>
                </div>
              </div>
              <div className="w-full xl:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="https://www.facebook.com/BDzoon.official" target="_blank" rel="noopener noreferrer" className="bg-[#dc2626] text-white font-bold text-xs px-4 py-2 rounded-xl text-center">
                  Click here to work →
                </a>
                <input type="file" className="block text-xs text-gray-500 border border-gray-200 rounded-xl p-1 bg-gray-50" />
                <button className="bg-white text-[#dc2626] border border-[#dc2626] font-bold text-xs px-4 py-2 rounded-xl">
                  Submit Proof
                </button>
              </div>
            </div>

            {/* Job 2 */}
            <div className="border border-gray-100 bg-white rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 text-[#dc2626] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Visit the BDzoon website and take a screenshot.</h4>
                  <div className="text-xs text-[#dc2626] font-bold mt-1">Reward: ৳ 10</div>
                </div>
              </div>
              <div className="w-full xl:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="https://www.bdzoon.com" target="_blank" rel="noopener noreferrer" className="bg-[#dc2626] text-white font-bold text-xs px-4 py-2 rounded-xl text-center">
                  Click here to work →
                </a>
                <input type="file" className="block text-xs text-gray-500 border border-gray-200 rounded-xl p-1 bg-gray-50" />
                <button className="bg-white text-[#dc2626] border border-[#dc2626] font-bold text-xs px-4 py-2 rounded-xl">
                  Submit Proof
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM METRICS CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-red-50 text-[#dc2626] rounded-xl flex items-center justify-center shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Jobs</p>
              <p className="text-base font-black text-gray-900 mt-0.5">2 Available to work</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-red-50 text-[#dc2626] rounded-xl flex items-center justify-center shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Earnings</p>
              <p className="text-base font-black text-gray-900 mt-0.5">৳ 0 Keep working!</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-red-50 text-[#dc2626] rounded-xl flex items-center justify-center shrink-0">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Referrals</p>
              <p className="text-base font-black text-gray-900 mt-0.5">0 Invite and earn more</p>
            </div>
          </div>
        </section>

        {/* ACCOUNT PROFILE MODIFICATION LAYER */}
        <section className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm">
          <h3 className="text-base font-bold text-gray-900 mb-4">Edit Profile Settings</h3>
          <button onClick={() => { setTempProfile({ ...profile }); setIsEditModalOpen(true); }} className="bg-[#dc2626] text-white font-bold text-xs px-5 py-2.5 rounded-xl">
            Edit Profile Details
          </button>
        </section>

        {/* FOOTER METADATA */}
        <footer className="mt-12 text-center text-[11px] text-gray-400 font-medium">
          © 2024 BDZOON. All rights reserved.
        </footer>
      </main>

      {/* POPUP DYNAMIC BOX */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="bg-[#dc2626] p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Update Settings</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white font-bold text-sm">✕</button>
            </div>
            <form onSubmit={handleProfileSave} className="p-4 space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Full Name</label>
                <input type="text" required value={tempProfile.fullName} onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Mobile Number</label>
                <input type="text" required value={tempProfile.phone} onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Username ID</label>
                <input type="text" required value={tempProfile.username} onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-gray-500 mb-1">Password</label>
                <input type="password" required value={tempProfile.password} onChange={(e) => setTempProfile({ ...tempProfile, password: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none" />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold text-xs py-2 rounded-xl">Cancel</button>
                <button type="submit" className="flex-1 bg-[#dc2626] text-white font-bold text-xs py-2 rounded-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
