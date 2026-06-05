import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [screenshot, setScreenshot] = useState('');
  
  // à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦à¦¡à¦¿à¦Ÿ à¦•à¦°à¦¾à¦° à¦¸à§à¦Ÿà§‡à¦Ÿ
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [tasks, setTasks] = useState([
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
      setUsername(parsedUser.username || '');
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setScreenshot(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const submitTask = async (taskId, reward) => {
    if (!screenshot) return alert('Please upload a screenshot proof!');
    
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, taskId, screenshot, reward })
    });

    if (res.ok) {
      alert('Task submitted successfully! Waiting for admin approval.');
      setScreenshot('');
    }
  };

  // à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦†à¦ªà¦¡à§‡à¦Ÿ à¦«à¦¾à¦‚à¦¶à¦¨ (à§§à§¦à§¦% à¦‡à¦‰à¦œà¦¾à¦° à¦•à¦¨à§à¦Ÿà§à¦°à§‹à¦²)
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!username) return alert('Username cannot be empty!');
    
    const updatedUser = { ...user, username, fullName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Profile updated successfully!');
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  const referralLink = `https://micro-job-world.vercel.app/?ref=${user.username}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row font-sans text-gray-800 antialiased">
      <Head>
        <title>BDZOON - Micro Job World</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Inter', sans-serif; }`}</style>
      </Head>
      
      {/* ================= à¦¬à¦¾à¦®à¦ªà¦¾à¦¶à§‡à¦° à§§à§¦à§¦% à¦•à§à¦²à§‹à¦¨ à¦¸à¦¾à¦‡à¦¡à¦¬à¦¾à¦° ================= */}
      <div className="w-full md:w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-5 shrink-0">
        <div>
          {/* à¦²à§‹à¦—à§‹ à¦¸à§‡à¦•à¦¶à¦¨ */}
          <div className="mb-8 pl-2">
            <h1 className="text-2xl font-black text-[#D92D20] tracking-tight flex flex-col">
              BDZOON
              <span className="text-[10px] text-gray-400 font-bold tracking-[0.15em] -mt-1">Micro Job World</span>
            </h1>
          </div>

          {/* à¦®à§‡à¦¨à§ à¦¬à¦¾à¦Ÿà¦¨ à¦¸à¦®à§‚à¦¹ */}
          <nav className="space-y-1">
            {[
              { name: 'Dashboard', icon: 'ðŸ“' },
              { name: 'Available Jobs', icon: 'ðŸ’¼' },
              { name: 'My Submissions', icon: 'â˜‘ï¸' },
              { name: 'Referrals', icon: 'ðŸ‘¥' },
              { name: 'Earnings', icon: 'ðŸ’°' },
              { name: 'Profile', icon: 'ðŸ‘¤' }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeTab === tab.name 
                    ? 'bg-[#E51818] text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
            
            <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm text-gray-600 hover:bg-gray-50 transition-all">
              <span className="text-base">â†ªï¸</span>
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* à¦¸à¦¾à¦‡à¦¡à¦¬à¦¾à¦° à¦¬à¦Ÿà¦® à¦°à§‡à¦«à¦¾à¦°à§‡à¦² à¦¬à¦•à§à¦¸ (à¦¹à§à¦¬à¦¹à§ à¦¸à§à¦•à§à¦°à¦¿à¦¨à¦¶à¦Ÿ à¦®à§à¦¯à¦¾à¦š) */}
        <div className="mt-8 pt-4 border-t border-gray-50">
          <div className="bg-[#E51818] p-4 rounded-2xl text-white relative overflow-hidden">
            <h4 className="text-xs font-bold tracking-wide mb-3">Your Referral Link</h4>
            <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10 mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium">
              {referralLink}
            </div>
            <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-full bg-white text-[#E51818] text-xs py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
              Copy Link
            </button>
          </div>
          
          {/* à¦¸à§‹à¦¶à§à¦¯à¦¾à¦² à¦¶à§‡à§Ÿà¦¾à¦° à¦¸à§‡à¦•à¦¶à¦¨ */}
          <div className="mt-5 bg-red-50/40 p-4 rounded-2xl border border-red-50/50">
            <p className="text-xs font-bold text-red-600 mb-1">Share & Earn More</p>
            <p className="text-[10px] text-gray-400 font-medium mb-3">Share your link and earn à§³5 - à§³10 per task!</p>
            <div className="flex items-center space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">ðŸ…µ</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-blue-400 text-white flex items-center justify-center text-xs">ðŸ†ƒ</a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">ðŸ††</a>
              <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-7 h-7 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs">ðŸ”—</button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= à¦¡à¦¾à¦¨à¦ªà¦¾à¦¶à§‡à¦° à¦®à§‚à¦² à¦à¦°à¦¿à§Ÿà¦¾ ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* à¦Ÿà¦ª à¦¨à§‡à¦­à¦¿à¦—à§‡à¦¶à¦¨ à¦¬à¦¾à¦° */}
        <header className="bg-white border-b border-gray-100 h-16 px-6 md:px-10 flex items-center justify-between shrink-0">
          <button className="text-gray-500 hover:text-gray-700 md:hidden text-xl">â˜°</button>
          <div className="flex items-center space-x-5 ml-auto">
            <button className="text-gray-400 hover:text-gray-600 relative text-lg">
              ðŸ”” <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">ðŸ‘¤</div>
              <div className="hidden sm:block text-right">
                <p className="text-xs font-bold text-gray-800">{user.username}</p>
                <p className="text-[10px] font-medium text-gray-400 -mt-0.5">User</p>
              </div>
            </div>
          </div>
        </header>

        {/* à¦•à¦¨à¦Ÿà§‡à¦¨à§à¦Ÿ à¦¸à§à¦•à¦¿à¦¨ à¦‰à¦‡à¦¨à§à¦¡à§‹ */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          
          {activeTab === 'Dashboard' && (
            <>
              {/* à¦¸à§à¦¬à¦¾à¦—à¦¤à¦® à¦Ÿà¦¾à¦‡à¦Ÿà§‡à¦² */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Welcome, <span className="text-[#E51818]">{user.username}</span> !</h2>
              </div>

              {/* à¦Ÿà¦ª à¦—à§à¦°à¦¿à¦¡: à¦¬à§à¦¯à¦¾à¦²à§‡à¦¨à§à¦¸ à¦“ à¦¬à§à¦¯à¦¾à¦¨à¦¾à¦° à¦•à¦¾à¦°à§à¦¡ */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* à¦¬à§à¦¯à¦¾à¦²à§‡à¦¨à§à¦¸ à¦¬à¦•à§à¦¸ */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between relative overflow-hidden">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Balance</p>
                    <p className="text-3xl font-black text-gray-900 mt-1">à§³ {user.balance || 0}</p>
                    <button onClick={() => { localStorage.clear(); router.push('/'); }} className="mt-4 bg-[#E51818] text-white text-xs px-4 py-1.5 rounded-lg font-bold shadow-sm shadow-red-100 hover:bg-red-700 transition-all">Logout</button>
                  </div>
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-xl text-[#E51818]">ðŸ‘›</div>
                </div>

                {/* à¦²à¦¾à¦² à¦ªà§à¦°à¦®à§‹ à¦¬à§à¦¯à¦¾à¦¨à¦¾à¦° */}
                <div className="lg:col-span-2 bg-gradient-to-r from-[#E51818] to-[#EF4444] p-6 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                  <div>
                    <h3 className="text-lg font-bold">Complete Micro Jobs</h3>
                    <p className="text-xl font-black -mt-0.5">Earn Money Easily</p>
                    <p className="text-xs text-red-100 mt-2 max-w-xs">Simple tasks, instant rewards.</p>
                  </div>
                  <button onClick={() => setActiveTab('Available Jobs')} className="bg-white text-[#E51818] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-gray-50 transition-all active:scale-95 shrink-0 shadow-sm">
                    Start Working
                  </button>
                </div>
              </div>

              {/* à¦•à¦¾à¦œà§‡à¦° à¦®à§‡à¦‡à¦¨ à¦•à¦¨à§à¦Ÿà§‡à¦‡à¦¨à¦¾à¦° */}
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
                <div className="flex items-center space-x-3 mb-1 border-b border-gray-50 pb-4">
                  <span className="text-xl text-[#E51818]">ðŸ’¼</span>
                  <div>
                    <h3 className="text-base font-bold text-gray-800">Available Jobs</h3>
                    <p className="text-xs text-gray-400">Complete the tasks below and earn rewards.</p>
                  </div>
                </div>

                {/* à¦Ÿà¦¾à¦¸à§à¦• à¦°à¦¿à¦¯à¦¼à§‡à¦² à¦²à¦¿à¦¸à§à¦Ÿ */}
                <div className="divide-y divide-gray-50">
                  {tasks.map(task => (
                    <div key={task.id} className="py-5 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${task.type === 'fb' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                          {task.type === 'fb' ? 'ðŸ‘' : 'ðŸŒ'}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{task.title}</h4>
                          <p className="text-xs font-bold text-[#E51818] mt-1">Reward: à§³ {task.reward}</p>
                        </div>
                      </div>

                      {/* à¦…à§à¦¯à¦¾à¦•à¦¶à¦¨ à¦¬à¦¾à¦Ÿà¦¨ à¦ªà§à¦¯à¦¾à¦¨à§‡à¦² */}
                      <div className="w-full xl:w-auto flex flex-wrap items-center gap-2.5">
                        <a href={task.link} target="_blank" rel="noreferrer" className="bg-[#E51818] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-all">
                          Click here to work â†’
                        </a>
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1 px-2">
                          <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs w-full max-w-[140px] file:hidden cursor-pointer text-gray-500 font-medium" />
                        </div>
                        <button onClick={() => submitTask(task.id, task.reward)} className="border border-[#E51818] text-[#E51818] bg-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-50 transition-all">
                          Submit Proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* à¦¥à§à¦°à¦¿-à¦•à¦²à¦¾à¦® à¦•à¦¾à¦‰à¦¨à§à¦Ÿà¦¾à¦° à¦—à§à¦°à¦¿à¦¡ (à§§à§¦à§¦% à¦¸à§à¦•à§à¦°à¦¿à¦¨à¦¶à¦Ÿ à¦¸à§à¦Ÿà¦¾à¦‡à¦²) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-red-500 flex items-center justify-center text-lg">ðŸ“…</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Jobs</p>
                    <p className="text-base font-black text-gray-800">2</p>
                    <p className="text-[10px] text-gray-400 font-medium">Available to work</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-red-500 flex items-center justify-center text-lg">ðŸ‘›</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Earnings</p>
                    <p className="text-base font-black text-gray-800">à§³ 0</p>
                    <p className="text-[10px] text-gray-400 font-medium">Keep working!</p>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl text-red-500 flex items-center justify-center text-lg">ðŸ‘¥</div>
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase">Total Referrals</p>
                    <p className="text-base font-black text-gray-800">0</p>
                    <p className="text-[10px] text-gray-400 font-medium">Invite and earn more</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ================= à§§à§¦à§¦% à¦à¦¡à¦¿à¦Ÿà§‡à¦¬à¦² à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦² à¦¸à§‡à¦•à¦¶à¦¨ ================= */}
          {activeTab === 'Profile' && (
            <div className="max-w-xl bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-3 mb-6 border-b border-gray-50 pb-4">
                <span className="text-xl text-[#E51818]">ðŸ‘¤</span>
                <div>
                  <h3 className="text-base font-bold text-gray-800">Edit Your Account</h3>
                  <p className="text-xs text-gray-400">Change your public profile details and password.</p>
                </div>
              </div>

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Full Name</label>
                  <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">Mobile / Username</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase">New Password</label>
                  <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" value={password} onChange={e => setPassword(e.target.value)} className="mt-1.5 block w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-red-500" />
                </div>
                <button type="submit" className="w-full bg-[#E51818] text-white p-3 rounded-xl text-xs font-bold hover:bg-red-700 transition-all shadow-sm">
                  Save Settings
                </button>
              </form>
            </div>
          )}

          {activeTab !== 'Dashboard' && activeTab !== 'Profile' && (
            <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm text-center">
              <p className="text-sm text-gray-400 font-medium">This section ({activeTab}) is empty right now.</p>
            </div>
          )}

        </main>

        {/* à¦«à§à¦Ÿà¦¾à¦° à¦²à¦¾à¦‡à¦¨ */}
        <footer className="h-12 border-t border-gray-100 flex items-center justify-center text-[11px] text-gray-400 font-medium shrink-0">
          Â© 2026 BDZOON. All rights reserved.
        </footer>
      </div>

    </div>
  );
}
