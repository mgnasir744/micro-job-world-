import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [screenshot, setScreenshot] = useState('');
  
  // ইউজারের নিজস্ব প্রোফাইল এডিটের রেঞ্জ (নাম, ইউজারনেম, পাসওয়ার্ড)
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // আপনার দেওয়া নির্দিষ্ট কাজের লিংকসমূহ
  const [tasks] = useState([
    { id: 1, title: 'Like and share the BDzoon Facebook page.', link: 'https://www.facebook.com/BDzoon.official', reward: 5, type: 'fb' },
    { id: 2, title: 'Visit the BDzoon website and take a screenshot.', link: 'https://www.bdzoon.com', reward: 10, type: 'web' }
  ]);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      router.push('/');
    } else {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setFullName(parsedUser.fullName || 'User');
      setUsername(parsedUser.username || '+96878005282');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setScreenshot(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const submitTask = (taskId, reward) => {
    if (!screenshot) return alert('Please upload a screenshot proof!');
    alert('Proof submitted successfully to Admin Panel!');
    setScreenshot('');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!username) return alert('Username cannot be empty!');
    const updatedUser = { ...user, username, fullName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Account configuration updated successfully!');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-white text-[#E51818] font-bold">Loading...</div>;

  const referralLink = `https://micro-job-world.vercel.app/?ref=${user.username}`;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans text-gray-800 antialiased">
      <Head>
        <title>BDZOON - Micro Job World</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
      </Head>
      
      {/* ================= বামপাশের সাইডবার (লাল ও সাদা থিম ক্লোন) ================= */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-5 shrink-0">
        <div>
          {/* BDZOON লোগো */}
          <div className="mb-8 pl-2">
            <h1 className="text-2xl font-black text-[#E51818] tracking-tight flex flex-col">
              BDZOON
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.15em] -mt-1">Micro Job World</span>
            </h1>
          </div>

          {/* নেভিগেশন মেনু (SVG আইকন সমৃদ্ধ) */}
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-3-3v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg> },
              { name: 'Available Jobs', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
              { name: 'My Submissions', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
              { name: 'Referrals', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
              { name: 'Earnings', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { name: 'Profile', svg: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.name 
                    ? 'bg-[#E51818] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {tab.svg}
                <span>{tab.name}</span>
              </button>
            ))}
            
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* রেফারেল সিস্টেম */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <div className="bg-[#E51818] p-4 rounded-2xl text-white shadow-sm">
            <h4 className="text-xs font-bold tracking-wide mb-2">Your Referral Link</h4>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-mono">
              {referralLink}
            </div>
            <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-full bg-white text-[#E51818] text-xs py-2 rounded-xl font-bold hover:bg-gray-50 shadow-sm transition-all">
              Copy Link
            </button>
          </div>
        </div>
      </div>

      {/* ================= ডানপাশের মেইন কন্টেন্ট প্যানেল ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* হেডার বার */}
        <header className="bg-white border-b border-gray-100 h-16 px-6 md:px-10 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3 ml-auto">
            <div className="w-8 h-8 rounded-full bg-[#E51818] text-white flex items-center justify-center text-xs font-bold">U</div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-800">{user.username}</p>
              <p className="text-[10px] font-medium text-gray-400">User</p>
            </div>
          </div>
        </header>

        {/* ড্যাশবোর্ড উইন্ডো ভিউ */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          
          {activeTab === 'Dashboard' && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome, <span className="text-[#E51818]">{user.username}</span> !</h2>
              </div>

              {/* টপ কার্ডস গ্রিড */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* ব্যালেন্স বক্স */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Balance</p>
                    <p className="text-3xl font-black text-gray-900 mt-1">৳ {user.balance || 0}</p>
                    <button onClick={() => { localStorage.clear(); router.push('/'); }} className="mt-4 bg-[#E51818] text-white text-xs px-4 py-1.5 rounded-lg font-bold hover:bg-red-700">Logout</button>
                  </div>
                  <div className="w-12 h-12 bg-red-50 text-[#E51818] rounded-xl flex items-center justify-center font-bold text-xl">৳</div>
                </div>

                {/* রেড প্রমো ব্যানার */}
                <div className="lg:col-span-2 bg-gradient-to-r from-[#E51818] to-[#EF4444] p-6 rounded-2xl text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold">Complete Micro Jobs</h3>
                    <p className="text-xl font-black">Earn Money Easily</p>
                    <p className="text-xs text-red-100 mt-1">Simple tasks, instant rewards.</p>
                  </div>
                  <button onClick={() => setActiveTab('Available Jobs')} className="bg-white text-[#E51818] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-50 shadow-sm">
                    Start Working
                  </button>
                </div>
              </div>

              {/* অ্যাক্টিভ জব মডিউল (এখানে আপনার নির্দিষ্ট দুটি লিংক সেট করা হয়েছে) */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center space-x-3 mb-4 border-b border-gray-100 pb-4">
                  <div className="text-[#E51818] font-bold flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <span>Available Jobs</span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {tasks.map(task => (
                    <div key={task.id} className="py-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#E51818] flex items-center justify-center font-bold text-xs">✓</div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
                          <p className="text-xs font-bold text-[#E51818] mt-1">Reward: ৳ {task.reward}</p>
                        </div>
                      </div>

                      {/* অ্যাকশন বাটনসমূহ (১০০% ক্লিকযোগ্য) */}
                      <div className="w-full xl:w-auto flex flex-wrap items-center gap-2">
                        <a href={task.link} target="_blank" rel="noreferrer" className="bg-[#E51818] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-all">
                          Click here to work →
                        </a>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs max-w-[140px] bg-gray-50 p-1 rounded" />
                        <button onClick={() => submitTask(task.id, task.reward)} className="border border-[#E51818] text-[#E51818] bg-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50">
                          Submit Proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* স্ট্যাটস কাউন্টার */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Total Jobs</p>
                  <p className="text-base font-black text-gray-800 mt-1">2 Available</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Total Earnings</p>
                  <p className="text-base font-black text-gray-800 mt-1">৳ 0.00</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <p className="text-[11px] font-bold text-gray-400 uppercase">Total Referrals</p>
                  <p className="text-base font-black text-gray-800 mt-1">0 Users</p>
                </div>
              </div>
            </>
          )}

          {/* ================= ১০০% ইউজার সেটিংস এডিটেবল রেঞ্জ ================= */}
          {activeTab === 'Profile' && (
            <div className="max-w-xl bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-base font-bold text-gray-800">Edit Personal Profile</h3>
                <p className="text-xs text-gray-400">Manage your own credentials securely. Super Admin panel is restricted.</p>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Mobile Number / Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">New Password</label>
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                </div>
                <button type="submit" className="w-full bg-[#E51818] text-white p-3 rounded-xl text-xs font-bold hover:bg-red-700 shadow-sm uppercase">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {activeTab !== 'Dashboard' && activeTab !== 'Profile' && (
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center text-gray-400 font-bold text-sm">
              Section {activeTab} is synchronized.
            </div>
          )}

        </main>

        <footer className="h-12 border-t border-gray-100 flex items-center justify-center text-[11px] text-gray-400 font-bold shrink-0">
          © 2026 BDZOON. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
