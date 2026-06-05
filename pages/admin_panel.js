import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const router = useRouter();

  // আপনার অ্যাডমিন প্যানেলের গোপন পাসওয়ার্ড (আপনি চাইলে 123 পরিবর্তন করতে পারেন)
  const ADMIN_PASSWORD = "Tamanna41"; 

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const res = await fetch('/api/admin');
    const data = await res.json();
    setSubmissions(data.submissions || []);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
    } else {
      alert('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  const handleAction = async (id, username, reward, action) => {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, username, reward, action })
    });
    alert(`টাস্কটি ${action === 'approve' ? 'অ্যাপ্রুভ' : 'রিজেক্ট'} করা হয়েছে!`);
    fetchSubmissions();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 font-sans">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-6 text-blue-400">Super Admin Security LogIn</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">সিক্রেট অ্যাডমিন পাসওয়ার্ড দিন</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-600 bg-gray-700 rounded-md text-white" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">প্রবেশ করুন</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-400">Super Admin & Team Dashboard</h1>
          <button onClick={() => router.push('/')} className="bg-gray-700 px-4 py-1.5 rounded text-xs">মূল সাইটে যান</button>
        </div>
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300 text-sm">
                <th className="p-4">ইউজার</th>
                <th className="p-4">টাস্ক আইডি</th>
                <th className="p-4">স্ক্রিনশট প্রুফ</th>
                <th className="p-4">অ্যামাউন্ট</th>
                <th className="p-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {submissions.map((sub) => (
                <tr key={sub.id} className="text-sm">
                  <td className="p-4">{sub.username}</td>
                  <td className="p-4">#{sub.taskId}</td>
                  <td className="p-4">
                    <img src={sub.screenshot} alt="Proof" className="w-24 h-24 object-cover rounded border border-gray-600 cursor-pointer" onClick={() => window.open(sub.screenshot)} />
                  </td>
                  <td className="p-4 text-green-400 font-bold">৳{sub.reward}</td>
                  <td className="p-4 space-x-2">
                    <button onClick={() => handleAction(sub.id, sub.username, sub.reward, 'approve')} className="bg-green-600 px-3 py-1 rounded text-white text-xs hover:bg-green-700">Approve</button>
                    <button onClick={() => handleAction(sub.id, sub.username, sub.reward, 'reject')} className="bg-red-600 px-3 py-1 rounded text-white text-xs hover:bg-red-700">Reject</button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-500">কোনো পেন্ডিং কাজ নেই।</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
