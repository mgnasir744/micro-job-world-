import { useState } from 'react';

export default function Dashboard() {
  // User Profile State
  const [profile, setProfile] = useState({
    fullName: "Nasir Rahman Talukder",
    phone: "+9687005282",
    username: "nasir98",
    password: "â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
  });

  // UI States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [copied, setCopied] = useState(false);

  // Referral Code Copy Function
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://micro-job-world.vercel.app/?ref=${profile.phone}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Profile Update Function
  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-3 mb-6">
            <div className="text-red-600 font-black text-2xl tracking-tight">
              BDZOON <span className="block text-[10px] uppercase tracking-widest text-gray-500 font-bold -mt-1">Micro Job World</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl bg-red-600 text-white transition-all">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Available Jobs
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              My Submissions
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Referrals
            </a>
            <button onClick={() => setIsEditModalOpen(true)} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all text-left">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile Settings
            </button>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-all">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </a>
          </nav>
        </div>

        {/* Referral Section Below Menu */}
        <div className="mt-6 space-y-4">
          <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-4 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2">Your Referral Link</h4>
            <div className="bg-white/10 text-xs p-2 rounded-lg font-mono break-all mb-3 select-all border border-white/10">
              {`https://micro-job-world.vercel.app/?ref=${profile.phone}`}
            </div>
            <button onClick={handleCopy} className="w-full bg-white text-red-600 font-bold py-2 rounded-xl text-xs hover:bg-red-50 transition-all shadow-sm">
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="bg-red-50 rounded-2xl p-4 border border-red-100 text-center">
            <h5 className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">Share & Earn More</h5>
            <p className="text-[11px] text-gray-600 mb-2">Earn à§³5 - à§³10 per task!</p>
            <div className="flex justify-center gap-2">
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer hover:bg-red-50">f</span>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer hover:bg-red-50">t</span>
              <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-red-600 cursor-pointer hover:bg-red-50">w</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome, <span className="text-red-600">{profile.phone}</span> !
            </h1>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage your tasks, balance, and account details here.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm self-end sm:self-auto">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <div className="text-left pr-4">
              <p className="text-xs font-bold text-gray-900 leading-none">{profile.fullName || 'User'}</p>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Verified Account</p>
            </div>
          </div>
        </header>

        {/* HERO CARDS SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-red-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-300"></div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Your Balance</p>
              <h2 className="text-4xl font-black text-gray-900 flex items-center gap-1">
                <span className="text-red-600 font-sans">à§³</span> 0
              </h2>
              <button className="mt-4 bg-red-50 text-red-600 font-bold text-xs px-4 py-2 rounded-xl border border-red-200 hover:bg-red-100 transition-all">
                Withdraw Funds
              </button>
            </div>
            <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-md relative z-10 shadow-red-200">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            </div>
          </div>

          {/* Marketing/Action Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-md shadow-red-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <div className="space-y-2 relative z-10">
              <span className="bg-white/20 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">Quick Earning</span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight">Complete Micro Jobs & Earn Instantly</h3>
              <p className="text-xs text-white/80 max-w-sm font-medium">Simple daily tasks including social media boosts and website verification checks.</p>
            </div>
            <button className="bg-white text-red-600 font-extrabold text-sm px-6 py-3.5 rounded-2xl hover:bg-red-50 transition-all shadow-lg shadow-black/10 shrink-0 self-stretch sm:self-auto text-center relative z-10">
              Start Working Now
            </button>
          </div>
        </section>

        {/* AVAILABLE JOBS SECTION */}
        <section className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Available Jobs</h3>
              <p className="text-xs text-gray-400 font-medium">Complete the assigned requirements completely to secure verified payout rewards.</p>
            </div>
          </div>

          {/* Job Items Container */}
          <div className="space-y-4">
            
            {/* Task 1: Facebook Link */}
            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all hover:border-gray-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">f</div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Like and share the BDzoon Facebook page.</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Visit, complete the action, and return with verification screenshot proof.</p>
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 font-bold text-xs px-2.5 py-1 rounded-lg mt-2">
                    <span>Reward:</span> <span>à§³ 5</span>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="https://www.facebook.com/BDzoon.official" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-red-700 transition-all text-center shrink-0">
                  Click here to work â†’
                </a>
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 flex-1 sm:w-48">
                  <input type="file" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                </div>
                <button className="bg-gray-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-black transition-all text-center shadow-sm">
                  Submit Proof
                </button>
              </div>
            </div>

            {/* Task 2: Website Link */}
            <div className="border border-gray-100 bg-gray-50/50 rounded-2xl p-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all hover:border-gray-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h18" /></svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Visit the BDzoon website and take a screenshot.</h4>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">Stay on site for 1 minute and snap the landing interface view screen.</p>
                  <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 font-bold text-xs px-2.5 py-1 rounded-lg mt-2">
                    <span>Reward:</span> <span>à§³ 10</span>
                  </div>
                </div>
              </div>
              <div className="w-full xl:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a href="https://www.bdzoon.com" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-red-700 transition-all text-center shrink-0">
                  Click here to work â†’
                </a>
                <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 flex-1 sm:w-48">
                  <input type="file" className="block w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" />
                </div>
                <button className="bg-gray-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-black transition-all text-center shadow-sm">
                  Submit Proof
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SUMMARY QUICK STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Jobs</p>
              <p className="text-lg font-black text-gray-900 leading-none mt-0.5">2 Available</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Earnings</p>
              <p className="text-lg font-black text-gray-900 leading-none mt-0.5">à§³ 0</p>
            </div>
          </div>
          <div className="bg-white border border-gray-100 p-4 rounded-2xl flex items-center gap-3.5 shadow-sm">
            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Referrals</p>
              <p className="text-lg font-black text-gray-900 leading-none mt-0.5">0 Users</p>
            </div>
          </div>
        </section>

        {/* REUSEABLE COMPONENT: USER PROFILE EDIT SECTION */}
        <section className="bg-white border border-gray-200 rounded-3xl p-4 md:p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Your Account Profile Settings</h3>
              <p className="text-xs text-gray-400 font-medium">As a user, you can safely modify your identification details here. System access logs remain highly protected.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Full Name</p>
              <p className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-100 p-3 rounded-xl">{profile.fullName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Mobile / Username</p>
              <p className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-100 p-3 rounded-xl">{profile.phone}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Account ID</p>
              <p className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-100 p-3 rounded-xl">{profile.username}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Password</p>
              <p className="text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-100 p-3 rounded-xl">â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢</p>
            </div>
            <div className="md:col-span-2">
              <button onClick={() => { setTempProfile({ ...profile }); setIsEditModalOpen(true); }} className="bg-red-600 text-white font-bold text-xs px-5 py-3 rounded-xl hover:bg-red-700 transition-all shadow-sm">
                Edit Profile Details
              </button>
            </div>
          </div>

          {/* CRITICAL SECURITY INFO BOX */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <div className="text-amber-600 shrink-0 mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m0-6M7 11a5 5 0 0110 0v2a5 5 0 01-10 0v-2z" /></svg>
            </div>
            <div className="text-xs text-amber-800 font-medium leading-relaxed">
              <strong className="block font-bold text-amber-900 mb-0.5">Security System Shield Active</strong>
              à¦¸à§à¦ªà¦¾à¦° à¦…à§à¦¯à¦¾à¦¡à¦®à¦¿à¦¨ à¦ªà§à¦¯à¦¾à¦¨à§‡à¦² à¦•à¦¨à¦«à¦¿à¦—à¦¾à¦°à§‡à¦¶à¦¨, à¦•à§‹à¦° à¦°à§‡à¦Ÿ à¦¸à§‡à¦Ÿà¦¿à¦‚ à¦à¦¬à¦‚ à¦¡à¦¾à¦Ÿà¦¾à¦¬à§‡à¦œ à¦®à¦¡à¦¿à¦‰à¦²à¦¸à¦®à§‚à¦¹ à¦…à¦¤à§à¦¯à¦¨à§à¦¤ à¦¸à§à¦°à¦•à§à¦·à¦¿à¦¤à¥¤ à¦¸à¦¾à¦§à¦¾à¦°à¦£ à¦‡à¦‰à¦œà¦¾à¦° à¦…à§à¦¯à¦¾à¦•à¦¾à¦‰à¦¨à§à¦Ÿ à¦²à§‡à¦­à§‡à¦² à¦¥à§‡à¦•à§‡ à¦•à§‹à¦¨à§‹à¦­à¦¾à¦¬à§‡à¦‡ à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦® à¦°à§à¦Ÿ à¦ªà§à¦¯à¦¾à¦°à¦¾à¦®à¦¿à¦Ÿà¦¾à¦° à¦…à§à¦¯à¦¾à¦•à§à¦¸à§‡à¦¸ à¦¬à¦¾ à¦à¦¡à¦¿à¦Ÿ à¦•à¦°à¦¾ à¦¸à¦®à§à¦­à¦¬ à¦¨à§Ÿà¥¤
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 text-center text-xs text-gray-400 font-medium border-t border-gray-200/60 pt-6">
          Â© 2026 BDZOON. All rights reserved. Professional Luxury Dashboard Panel.
        </footer>
      </main>

      {/* EDIT MODAL DIALOG */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-gray-100">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-5 text-white flex justify-between items-center">
              <h3 className="font-extrabold text-base tracking-tight">Update Profile Information</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white/80 hover:text-white transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleProfileSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" required value={tempProfile.fullName} onChange={(e) => setTempProfile({ ...tempProfile, fullName: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mobile Number</label>
                <input type="text" required value={tempProfile.phone} onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Username ID</label>
                <input type="text" required value={tempProfile.username} onChange={(e) => setTempProfile({ ...tempProfile, username: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">New Password</label>
                <input type="password" required value={tempProfile.password} onChange={(e) => setTempProfile({ ...tempProfile, password: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 focus:bg-white transition-all" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold text-xs py-3 rounded-xl hover:bg-gray-200 transition-all">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-red-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-red-700 transition-all shadow-md shadow-red-100">
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
