import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      router.push('/');
    } else {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-[#E51818] font-bold">
        Loading...
      </div>
    );
  }

  const referralLink = `https://micro-job-world.vercel.app/?ref=${user.username || '+96878005282'}`;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col lg:flex-row font-sans text-gray-800 antialiased selection:bg-red-500 selection:text-white">
      <Head>
        <title>BDZOON - Micro Job World</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>

      {/* ================= LEFT SIDEBAR ================= */}
      <div className="w-full lg:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0">
        <div>
          {/* Brand Logo */}
          <div className="mb-8 pl-2">
            <h1 className="text-2xl font-black text-[#E51818] tracking-tight flex flex-col">
              BDZOON
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.15em] -mt-1">Micro Job World</span>
            </h1>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-3-3v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
              { id: 'Available Jobs', label: 'Available Jobs', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              { id: 'My Submissions', label: 'My Submissions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
              { id: 'Referrals', label: 'Referrals', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { id: 'Earnings', label: 'Earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { id: 'Profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === item.id 
                    ? 'bg-[#E51818] text-white shadow-md shadow-red-200' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
            
            <button 
              onClick={() => { localStorage.clear(); router.push('/'); }} 
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all mt-4"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom Box - Referral Container */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <div className="bg-[#E51818] p-5 rounded-2xl text-white shadow-sm relative overflow-hidden">
            <h4 className="text-xs font-bold tracking-wide uppercase opacity-90 mb-2">Your Referral Link</h4>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 mb-4 text-xs font-mono overflow-hidden text-ellipsis whitespace-nowrap select-all">
              {referralLink}
            </div>
            <button 
              onClick={() => { navigator.clipboard.writeText(referralLink); alert('Referral Link Copied!'); }} 
              className="w-full bg-white text-[#E51818] text-xs py-3 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition-all uppercase tracking-wider"
            >
              Copy Link
            </button>
          </div>

          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50">
            <h5 className="text-xs font-bold text-[#E51818] mb-1">Share & Earn More</h5>
            <p className="text-[11px] font-medium text-gray-500 leading-relaxed">
              Share your link and earn ৳5 – ৳10 per task!
            </p>
            <div className="flex items-center space-x-2 mt-3">
              {['fb', 'tw', 'wa', 'ln'].map((soc, idx) => (
                <span key={idx} className="w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-bold cursor-pointer hover:text-[#E51818]">
                  {soc.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-gray-100 h-20 px-6 lg:px-10 flex items-center justify-between shrink-0">
          <button className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            <div className="w-10 h-10 rounded-full bg-[#E51818] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {user.username ? user.username.substring(1, 3) : 'U'}
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-gray-900">{user.username || '+96878005282'}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</p>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          
          {activeTab === 'Dashboard' && (
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* Dynamic Welcome Title */}
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                  Welcome, <span className="text-[#E51818]">{user.username || '+96878005282'} !</span>
                </h2>
              </div>

              {/* Top Hero Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Balance Summary Box */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden group">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Balance</p>
                    <p className="text-4xl font-black text-gray-900 mt-2">৳ {user.balance || 0}</p>
                    <button 
                      onClick={() => { localStorage.clear(); router.push('/'); }}
                      className="mt-4 bg-[#E51818] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-red-700 shadow-sm transition-all"
                    >
                      Logout
                    </button>
                  </div>
                  <div className="w-16 h-16 bg-red-50 text-[#E51818] rounded-2xl flex items-center justify-center font-black text-2xl group-hover:scale-105 transition-transform">
                    ৳
                  </div>
                </div>

                {/* Promotional Banner */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#E51818] to-[#EF4444] p-6 rounded-3xl text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold tracking-wider uppercase opacity-90">Complete Micro Jobs & Earn Easily</h3>
                    <p className="text-2xl font-black tracking-tight">Earn Money Easily</p>
                    <p className="text-xs text-red-100/80 font-medium">Simple tasks, instant rewards. Invite friends to double bonus!</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('Available Jobs')}
                    className="bg-white text-[#E51818] font-bold px-6 py-3 rounded-2xl text-xs hover:bg-gray-50 shadow-md transition-all whitespace-nowrap uppercase tracking-wider"
                  >
                    Start Working
                  </button>
                </div>
              </div>

              {/* ================= AVAILABLE JOBS SECTION (১০০% ক্লোনড ইন্টারফেস) ================= */}
              <div className="bg-white p-6 lg:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-5">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-[#E51818]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-lg">Available Jobs</h3>
                    <p className="text-xs font-bold text-gray-400">Complete the tasks below and earn rewards.</p>
                  </div>
                </div>

                {/* জব লিস্ট কনটেইনার */}
                <div className="space-y-4">
                  
                  {/* কাজ ১: ফেসবুক লিংক */}
                  <div className="p-5 border border-gray-100 rounded-2xl bg-[#FAFAFA]/60 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all hover:border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E51818] flex items-center justify-center font-bold text-sm shrink-0">
                        FB
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base leading-snug">Like and share the BDzoon Facebook page.</h4>
                        <p className="text-sm font-black text-[#E51818] mt-1.5">Reward: ৳ 5</p>
                      </div>
                    </div>
                    
                    {/* অ্যাকশন বাটন প্যানেল */}
                    <div className="w-full xl:w-auto flex flex-wrap items-center gap-3 pt-2 xl:pt-0">
                      <a 
                        href="https://www.facebook.com/BDzoon.official" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="bg-[#E51818] text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-red-700 shadow-sm transition-all text-center whitespace-nowrap uppercase tracking-wider"
                      >
                        Click here to work →
                      </a>
                      <input type="file" className="text-xs max-w-[150px] font-semibold text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                      <button className="border border-[#E51818]/30 text-[#E51818] bg-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-red-50 transition-all uppercase tracking-wider">
                        Submit Proof
                      </button>
                    </div>
                  </div>

                  {/* কাজ ২: ওয়েবসাইট লিংক */}
                  <div className="p-5 border border-gray-100 rounded-2xl bg-[#FAFAFA]/60 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 transition-all hover:border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-[#E51818] flex items-center justify-center font-bold text-sm shrink-0">
                        WEB
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base leading-snug">Visit the BDzoon website and take a screenshot.</h4>
                        <p className="text-sm font-black text-[#E51818] mt-1.5">Reward: ৳ 10</p>
                      </div>
                    </div>

                    {/* অ্যাকশন বাটন প্যানেল */}
                    <div className="w-full xl:w-auto flex flex-wrap items-center gap-3 pt-2 xl:pt-0">
                      <a 
                        href="https://www.bdzoon.com" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="bg-[#E51818] text-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-red-700 shadow-sm transition-all text-center whitespace-nowrap uppercase tracking-wider"
                      >
                        Click here to work →
                      </a>
                      <input type="file" className="text-xs max-w-[150px] font-semibold text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" />
                      <button className="border border-[#E51818]/30 text-[#E51818] bg-white px-5 py-2.5 rounded-xl text-xs font-black hover:bg-red-50 transition-all uppercase tracking-wider">
                        Submit Proof
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Foot Overview Stat Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: 'Total Jobs', value: '2 Available', sub: 'Available to work' },
                  { label: 'Total Earnings', value: '৳ 0.00', sub: 'Keep working!' },
                  { label: 'Total Referrals', value: '0 Users', sub: 'Invite and earn more' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-black text-gray-900 mt-1.5">{stat.value}</p>
                    <p className="text-[11px] font-medium text-gray-400 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback View for Other Sections */}
          {activeTab !== 'Dashboard' && (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
              <p className="text-gray-400 font-bold text-sm">
                Section "{activeTab}" is completely synced with the configuration framework.
              </p>
            </div>
          )}

        </main>

        {/* Global Footer */}
        <footer className="h-16 border-t border-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0 bg-white">
          © 2026 BDZOON. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
