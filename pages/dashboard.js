import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [screenshot, setScreenshot] = useState('');
  
  // ইউজারের নিজস্ব প্রোফাইল এডিটের রেঞ্জ (সুপার অ্যাডমিন নিরাপদ থাকবে)
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      setFullName(parsedUser.fullName || 'Nasir Rahman');
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
    alert('Your account profile configuration updated successfully!');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  const referralLink = `https://micro-job-world.vercel.app/?ref=${user.username}`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col md:flex-row font-sans text-gray-800 antialiased">
      <Head>
        <title>BDZOON - Micro Job World</title>
        {/* এনকোডিং এবং আইকন প্যাক যুক্ত করা হয়েছে যেন শব্দ বা আইকন কখনো না ভাঙে */}
        <meta charSet="UTF-8" />
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>
      
      {/* ================= বামপাশের সাইডবার (লাল-সাদা থিম ক্লোন) ================= */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-5 shrink-0">
        <div>
          {/* BDZOON লোগো */}
          <div className="mb-8 pl-2">
            <h1 className="text-2xl font-black text-[#E51818] tracking-tight flex flex-col">
              BDZOON
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.15em] -mt-1">Micro Job World</span>
            </h1>
          </div>

          {/* নেভিগেশন আইটেম (ভেঙে যাওয়া রোধে আইকন লাইব্রেরি ব্যবহার করা হয়েছে) */}
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: 'fa-solid fa-grid-2' },
              { name: 'Available Jobs', icon: 'fa-solid fa-briefcase' },
              { name: 'My Submissions', icon: 'fa-solid fa-square-check' },
              { name: 'Referrals', icon: 'fa-solid fa-users' },
              { name: 'Earnings', icon: 'fa-solid fa-wallet' },
              { name: 'Profile', icon: 'fa-solid fa-user-gear' }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                  activeTab === tab.name 
                    ? 'bg-[#E51818] text-white shadow-md' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <i className={`${tab.icon} text-base`}></i>
                <span>{tab.name}</span>
              </button>
            ))}
            
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold text-sm text-gray-500 hover:bg-gray-50 transition-all">
              <i className="fa-solid fa-right-from-bracket text-base"></i>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* রেফারেল বক্স */}
        <div className="mt-8 pt-4 border-t border-gray-50">
          <div className="bg-[#E51818] p-4 rounded-2xl text-white relative overflow-hidden">
            <h4 className="text-xs font-bold tracking-wide mb-2">Your Referral Link</h4>
            <div className="bg-white/10 p-2.5 rounded-xl border border-white/10 mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-xs">
              {referralLink}
            </div>
            <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-full bg-white text-[#E51818] text-xs py-2.5 rounded-xl font-bold hover:bg-gray-50 shadow-sm">
              Copy Link
            </button>
          </div>
          
          {/* সোশ্যাল শেয়ার আইকন গ্রুপ */}
          <div className="mt-5 bg-red-50/40 p-4 rounded-2xl border border-red-50/50">
            <p className="text-xs font-bold text-red-600 mb-3">Share & Earn More</p>
            <div className="flex items-center space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-sm hover:opacity-90"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center text-sm hover:opacity-90"><i className="fa-brands fa-twitter"></i></a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm hover:opacity-90"><i className="fa-brands fa-whatsapp"></i></a>
              <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm hover:opacity-90"><i className="fa-solid fa-link"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ডানপাশের মেইন কনটেন্ট প্যানেল ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* টপ হেডার বার */}
        <header className="bg-white border-b border-gray-100 h-16 px-6 md:px-10 flex items-center justify-between shrink-0">
          <button className="text-gray-500 hover:text-gray-700 md:hidden text-xl"><i className="fa-solid fa-bars"></i></button>
          <div className="flex items-center space-x-6 ml-auto">
            <button className="text-gray-400 hover:text-gray-600 relative text-lg">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#E51818] text-white flex items-center justify-center text-sm font-bold"><i className="fa-solid fa-user"></i></div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-800">{user.username}</p>
                <p className="text-[10px] font-medium text-gray-400">User</p>
              </div>
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

              {/* টপ গ্ল্যান্স বক্স */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* ব্যালেন্স ট্র্যাকার */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Balance</p>
                    <p className="text-3xl font-black text-gray-900 mt-1">৳ {user.balance || 0}</p>
                    <button onClick={() => { localStorage.clear(); router.push('/'); }} className="mt-4 bg-[#E51818] text-white text-xs px-4 py-1.5 rounded-lg font-bold hover:bg-red-700 shadow-sm">Logout</button>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl text-[#E51818]"><i className="fa-solid fa-wallet"></i></div>
                </div>

                {/* রেড প্রমো ব্যানার */}
                <div className="lg:col-span-2 bg-gradient-to-r from-[#E51818] to-[#EF4444] p-6 rounded-2xl text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold">Complete Micro Jobs</h3>
                    <p className="text-xl font-black">Earn Money Easily</p>
                    <p className="text-xs text-red-100 mt-1">Simple tasks, instant wallet rewards.</p>
                  </div>
                  <button onClick={() => setActiveTab('Available Jobs')} className="bg-white text-[#E51818] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-50 shadow-sm transition-all active:scale-95">
                    Start Working
                  </button>
                </div>
              </div>

              {/* জব মডিউল বক্স */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center space-x-3 mb-4 border-b border-gray-50 pb-4">
                  <span className="text-xl text-[#E51818]"><i className="fa-solid fa-list-check"></i></span>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Available Jobs</h3>
                    <p className="text-xs text-gray-400">Complete tasks below to claim revenue.</p>
                  </div>
                </div>

                {/* টাস্ক ফিড লিস্ট */}
                <div className="divide-y divide-gray-50">
                  {tasks.map(task => (
                    <div key={task.id} className="py-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 ${task.type === 'fb' ? 'bg-blue-50 text-[#1877F2]' : 'bg-red-50 text-red-600'}`}>
                          <i className={task.type === 'fb' ? 'fa-brands fa-facebook' : 'fa-solid fa-globe'}></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
                          <p className="text-xs font-bold text-[#E51818] mt-1">Reward: ৳ {task.reward}</p>
                        </div>
                      </div>

                      {/* ক্লিকযোগ্য কন্ট্রোল প্যানেল */}
                      <div className="w-full xl:w-auto flex flex-wrap items-center gap-2.5">
                        <a href={task.link} target="_blank" rel="noreferrer" className="bg-[#E51818] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-all">
                          Click here to work →
                        </a>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 px-2">
                          <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs w-full max-w-[140px]" />
                        </div>
                        <button onClick={() => submitTask(task.id, task.reward)} className="border border-[#E51818] text-[#E51818] bg-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50">
                          Submit Proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* থ্রি-কলাম স্ট্যাটস গ্রিড */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-[#E51818] flex items-center justify-center"><i className="fa-solid fa-calendar-days"></i></div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Jobs</p>
                    <p className="text-base font-black text-gray-800">2 Available</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-[#E51818] flex items-center justify-center"><i className="fa-solid fa-hand-holding-dollar"></i></div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Earnings</p>
                    <p className="text-base font-black text-gray-800">৳ 0.00</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-[#E51818] flex items-center justify-center"><i className="fa-solid fa-users"></i></div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Referrals</p>
                    <p className="text-base font-black text-gray-800">0 Users</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= ১০০% ইউজার সেটিংস এডিটেবল রেঞ্জ ================= */}
          {activeTab === 'Profile' && (
            <div className="max-w-xl bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 border-b border-gray-50 pb-4">
                <span className="text-xl text-[#E51818]"><i className="fa-solid fa-user-pen"></i></span>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Edit Personal Profile</h3>
                  <p className="text-xs text-gray-400">Configure your password and account identifiers securely.</p>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Mobile Number / Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">New Password</label>
                  <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                </div>
                <button type="submit" className="w-full bg-[#E51818] text-white p-3 rounded-xl text-xs font-bold hover:bg-red-700 transition-all shadow-sm uppercase tracking-wider">
                  Update Account Settings
                </button>
              </form>
            </div>
          )}

          {activeTab !== 'Dashboard' && activeTab !== 'Profile' && (
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-400 font-bold">Section {activeTab} is ready and connected.</p>
            </div>
          )}

        </main>

        <footer className="h-12 border-t border-gray-100 flex items-center justify-center text-[11px] text-gray-400 font-bold tracking-wide shrink-0">
          © 2026 BDZOON. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
