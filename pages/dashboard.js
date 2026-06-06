import { useState } from 'react';

export default function Dashboard() {
  // Active Sidebar/Tab State
  const [activeTab, setActiveTab] = useState('dashboard');

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    fullName: 'Nasir Rahman Talukder',
    phone: '+9687005282',
    password: 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢'
  });

  // Edit Profile States
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile.fullName);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editPassword, setEditPassword] = useState('');

  // Handle Profile Update
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUserProfile({
      fullName: editName,
      phone: editPhone,
      password: editPassword ? 'â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢' : userProfile.password
    });
    setIsEditing(false);
  };

  // Inline Taka Symbol SVG Component to prevent broken characters
  const TakaIcon = ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="M6 13h12" />
      <path d="M10 3v18" />
      <path d="M14 13c3 0 4 2 4 4s-1 4-4 4" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans flex flex-col md:flex-row antialiased text-gray-800">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-4 shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-4 mb-6">
            <div className="text-2xl font-black tracking-tight text-[#DC2626]">
              BDZOON
              <span className="block text-[10px] uppercase font-semibold tracking-widest text-gray-400 mt-0.5">Micro Job World</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'dashboard' ? 'bg-[#DC2626] text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
              Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'jobs' ? 'bg-[#DC2626] text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Available Jobs
            </button>

            <button 
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'submissions' ? 'bg-[#DC2626] text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
              My Submissions
            </button>

            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${activeTab === 'profile' ? 'bg-[#DC2626] text-white shadow-md shadow-red-200' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              Profile Settings
            </button>
          </nav>
        </div>

        {/* Sidebar Cards & Referral Link */}
        <div className="mt-6 space-y-4">
          <div className="bg-[#DC2626] text-white rounded-2xl p-4 shadow-xl shadow-red-100 relative overflow-hidden">
            <h4 className="font-bold text-sm mb-2 relative z-10">Your Referral Link</h4>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-[11px] font-mono break-all mb-3 relative z-10 selection:bg-red-200">
              https://micro-job-world.vercel.app/?ref={userProfile.phone}
            </div>
            <button className="w-full py-2 bg-white text-[#DC2626] font-bold text-xs rounded-xl shadow hover:bg-gray-50 transition-colors relative z-10">
              Copy Link
            </button>
          </div>

          <div className="bg-red-50/50 rounded-2xl p-4 border border-red-100">
            <h5 className="font-bold text-xs text-[#DC2626] uppercase tracking-wider mb-2">Share & Earn More</h5>
            <p className="text-xs text-gray-500 mb-3">Share your link and earn 5 - 10 per task!</p>
            <div className="flex gap-2">
              {['fb', 'tw', 'wa', 'ln'].map((social, i) => (
                <button key={i} className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h1 className="text-xl font-bold text-gray-900 hidden md:block">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'jobs' && 'Available Jobs'}
              {activeTab === 'submissions' && 'Submissions Log'}
              {activeTab === 'profile' && 'Profile Settings'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full"></span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.03 6.03 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-[#DC2626]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-900">{userProfile.fullName}</p>
                <p className="text-xs text-gray-400">{userProfile.phone}</p>
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC TAB BODY */}
        <main className="p-6 space-y-6 max-w-6xl w-full mx-auto flex-1">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Section */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-sm">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-1">Welcome, <span className="text-[#DC2626]">{userProfile.phone}</span> !</h2>
                  <p className="text-sm text-gray-500">Track your tasks, balance, and activities in real-time.</p>
                  
                  {/* Internal Balance Card Component style */}
                  <div className="mt-6 inline-flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 pr-12 relative overflow-hidden">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DC2626] to-red-500 text-white flex items-center justify-center shadow-lg shadow-red-100">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Your Balance</span>
                      <div className="flex items-center gap-1 text-2xl font-black text-gray-900">
                        <TakaIcon className="w-6 h-6 text-[#DC2626]" />
                        <span>0</span>
                      </div>
                    </div>
                    <div className="absolute right-[-10px] bottom-[-10px] text-gray-100 pointer-events-none opacity-50">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18c0 1.105-2.239 2-5 2s-5-.895-5-2s2.239-2 5-2s5 .895 5 2zM11 10c0 1.105-2.239 2-5 2s-5-.895-5-2s2.239-2 5-2s5 .895 5 2z" /></svg>
                    </div>
                  </div>
                </div>

                {/* Banner Promo right side */}
                <div className="w-full lg:w-96 bg-gradient-to-br from-[#DC2626] to-red-500 rounded-2xl p-5 text-white shadow-xl shadow-red-100 flex justify-between items-center relative overflow-hidden">
                  <div className="space-y-3 z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-1 rounded-full">âš¡ Fast Reward</span>
                    <h3 className="font-extrabold text-lg leading-tight">Complete Micro Jobs<br />Earn Money Easily</h3>
                    <p className="text-xs text-red-100">Simple tasks, instant rewards.</p>
                    <button onClick={() => setActiveTab('jobs')} className="px-4 py-2 bg-white text-[#DC2626] font-bold text-xs rounded-xl shadow hover:scale-105 transition-transform">
                      Start Working
                    </button>
                  </div>
                  <div className="w-24 h-24 opacity-20 absolute right-2 bottom-2 z-0">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                </div>
              </div>

              {/* STATS COUNT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase">Total Jobs</span>
                    <span className="text-2xl font-black text-gray-900">2</span>
                    <span className="block text-xs text-emerald-500 font-medium mt-1">Available to work</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase">Total Earnings</span>
                    <div className="flex items-center gap-0.5 text-2xl font-black text-gray-900">
                      <TakaIcon className="w-5 h-5 text-gray-400" />
                      <span>0</span>
                    </div>
                    <span className="block text-xs text-red-400 font-medium mt-1">Keep working!</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase">Total Referrals</span>
                    <span className="text-2xl font-black text-gray-900">0</span>
                    <span className="block text-xs text-gray-400 font-medium mt-1">Invite and earn more</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                </div>
              </div>

              {/* JOBS SECTION INSIDE DASHBOARD */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
                  <div className="p-2 bg-red-50 rounded-xl text-[#DC2626]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Available Jobs</h3>
                    <p className="text-xs text-gray-400">Complete the tasks below and earn rewards.</p>
                  </div>
                </div>

                {/* Job Items List Wrapper */}
                <div className="space-y-4">
                  {/* Job 1 */}
                  <div className="border border-gray-100 rounded-2xl p-5 hover:border-red-100 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#DC2626] shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Like and share the BDzoon Facebook page.</h4>
                        <div className="flex items-center gap-1 text-[#DC2626] font-black text-sm mt-1">
                          <span>Reward:</span>
                          <TakaIcon className="w-4 h-4" />
                          <span>5</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                      <a href="https://www.facebook.com/BDzoon.official" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors inline-flex items-center gap-1">
                        Click here to work
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                      <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1.5 bg-gray-50 max-w-[200px]">
                        <input type="file" id="proof1" className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer w-full" />
                      </div>
                      <button className="px-4 py-2 bg-white border border-[#DC2626] text-[#DC2626] font-bold text-xs rounded-xl hover:bg-red-50 transition-colors">
                        Submit Proof
                      </button>
                    </div>
                  </div>

                  {/* Job 2 */}
                  <div className="border border-gray-100 rounded-2xl p-5 hover:border-red-100 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#DC2626] shrink-0">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Visit the BDzoon website and take a screenshot.</h4>
                        <div className="flex items-center gap-1 text-[#DC2626] font-black text-sm mt-1">
                          <span>Reward:</span>
                          <TakaIcon className="w-4 h-4" />
                          <span>10</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                      <a href="https://www.bdzoon.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm transition-colors inline-flex items-center gap-1">
                        Click here to work
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                      <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1.5 bg-gray-50 max-w-[200px]">
                        <input type="file" id="proof2" className="text-xs text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer w-full" />
                      </div>
                      <button className="px-4 py-2 bg-white border border-[#DC2626] text-[#DC2626] font-bold text-xs rounded-xl hover:bg-red-50 transition-colors">
                        Submit Proof
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: SEPARATE AVAILABLE JOBS LIST (IF CLICKED FROM SIDEBAR) */}
          {activeTab === 'jobs' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Active Missions</h3>
              {/* [Same list as above can render or a dedicated panel] */}
              <p className="text-sm text-gray-500 mb-4">Please look at the core Dashboard overview tab to find and execute current tasks instantly.</p>
              <button onClick={() => setActiveTab('dashboard')} className="px-4 py-2 bg-[#DC2626] text-white text-xs font-bold rounded-xl shadow">Go to Dashboard</button>
            </div>
          )}

          {/* TAB 3: SUBMISSIONS HISTORY */}
          {activeTab === 'submissions' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">My Task Submissions</h3>
              <p className="text-xs text-gray-400 mb-4">Log entries of verification snapshots transferred for approval.</p>
              <div className="text-center py-12 border border-dashed border-gray-200 rounded-2xl">
                <p className="text-sm text-gray-400 font-medium">No previous proof submissions detected.</p>
              </div>
            </div>
          )}

          {/* TAB 4: SECURE USER PROFILE CONFIGURATION */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm max-w-xl">
              <div className="border-b border-gray-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-gray-900">Personal Identity & Access Management</h3>
                <p className="text-xs text-gray-400">Regular users can adjust profile criteria. Admin systems remain entirely out-of-bounds.</p>
              </div>

              {!isEditing ? (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Full Name</span>
                    <p className="text-sm font-semibold text-gray-800">{userProfile.fullName}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Username / Phone Identifier</span>
                    <p className="text-sm font-semibold text-gray-800">{userProfile.phone}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">Passkey Protection</span>
                    <p className="text-sm font-semibold text-gray-800">{userProfile.password}</p>
                  </div>
                  
                  {/* Warning Note indicating secure scope limits */}
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2 text-[11px] text-amber-700">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span><strong>Security Protocol Active:</strong> Modifications affect user context fields only. System Core SuperAdmin parameters remain fully isolated from lower privilege modifications.</span>
                  </div>

                  <button 
                    onClick={() => {
                      setEditName(userProfile.fullName);
                      setEditPhone(userProfile.phone);
                      setIsEditing(true);
                    }}
                    className="w-full py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow transition-colors"
                  >
                    Edit Profile Credentials
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Username / Mobile Number</label>
                    <input 
                      type="text" 
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">New Password (Leave blank to keep unchanged)</label>
                    <input 
                      type="password" 
                      placeholder="Enter new passkey security structure"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#DC2626] text-sm"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer className="h-14 border-t border-gray-100 bg-white px-6 flex items-center justify-center text-xs text-gray-400">
          &copy; 2026 BDZOON. All rights reserved.
        </footer>

      </div>
    </div>
  );
}
