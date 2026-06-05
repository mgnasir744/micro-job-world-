import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [screenshot, setScreenshot] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Like and share the BDzoon Facebook page.', link: 'https://www.facebook.com/BDzoon.official', reward: 5, type: 'fb' },
    { id: 2, title: 'Visit the BDzoon website and take a screenshot.', link: 'https://www.bdzoon.com', reward: 10, type: 'web' }
  ]);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) router.push('/');
    else setUser(JSON.parse(loggedInUser));
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

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;

  const referralLink = `https://micro-job-world.vercel.app/?ref=${user.username}`;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      
      {/* বামপাশের সাইডবার (Sidebar) */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6">
        <div>
          {/* লোগো সেকশন */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-red-600 tracking-tight">BDZOON</h1>
            <p className="text-xs text-gray-500 font-bold -mt-1 tracking-widest">Micro Job World</p>
          </div>

          {/* মেনু লিংক সমূহ */}
          <nav className="space-y-2">
            <button className="w-full flex items-center space-x-3 bg-red-600 text-white px-4 py-3 rounded-xl font-medium text-sm transition shadow-md shadow-red-100">
              <span>📊</span> <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium text-sm transition">
              <span>💼</span> <span>Available Jobs</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium text-sm transition">
              <span>📝</span> <span>My Submissions</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium text-sm transition">
              <span>👥</span> <span>Referrals</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium text-sm transition">
              <span>💰</span> <span>Earnings</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-4 py-3 rounded-xl font-medium text-sm transition">
              <span>👤</span> <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* সাইডবার রেফারেল বক্স */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
            <h4 className="text-xs font-bold text-red-700 mb-2">Your Referral Link</h4>
            <input type="text" readOnly value={referralLink} className="w-full text-xs bg-white p-2.5 rounded-lg border border-gray-200 text-gray-600 focus:outline-none font-mono mb-2" />
            <button onClick={() => { navigator.clipboard.writeText(referralLink); alert('Link Copied!'); }} className="w-full bg-red-600 text-white text-xs py-2 rounded-lg font-bold hover:bg-red-700 transition">
              Copy Link
            </button>
          </div>
          
          <button onClick={() => { localStorage.clear(); router.push('/'); }} className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 mt-4 p-2.5 rounded-xl text-sm font-bold transition">
            <span>🚪</span> <span>Logout</span>
          </button>
        </div>
      </div>

      {/* মূল কন্টেন্ট এরিয়া (Main Content) */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* টপ বার (Top Bar) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Welcome, <span className="text-red-600">{user.username}</span> !</h2>
            <p className="text-sm text-gray-500 mt-1">Complete tasks below and earn easy rewards.</p>
          </div>
          <div className="flex items-center space-x-4 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-lg">👤</div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase">User Account</p>
              <p className="text-sm font-black text-gray-800">{user.username}</p>
            </div>
          </div>
        </div>

        {/* স্ট্যাটাস ও ব্যালেন্স কার্ড সমূহ (Top Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* ব্যালেন্স কার্ড */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-bold">Your Balance</p>
              <p className="text-3xl font-black text-gray-800 mt-1">৳ {user.balance || 0}</p>
            </div>
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-2xl">👛</div>
          </div>

          {/* ব্যানার কার্ড */}
          <div className="md:col-span-2 bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-3xl text-white shadow-xl shadow-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-xl font-black">Complete Micro Jobs & Earn Easily</h3>
              <p className="text-sm text-red-100 mt-1 max-w-sm">Simple tasks, instant rewards. Invite your friends to earn double reference bonus!</p>
            </div>
            <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-2xl text-sm shadow-md hover:bg-red-50 transition shrink-0">
              Start Working
            </button>
          </div>
        </div>

        {/* কাজের তালিকা (Available Jobs Section) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-2xl">💼</span>
            <h3 className="text-lg font-black text-gray-800">Available Jobs</h3>
          </div>

          <div className="space-y-6">
            {tasks.map(task => (
              <div key={task.id} className="border border-gray-100 p-5 rounded-2xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-gray-50/50 hover:bg-gray-50 transition">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${task.type === 'fb' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                    {task.type === 'fb' ? '👍' : '🌐'}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-base">{task.title}</h4>
                    <p className="text-sm font-extrabold text-red-600 mt-1">Reward: ৳ {task.reward}</p>
                  </div>
                </div>

                <div className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a href={task.link} target="_blank" rel="noreferrer" className="bg-red-600 text-white text-center px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-700 transition shadow-sm">
                    Click here to work →
                  </a>
                  <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 px-2 flex-1 sm:flex-initial">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="text-xs w-full max-w-[150px] file:hidden cursor-pointer p-1 text-gray-500 font-medium" />
                  </div>
                  <button onClick={() => submitTask(task.id, task.reward)} className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition shadow-sm">
                    Submit Proof
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* বটম কাউন্টার গ্রিড (Bottom Stats Counters) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Jobs</p>
            <p className="text-xl font-black text-gray-800 mt-1">2 Available</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Earnings</p>
            <p className="text-xl font-black text-green-600 mt-1">৳ 0.00</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Referrals</p>
            <p className="text-xl font-black text-gray-800 mt-1">0 Users</p>
          </div>
        </div>

        {/* কপিরাইট ফুটার */}
        <p className="text-center text-xs text-gray-400 font-medium mt-12">© 2026 BDZOON. All rights reserved.</p>
      </div>

    </div>
  );
}
