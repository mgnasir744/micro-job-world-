import React, { useState } from 'react';

export default function Dashboard() {
  // ১. নেভিগেশন স্টেট
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // ইউজার ডাটা স্টেট (৬ নম্বর রিকোয়ারমেন্টের জন্য)
  const [userData, setUserData] = useState({
    name: 'Nasir Rahman Talukder',
    mobile: '+9687005282',
    balance: 0,
    totalJobs: 2,
    totalEarnings: 0,
    totalReferrals: 0
  });

  // ২. মডাল ওপেন/ক্লোজ স্টেট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: userData.name,
    mobile: userData.mobile,
    username: 'nasir98',
    password: ''
  });

  // ৩. ফাইল আপলোড স্টেট (টাস্ক ওয়াইজ)
  const [taskFiles, setTaskFiles] = useState({ task1: null, task2: null });
  const [copyText, setCopyText] = useState('Copy Link');

  // ৪. রেফারেল লিংক কপি হ্যান্ডলার
  const handleCopyLink = () => {
    const referralUrl = `https://micro-job-world.vercel.app/?ref=${userData.mobile}`;
    navigator.clipboard.writeText(referralUrl);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy Link'), 2000);
  };

  // ৫. স্টার্ট ওয়ার্কিং স্ক্রোল হ্যান্ডলার
  const scrollToJobs = () => {
    const jobsSection = document.getElementById('available-jobs-section');
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ৬. প্রুফ সাবমিট হ্যান্ডলার
  const handleFileChange = (taskKey, e) => {
    if (e.target.files && e.target.files[0]) {
      setTaskFiles({ ...taskFiles, [taskKey]: e.target.files[0] });
    }
  };

  const handleSubmitProof = (taskKey, taskName) => {
    if (!taskFiles[taskKey]) {
      alert('দয়া করে প্রথমে একটি স্ক্রিনশট ফাইল সিলেক্ট করুন।');
      return;
    }
    alert(`Proof Submitted Successfully for: "${taskName}"!`);
    // সাবমিট শেষে ফাইল ক্লিয়ার করার স্টেট
    setTaskFiles({ ...taskFiles, [taskKey]: null });
  };

  // ৭. প্রোফাইল আপডেট হ্যান্ডলার
  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      name: profileForm.name,
      mobile: profileForm.mobile
    });
    setIsModalOpen(false);
    alert('Profile updated successfully!');
  };

  // ৮. লগআউট হ্যান্ডলার
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      alert('Logged out successfully!');
      // এখানে সেশন বা রিডাইরেক্ট লজিক বসাতে পারো
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* বাম পাশের নেভিগেশন মেনু (Sidebar Menu) */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-100 p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* ব্র্যান্ড লোগো */}
          <div className="mb-6 px-2">
            <h1 className="text-xl font-bold text-[#DC2626] tracking-tight">BDZOON</h1>
            <p className="text-[10px] text-slate-400 -mt-1">Micro Job World</p>
          </div>

          {/* মেনু আইটেমসমূহ */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveSection('dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === 'dashboard' ? 'bg-[#DC2626] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"/></svg>
              <span>Dashboard</span>
            </button>

            <button 
              onClick={() => { setActiveSection('jobs'); setTimeout(scrollToJobs, 100); }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === 'jobs' ? 'bg-[#DC2626] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span>Available Jobs</span>
            </button>

            <button 
              onClick={() => setActiveSection('submissions')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === 'submissions' ? 'bg-[#DC2626] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              <span>My Submissions</span>
            </button>

            <button 
              onClick={() => setActiveSection('referrals')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${activeSection === 'referrals' ? 'bg-[#DC2626] text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
              <span>Referrals</span>
            </button>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Profile Settings</span>
            </button>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* রেফারেল উইজেট বক্স */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="bg-[#DC2626] text-white p-3.5 rounded-xl space-y-2.5 text-center shadow-sm">
            <p className="text-[10px] uppercase font-bold tracking-wider opacity-90">Your Referral Link</p>
            <div className="bg-black/10 p-2 rounded text-[10px] break-all select-all font-mono">
              {`https://micro-job-world.vercel.app/?ref=${userData.mobile}`}
            </div>
            <button 
              onClick={handleCopyLink}
              className="w-full bg-white text-[#DC2626] text-xs font-bold py-2 rounded-lg transition hover:bg-slate-50 active:scale-95"
            >
              {copyText}
            </button>
          </div>
          
          <div className="bg-red-50/60 border border-red-100/50 rounded-xl p-3 mt-3 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Share & Earn More</p>
            <p className="text-[9px] text-slate-400 mt-0.5">Share your link and earn ৳5 - ৳10 per task!</p>
            <div className="flex justify-center space-x-2 mt-2">
              <span className="w-5 h-5 bg-white border border-slate-200 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-50">f</span>
              <span className="w-5 h-5 bg-white border border-slate-200 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-50">t</span>
              <span className="w-5 h-5 bg-white border border-slate-200 text-slate-500 rounded-full flex items-center justify-center text-[10px] font-bold cursor-pointer hover:bg-slate-50">w</span>
            </div>
          </div>
        </div>
      </aside>

      {/* মূল কন্টেন্ট উইন্ডো */}
      <main className="flex-1 p-4 md:p-6 space-y-6 max-w-5xl mx-auto w-full">
        
        {/* টপ বার (হেডার এবং ইউজার কার্ড) */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              Welcome, <span className="text-[#DC2626]">{userData.mobile}</span> !
            </h2>
          </div>
          
          {/* ইউজার আইডেন্টিটি চিপ */}
          <div onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-slate-100/70 transition">
            <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-[#DC2626]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 leading-tight">{userData.name}</p>
              <p className="text-[9px] text-slate-400">User</p>
            </div>
          </div>
        </div>

        {/* ব্যালেন্স এবং কুইক একশন কার্ড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* ব্যালেন্স উইজেট */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between col-span-1">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Your Balance</p>
              <p className="text-3xl font-black text-slate-900 mt-1 flex items-center">
                <span className="text-xl font-medium text-slate-700 mr-1">৳</span>{userData.balance}
              </p>
              <button 
                onClick={handleLogout} 
                className="mt-3 bg-[#DC2626] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-[#DC2626]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
            </div>
          </div>

          {/* বড় ব্যানার - কমপ্লিট মাইক্রো জবস */}
          <div className="bg-[#DC2626] text-white p-5 rounded-2xl shadow-md flex items-center justify-between col-span-1 md:col-span-2 relative overflow-hidden">
            <div className="z-10 max-w-[70%]">
              <h3 className="text-lg font-black tracking-tight">Complete Micro Jobs</h3>
              <p className="text-xs font-medium opacity-90 mt-0.5">Earn Money Easily</p>
              <p className="text-[10px] opacity-75 mt-2">Simple tasks, instant rewards.</p>
            </div>
            <button 
              onClick={scrollToJobs}
              className="z-10 bg-white text-[#DC2626] text-xs font-black px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition active:scale-95 whitespace-nowrap"
            >
              Start Working
            </button>
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-black/10 rounded-full blur-xl"></div>
          </div>
        </div>

        {/* অ্যাভেলেবল জবস সেকশন */}
        <section id="available-jobs-section" className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-2 border-b border-slate-50">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-[#DC2626]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Available Jobs</h3>
              <p className="text-[10px] text-slate-400">Complete the tasks below and earn rewards.</p>
            </div>
          </div>

          {/* জব লিস্ট টাস্ক - ১ */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-[#DC2626] font-bold text-xs shrink-0 mt-0.5">f</div>
              <div>
                <h4 className="text-xs font-bold text-slate-700">Like and share the BDzoon Facebook page.</h4>
                <p className="text-[10px] font-bold text-[#DC2626] mt-0.5">Reward: ৳ 5</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#DC2626] text-white text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-red-700 transition text-center"
              >
                Click here to work →
              </a>
              <div className="flex items-center border border-slate-200 bg-white rounded-lg p-1 max-w-[180px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange('task1', e)}
                  className="text-[10px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>
              <button 
                onClick={() => handleSubmitProof('task1', 'Like and share the BDzoon Facebook page')}
                className="border border-[#DC2626] text-[#DC2626] bg-white text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Submit Proof
              </button>
            </div>
          </div>

          {/* জব লিস্ট টাস্ক - ২ */}
          <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center text-[#DC2626] shrink-0 mt-0.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700">Visit the BDzoon website and take a screenshot.</h4>
                <p className="text-[10px] font-bold text-[#DC2626] mt-0.5">Reward: ৳ 10</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#DC2626] text-white text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-red-700 transition text-center"
              >
                Click here to work →
              </a>
              <div className="flex items-center border border-slate-200 bg-white rounded-lg p-1 max-w-[180px]">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange('task2', e)}
                  className="text-[10px] w-full text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>
              <button 
                onClick={() => handleSubmitProof('task2', 'Visit the BDzoon website and take a screenshot')}
                className="border border-[#DC2626] text-[#DC2626] bg-white text-[11px] font-bold px-3 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Submit Proof
              </button>
            </div>
          </div>
        </section>

        {/* বটম মেটেরিয়াল গ্রিড (স্ট্যাটাস বক্সসমূহ) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center space-x-3 shadow-sm">
            <div className="w-7 h-7 bg-red-50 text-[#DC2626] rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Total Jobs</p>
              <p className="text-xs font-black text-slate-700">{userData.totalJobs} Available to work</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center space-x-3 shadow-sm">
            <div className="w-7 h-7 bg-red-50 text-[#DC2626] rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Total Earnings</p>
              <p className="text-xs font-black text-slate-700">৳ {userData.totalEarnings} Keep working!</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-3.5 rounded-xl flex items-center space-x-3 shadow-sm">
            <div className="w-7 h-7 bg-red-50 text-[#DC2626] rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Total Referrals</p>
              <p className="text-xs font-black text-slate-700">{userData.totalReferrals} Invite and earn more</p>
            </div>
          </div>
        </div>

        {/* এডিট প্রোফাইল কুইক উইজেট */}
        <div className="bg-white border border-slate-100 p-5 rounded-xl shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Edit Profile Settings</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#DC2626] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition shadow-sm"
          >
            Edit Profile Details
          </button>
        </div>

        {/* ফুটার */}
        <footer className="text-center text-[10px] text-slate-400 pt-4">
          © 2026 BDZOON. All rights reserved.
        </footer>
      </main>

      {/* ৬. প্রোফাইল পপআপ মডাল (Popup Modal Form) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-[#DC2626] p-4 text-white flex justify-between items-center">
              <h3 className="text-base font-bold">Edit Profile Details</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/80 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleProfileSave} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#DC2626]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number</label>
                <input 
                  type="text" 
                  required
                  value={profileForm.mobile}
                  onChange={(e) => setProfileForm({...profileForm, mobile: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#DC2626]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Username ID</label>
                <input 
                  type="text" 
                  required
                  value={profileForm.username}
                  onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-slate-50 text-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={profileForm.password}
                  onChange={(e) => setProfileForm({...profileForm, password: e.target.value})}
                  className="w-full border border-slate-200 rounded-lg p-2 text-sm focus:outline-none focus:border-[#DC2626]"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 border border-slate-200 text-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-1/2 bg-[#DC2626] text-white py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition"
                >
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
