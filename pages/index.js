import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [refBy, setRefBy] = useState('');
  const router = useRouter();

  // URL থেকে রেফারেল কোড চেক করা
  useEffect(() => {
    if (router.query.ref) {
      setRefBy(router.query.ref);
    }
  }, [router.query]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ডিভাইস ফিঙ্গারপ্রিন্ট হিসেবে সিম্পল ইউজার-এজেন্ট ও স্ক্রিন সাইজ ব্যবহার (১ মোবাইল রেস্ট্রিকশন)
    const deviceId = btoa(navigator.userAgent + screen.width);

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: isLogin ? 'login' : 'register', username, password, refBy, deviceId })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      if (data.user.role === 'admin') {
        router.push('/admin-panel');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">BDzoon Micro-Job Platform</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ইউজারনেম / ফোন নম্বর</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full p-2 border rounded-md" />
          </div>
          {!isLogin && refBy && (
            <div>
              <label className="block text-sm font-medium text-gray-500">রেফারড বাই: {refBy}</label>
            </div>
          )}
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
            {isLogin ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center text-sm text-blue-500 mt-4 underline">
          {isLogin ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন'}
        </button>
      </div>
    </div>
  );
}
